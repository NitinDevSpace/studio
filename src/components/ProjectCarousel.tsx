
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onProjectClick }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);
  const scrollSpeed = 0.4;

  // Duplicate projects for a smoother infinite scroll illusion, ensure at least a few items if projects list is short
  const baseProjects = projects.length < 5 ? [...projects, ...projects, ...projects] : projects;
  const duplicatedProjects = [...baseProjects, ...baseProjects]; // Further duplication for very long scroll

  const scrollContent = useCallback(() => {
    if (carouselRef.current && !isHovering) {
      carouselRef.current.scrollLeft += scrollSpeed;
      // Check if scrolled past the first set of original projects
      if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
        // Silently jump back to the start of the identical second set
        carouselRef.current.scrollLeft = carouselRef.current.scrollLeft - (carouselRef.current.scrollWidth / 2);
      }
    }
    animationFrameRef.current = requestAnimationFrame(scrollContent);
  }, [isHovering, scrollSpeed]);

  useEffect(() => {
    if (projects.length > 0) {
      animationFrameRef.current = requestAnimationFrame(scrollContent);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollContent, projects.length]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      // Estimate card width (can be made more precise if cards have fixed width)
      const cardElement = carouselRef.current.querySelector('.project-card-item');
      const cardWidth = cardElement ? cardElement.clientWidth : 300; // Default to 300px if not found
      const gapWidth = 16; // Corresponds to gap-4, adjust if gap changes
      const scrollAmount = cardWidth + gapWidth; // Scroll by one card width + gap
      
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (projects.length === 0) {
    return <p className="text-center text-muted-foreground">No projects to display.</p>;
  }

  return (
    <div
      className="relative w-full group p-4 md:p-6 border border-border/50 rounded-xl overflow-hidden bg-card/50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleManualScroll('left')}
        className={cn(
          "absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30",
          "h-12 w-12 sm:h-16 sm:w-16", // Larger buttons
          "bg-background/30 hover:bg-background/60 backdrop-blur-sm text-foreground/70 hover:text-primary rounded-full shadow-md transition-all duration-300 ease-in-out",
          "opacity-50 group-hover:opacity-100" // More visible on group hover
        )}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" /> {/* Larger icons */}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleManualScroll('right')}
        className={cn(
          "absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30",
          "h-12 w-12 sm:h-16 sm:w-16", // Larger buttons
          "bg-background/30 hover:bg-background/60 backdrop-blur-sm text-foreground/70 hover:text-primary rounded-full shadow-md transition-all duration-300 ease-in-out",
           "opacity-50 group-hover:opacity-100" // More visible on group hover
        )}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" /> {/* Larger icons */}
      </Button>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto py-4 scrollbar-hide gap-4 md:gap-6" // Added gap here
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {duplicatedProjects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="project-card-item flex-shrink-0 transition-transform duration-300 ease-out group-hover:[&>div]:scale-[0.97] hover:!scale-105 z-10"
          >
            <ProjectCard
              project={project}
              onClick={() => onProjectClick(project)}
              className="transform"
              isCarouselPriority={index < 3} // Prioritize first 3 images in the duplicated set
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
