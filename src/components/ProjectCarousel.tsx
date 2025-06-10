
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onProjectClick }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollSpeed = 0.4;

  const baseProjects = projects.length < 5 ? [...projects, ...projects, ...projects] : projects;
  const duplicatedProjects = [...baseProjects, ...baseProjects];

  const scrollContent = useCallback(() => {
    if (carouselRef.current && !isHovering && !isPaused) {
      carouselRef.current.scrollLeft += scrollSpeed;
      if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
        carouselRef.current.scrollLeft = carouselRef.current.scrollLeft - (carouselRef.current.scrollWidth / 2);
      }
    }
    animationFrameRef.current = requestAnimationFrame(scrollContent);
  }, [isHovering, isPaused, scrollSpeed]);

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
      const scrollAmount = cardWidth; 
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  }

  if (projects.length === 0) {
    return <p className="text-center text-muted-foreground">No projects to display.</p>;
  }

  return (
    <div
      className="relative w-full group py-6" // Added padding for buttons not to overlap content below
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleManualScroll('left')}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-30",
          "h-full w-16 bg-gradient-to-r from-background/70 via-background/40 to-transparent",
          "text-foreground/70 hover:text-primary hover:from-background/80 hover:via-background/60",
          "opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-none"
        )}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleManualScroll('right')}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-30",
          "h-full w-16 bg-gradient-to-l from-background/70 via-background/40 to-transparent",
          "text-foreground/70 hover:text-primary hover:from-background/80 hover:via-background/60",
          "opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-none"
        )}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Pause/Play Button - Top Right of Carousel Container */}
       <Button
            variant="outline"
            size="icon"
            onClick={togglePause}
            className="absolute top-[-40px] right-0 z-20 bg-card/80 hover:bg-card border-border/70 shadow-md rounded-full text-primary hover:text-primary w-10 h-10"
            aria-label={isPaused ? "Play scroll" : "Pause scroll"}
          >
            {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        </Button>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto py-4 scrollbar-hide" // py-4 to give cards space from edges if needed
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {duplicatedProjects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="project-card-item flex-shrink-0 transition-transform duration-300 ease-out group-hover:[&>div]:scale-[0.97] hover:!scale-105 mx-2 md:mx-3 z-10"
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
