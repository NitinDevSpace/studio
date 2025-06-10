'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters from '@/components/ProjectFilters';
import { projectsData, allTechStacks, allCategories } from '@/lib/data';
import type { Project } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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

  if (!mounted) {
     // Basic skeleton or loading state to avoid hydration mismatch issues
    return (
      <div className="space-y-8">
        <div className="animate-pulse bg-muted h-16 w-1/3 rounded-lg"></div> {/* Placeholder for title */}
        <div className="animate-pulse bg-muted h-64 w-full rounded-lg"></div> {/* Placeholder for filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted h-96 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline font-bold text-center mb-6 sm:mb-10 text-primary">My Projects</h1>
      <p className="text-lg text-center text-foreground/80 mb-10 max-w-2xl mx-auto">
        Explore a collection of my work, showcasing my skills in developing diverse and innovative applications.
      </p>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
      
      <ProjectFilters
        techStacks={allTechStacks}
        categories={allCategories}
        selectedTechStacks={selectedTechStacks}
        selectedCategory={selectedCategory}
        onTechStackChange={handleTechStackChange}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
      />

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-10">
          No projects found matching your criteria. Try adjusting your filters.
        </p>
      )}
    </div>
  );
}
