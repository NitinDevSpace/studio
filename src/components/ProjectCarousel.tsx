
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onProjectClick }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollSpeed = 0.4; // Slightly slower for smoother feel

  // Ensure enough projects for a continuous loop, duplicate at least once
  const baseProjects = projects.length < 5 ? [...projects, ...projects, ...projects] : projects;
  const duplicatedProjects = [...baseProjects, ...baseProjects];


  const scrollContent = useCallback(() => {
    if (carouselRef.current && !isHovering && !isPaused) {
      carouselRef.current.scrollLeft += scrollSpeed;
      // Check if we've scrolled past the first set of original projects
      if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
        // Silently jump back to the beginning of the first set
        carouselRef.current.scrollLeft = carouselRef.current.scrollLeft - (carouselRef.current.scrollWidth / 2);
      }
    }
    animationFrameRef.current = requestAnimationFrame(scrollContent);
  }, [isHovering, isPaused, scrollSpeed]);

  useEffect(() => {
    if (projects.length > 0) { // Only start scrolling if there are projects
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
      const scrollAmount = cardWidth * 0.8; // Scroll by a portion of card width
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
      className="relative w-full group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-[-55px] right-0 flex space-x-2 z-20">
        <Button
            variant="outline"
            size="icon"
            onClick={() => handleManualScroll('left')}
            className="bg-card/80 hover:bg-card border-border/70 shadow-md rounded-full text-primary hover:text-primary w-10 h-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
        </Button>
         <Button
            variant="outline"
            size="icon"
            onClick={togglePause}
            className="bg-card/80 hover:bg-card border-border/70 shadow-md rounded-full text-primary hover:text-primary w-10 h-10"
            aria-label={isPaused ? "Play scroll" : "Pause scroll"}
          >
            {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        </Button>
        <Button
            variant="outline"
            size="icon"
            onClick={() => handleManualScroll('right')}
            className="bg-card/80 hover:bg-card border-border/70 shadow-md rounded-full text-primary hover:text-primary w-10 h-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto py-4 scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }} // Removed scroll-snap for continuous effect
      >
        {duplicatedProjects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="project-card-item flex-shrink-0 transition-transform duration-300 ease-out group-hover:[&>div]:scale-[0.97] hover:!scale-105 mx-2 md:mx-3 z-10" // Pop out effect on direct hover
          >
            <ProjectCard
              project={project}
              onClick={() => onProjectClick(project)}
              className="transform" // Ensure transform works
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
