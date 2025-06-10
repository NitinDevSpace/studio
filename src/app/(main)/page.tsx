'use client';

import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters from '@/components/ProjectFilters';
import { projectsData, allTechStacks, allCategories } from '@/lib/data';
import type { Project } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search, ArrowDown, Sparkles, Layers, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="fade-in-page space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden py-20 px-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="absolute inset-0 opacity-[0.03] animate-pulse">
          {/* Subtle background pattern - e.g. radiating lines or dots */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" patternUnits="userSpaceOnUse" width="50" height="50" patternTransform="scale(2) rotate(45)">
                <circle cx="10" cy="10" r="1" fill="hsl(var(--primary))" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-extrabold mb-6 animate-slideInUp text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/70">
            Nitin Kumar
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-headline font-medium mb-8 animate-slideInUp delay-100 text-foreground/90">
            Innovating at the Intersection of Design & Code
          </p>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto mb-12 animate-slideInUp delay-200">
            Hi, I&apos;m Nitin Kumar, a passionate Full-Stack Developer transforming ideas into innovative, user-centric web and mobile experiences. Explore my journey through elegant solutions and impactful projects.
          </p>
          <Button 
            size="lg" 
            onClick={scrollToProjects} 
            className="animate-slideInUp delay-500 group bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 px-10 py-6 text-lg"
          >
            Explore My Work
            <ArrowDown className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
          </Button>
        </div>
      </section>

      {/* About/Skills Section */}
      <section className="py-16 px-4">
        <div className="text-center mb-12 animate-slideInUp delay-100">
          <h2 className="text-4xl font-headline font-bold text-primary mb-3">What I Do</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            I specialize in building dynamic, responsive, and scalable applications with a keen eye for detail and user experience.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Code, title: "Frontend Development", description: "Crafting beautiful and intuitive user interfaces with React, Next.js, and modern CSS." },
            { icon: Layers, title: "Backend Solutions", description: "Building robust and scalable server-side applications with Node.js, Python, and Firebase." },
            { icon: Sparkles, title: "AI Integration", description: "Leveraging Genkit and AI models to create intelligent features and enhance user interactions." },
          ].map((item, index) => (
            <Card key={item.title} className="bg-card/70 backdrop-blur-md border-border/40 rounded-xl shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp" style={{ animationDelay: `${0.2 + index * 0.15}s`, opacity: 0 }}>
              <CardContent className="p-6 text-center">
                <item.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-headline font-semibold text-primary-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects-section" className="space-y-10 py-16 bg-muted/20 backdrop-blur-sm">
        <div className="text-center px-4">
            <h2 className="text-4xl font-headline font-bold text-primary mb-3 animate-slideInUp delay-100">
            My Projects
            </h2>
            <p className="text-lg text-center text-foreground/80 mb-10 max-w-2xl mx-auto animate-slideInUp delay-200">
            Dive into a collection of my work, showcasing my skills in developing diverse and innovative applications.
            </p>
        </div>
        

        <div className="mb-8 px-4 animate-slideInUp delay-300">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 w-full bg-card border-border/60 focus:ring-primary focus:border-primary shadow-lg rounded-full py-3 text-base"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 animate-slideInUp delay-500">
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
