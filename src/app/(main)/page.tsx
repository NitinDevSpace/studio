'use client';

import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters from '@/components/ProjectFilters';
import { projectsData, allTechStacks, allCategories } from '@/lib/data';
import type { Project } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search, ArrowDown, Sparkles, Layers, Code, User, Briefcase, Linkedin, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

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
  
  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };


  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-muted rounded-full"></div>
          <div className="h-8 w-48 bg-muted rounded"></div>
          <div className="h-6 w-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in-page overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden py-20 px-4 glow-effect">
        <div className="absolute inset-0 opacity-[0.02] animate-pulse">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern-dots" patternUnits="userSpaceOnUse" width="70" height="70" patternTransform="scale(1) rotate(0)">
                <circle cx="5" cy="5" r="0.8" fill="hsl(var(--primary))" />
                <circle cx="35" cy="35" r="0.8" fill="hsl(var(--secondary))" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern-dots)" />
          </svg>
        </div>
        <div className="relative z-10 animate-slideInUp">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-headline font-extrabold mb-4">
            <span className="block animate-text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Nitin Kumar
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl font-medium mb-8 text-foreground/80 animate-slideInUp delay-200">
            Full Stack Developer & AI Enthusiast
          </p>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-12 animate-slideInUp delay-300">
            Transforming ideas into innovative, user-centric web applications and AI-powered solutions. Passionate about clean code, elegant design, and impactful technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideInUp delay-400">
            <Button 
              size="lg" 
              onClick={scrollToProjects} 
              className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg"
            >
              View My Work
              <Briefcase className="ml-2.5 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              onClick={scrollToAbout}
              className="border-primary/70 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary shadow-sm hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg"
            >
              About Me
              <User className="ml-2.5 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-70 animate-slideInUp delay-500">
          <ArrowDown className="h-8 w-8 text-primary" />
        </div>
      </section>

      {/* About Me Section (Simplified from Dribbble) */}
      <section id="about-section" className="section-padding bg-background/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16 animate-slideInUp">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              A Little <span className="text-glow-primary">About Me</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              I&apos;m Nitin Kumar, a dedicated Full-Stack Developer with a knack for building robust and scalable applications. My journey in tech is driven by a passion for solving complex problems and creating seamless user experiences. I thrive in collaborative environments and am always eager to learn and adapt to new technologies.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Code, title: "Frontend Wizardry", description: "Crafting pixel-perfect, responsive user interfaces with React, Next.js, and modern CSS that delight users." },
              { icon: Layers, title: "Backend Architecture", description: "Building secure, scalable server-side applications and APIs using Node.js, Python, and Firebase." },
              { icon: Sparkles, title: "AI Integration", description: "Exploring the frontier of AI with Genkit, integrating intelligent features to create smarter applications." },
            ].map((item, index) => (
              <Card key={item.title} className="glassmorphism-card text-center p-6 animate-slideInUp" style={{ animationDelay: `${0.2 + index * 0.15}s`, opacity: 0 }}>
                <CardContent className="p-0">
                  <div className="p-4 inline-block bg-primary/10 rounded-full mb-4">
                     <item.icon className="h-10 w-10 text-primary mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12 animate-slideInUp delay-500">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105 px-8 py-3">
              <Link href="/resume">
                Explore My Resume <ArrowDown className="ml-2 h-5 w-5 rotate-[270deg]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects-section" className="section-padding bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16 animate-slideInUp">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              My <span className="text-glow-secondary">Creations</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A selection of projects where I've turned ideas into reality, showcasing my skills in development and problem-solving.
            </p>
          </div>
          
          <div className="mb-10 animate-slideInUp delay-200">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full bg-input border-border/60 focus:ring-1 focus:ring-primary focus:border-primary shadow-lg rounded-full py-3 text-base placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          <div className="animate-slideInUp delay-300">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="animate-slideInUp" style={{ animationDelay: `${0.4 + index * 0.1}s`, opacity: 0 }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg py-10 animate-slideInUp delay-400">
              No projects found matching your criteria. Try adjusting your filters or search.
            </p>
          )}
        </div>
      </section>

      {/* Call to Action / Contact Teaser */}
      <section className="section-padding bg-background/50">
        <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto animate-slideInUp">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                    Ready to <span className="text-glow-primary">Collaborate</span>?
                </h2>
                <p className="text-lg text-foreground/70 mb-10">
                    I'm always excited to discuss new projects, innovative ideas, or potential collaborations. If you have something in mind, or just want to connect, feel free to reach out!
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-primary-foreground shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 px-10 py-3.5 text-lg">
                    <Link href="/contact">
                        Get In Touch <Mail className="ml-2.5 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
