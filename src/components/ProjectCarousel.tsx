
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
  const [isPaused, setIsPaused] = useState(false); // For manual pause/play
  const scrollSpeed = 0.5; // Pixels per frame

  const duplicatedProjects = [...projects, ...projects]; // Duplicate for seamless looping

  const scrollContent = useCallback(() => {
    if (carouselRef.current && !isHovering && !isPaused) {
      carouselRef.current.scrollLeft += scrollSpeed;
      if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
        carouselRef.current.scrollLeft = 0; // Reset scroll to loop
      }
    }
    animationFrameRef.current = requestAnimationFrame(scrollContent);
  }, [isHovering, isPaused, scrollSpeed]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(scrollContent);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollContent]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.7; // Scroll by 70% of visible width
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };
  
  const togglePause = () => {
    setIsPaused(prev => !prev);
  }

  return (
    <div 
      className="relative w-full group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-[-50px] right-0 flex space-x-2 z-20">
        <Button
            variant="outline"
            size="icon"
            onClick={() => handleManualScroll('left')}
            className="bg-card/80 hover:bg-card border-border/70 shadow-md rounded-full text-primary hover:text-primary"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
            variant="outline"
            size="icon"
            onClick={togglePause}
            className="bg-card/80 hover:bg-card border-border/70 shadow-md rounded-full text-primary hover:text-primary"
            aria-label={isPaused ? "Play scroll" : "Pause scroll"}
          >
            {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        </Button>
        <Button
            variant="outline"
            size="icon"
            onClick={() => handleManualScroll('right')}
            className="bg-card/80 hover:bg-card border-border/70 shadow-md rounded-full text-primary hover:text-primary"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div 
        ref={carouselRef}
        className="flex overflow-x-auto py-4 scrollbar-hide" // scrollbar-hide is a common utility, ensure it's defined or use Tailwind's
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {duplicatedProjects.map((project, index) => (
          <div 
            key={`${project.id}-${index}`} 
            className="flex-shrink-0 snap-center transition-transform duration-300 ease-out group-hover:[&>div]:scale-95 hover:!scale-105" // Pop out effect on direct hover
          >
            <ProjectCard 
              project={project} 
              onClick={() => onProjectClick(project)} 
              className="transform" // Ensure transform works
            />
          </div>
        ))}
      </div>
       {/* Subtle track lines */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border/30 -z-10"></div>
    </div>
  );
};

export default ProjectCarousel;

// Add to your globals.css or a utility CSS file if not already present:
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;
// }
// .scrollbar-hide {
//   -ms-overflow-style: none;  /* IE and Edge */
//   scrollbar-width: none;  /* Firefox */
// }
