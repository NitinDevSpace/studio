'use client';

import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters from '@/components/ProjectFilters';
import { projectsData, allTechStacks, allCategories } from '@/lib/data';
import type { Project } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let result = projectsData;

    if (searchTerm) {
      result = result.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTechStacks.length > 0) {
      result = result.filter(project =>
        selectedTechStacks.every(tech => project.techStack.includes(tech))
      );
    }

    if (selectedCategory) {
      result = result.filter(project => project.category === selectedCategory);
    }

    setFilteredProjects(result);
  }, [selectedTechStacks, selectedCategory, searchTerm]);

  const handleTechStackChange = (techStack: string) => {
    setSelectedTechStacks(prev =>
      prev.includes(techStack)
        ? prev.filter(t => t !== techStack)
        : [...prev, techStack]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleClearFilters = () => {
    setSelectedTechStacks([]);
    setSelectedCategory('');
    setSearchTerm('');
  };
  
  const scrollToProjects = () => {
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) {
    return (
      <div className="space-y-12 py-10">
        {/* Hero Skeleton */}
        <div className="text-center px-4">
          <div className="animate-pulse bg-muted h-12 w-3/4 mx-auto rounded-lg mb-4"></div>
          <div className="animate-pulse bg-muted h-6 w-1/2 mx-auto rounded-lg mb-8"></div>
          <div className="animate-pulse bg-primary/50 h-12 w-48 mx-auto rounded-lg"></div>
        </div>
        {/* Filters & Projects Skeleton */}
        <div className="animate-pulse bg-muted h-16 w-1/3 rounded-lg mx-auto my-8"></div>
        <div className="animate-pulse bg-card h-64 w-full rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-card h-96 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in-page">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center relative overflow-hidden py-16 px-4 bg-gradient-to-br from-background to-muted/30">
        <div className="absolute inset-0 opacity-5">
          {/* Subtle background pattern or abstract shapes could go here */}
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-extrabold mb-6 animate-slideInUp text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            Crafting Digital Excellence
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10 animate-slideInUp delay-200">
            Hi, I&apos;m a passionate developer transforming ideas into innovative and user-centric web & mobile experiences. Explore my journey through code.
          </p>
          <Button 
            size="lg" 
            onClick={scrollToProjects} 
            className="animate-slideInUp delay-500 group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
          >
            View My Work
            <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
          </Button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects-section" className="space-y-10 py-16">
        <h2 className="text-4xl font-headline font-bold text-center mb-6 sm:mb-10 text-primary animate-slideInUp delay-100">
          My Projects
        </h2>
        <p className="text-lg text-center text-foreground/80 mb-10 max-w-2xl mx-auto animate-slideInUp delay-200">
          Explore a collection of my work, showcasing my skills in developing diverse and innovative applications.
        </p>

        <div className="mb-8 px-4 animate-slideInUp delay-300">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full bg-card border-border focus:ring-primary focus:border-primary shadow-sm"
            />
          </div>
        </div>
        
        <div className="px-4 animate-slideInUp delay-500">
          <ProjectFilters
            techStacks={allTechStacks}
            categories={allCategories}
            selectedTechStacks={selectedTechStacks}
            selectedCategory={selectedCategory}
            onTechStackChange={handleTechStackChange}
            onCategoryChange={handleCategoryChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 animate-slideInUp delay-500">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="animate-slideInUp" style={{ animationDelay: `${0.5 + index * 0.1}s`, opacity: 0 }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-10 animate-slideInUp delay-500">
            No projects found matching your criteria. Try adjusting your filters.
          </p>
        )}
      </section>
    </div>
  );
}
