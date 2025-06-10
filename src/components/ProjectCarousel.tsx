
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

  const baseProjects = projects.length < 5 ? [...projects, ...projects, ...projects] : projects;
  const duplicatedProjects = [...baseProjects, ...baseProjects];

  const scrollContent = useCallback(() => {
    if (carouselRef.current && !isHovering) {
      carouselRef.current.scrollLeft += scrollSpeed;
      if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
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
      const cardWidth = carouselRef.current.querySelector('.project-card-item')?.clientWidth || 300;
      const scrollAmount = cardWidth * 1.5; // Scroll by roughly 1.5 card widths
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
      className="relative w-full group p-4 md:p-6 border border-border/50 rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleManualScroll('left')}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-30",
          "h-16 w-16", // Increased size
          "text-foreground/60 hover:text-primary hover:bg-transparent",
          "opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-full"
        )}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-10 w-10" /> 
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleManualScroll('right')}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-30",
          "h-16 w-16", // Increased size
          "text-foreground/60 hover:text-primary hover:bg-transparent",
          "opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-full"
        )}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-10 w-10" />
      </Button>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto py-4 scrollbar-hide gap-0" // Removed mx from items, gap-0
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {duplicatedProjects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            // Removed mx-2 md:mx-3 for flush cards
            className="project-card-item flex-shrink-0 transition-transform duration-300 ease-out group-hover:[&>div]:scale-[0.97] hover:!scale-105 z-10" 
          >
            <ProjectCard
              project={project}
              onClick={() => onProjectClick(project)}
              className="transform" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
