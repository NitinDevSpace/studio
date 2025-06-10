
'use client';

import React, { useState, useEffect } from 'react';
import type { Project } from '@/lib/types';
import { projectsData } from '@/lib/data';
import { ArrowDown, Briefcase, User, Mail, Sparkles, Layers, Code as CodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCarousel from '@/components/ProjectCarousel';
import ProjectDetailModal from '@/components/ProjectDetailModal';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  useEffect(() => setMounted(true), []);

  const scrollToProjects = () => {
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenProjectModal = (project: Project) => {
    setSelectedProjectForModal(project);
  };

  const handleCloseProjectModal = () => {
    setSelectedProjectForModal(null);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <svg className="w-20 h-20 text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
          <div className="h-6 w-40 bg-muted rounded"></div>
          <div className="h-4 w-56 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in-page overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden py-16 sm:py-20 bg-gradient-to-br from-background via-background/95 to-background/80">
        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-slideInUp text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold mb-5 text-foreground">
                Hi, I&apos;m <span className="text-primary">Nitin Kumar</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium mb-6 text-foreground/80">
                Full Stack Developer & AI Enthusiast
              </p>
              <p className="text-base text-muted-foreground max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed">
                I craft innovative and user-centric web applications, bringing ideas to life with clean code and elegant design. Currently exploring the exciting possibilities of AI integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button
                  size="lg"
                  onClick={scrollToProjects}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 px-7 py-3 text-md"
                >
                  View My Work
                  <Briefcase className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToAbout}
                  className="border-primary/50 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary shadow-sm hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 px-7 py-3 text-md"
                >
                  About Me
                  <User className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center animate-slideInUp delay-200">
              <Image
                src="https://placehold.co/500x500.png"
                alt="Nitin Kumar - Developer"
                width={450}
                height={450}
                className="rounded-full shadow-2xl object-cover border-4 border-primary/20"
                data-ai-hint="professional developer portrait abstract dark"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60 animate-slideInUp delay-500">
          <ArrowDown className="h-7 w-7 text-primary" />
        </div>
      </section>

      {/* About Me Section */}
      <section id="about-section" className="section-padding bg-background/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-14 animate-slideInUp">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
              A Little <span className="text-primary">About Me</span>
            </h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I&apos;m a dedicated Full-Stack Developer passionate about building robust, scalable applications and creating seamless user experiences. I thrive in collaborative environments and am always eager to learn and adapt to new technologies.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: CodeIcon, title: "Frontend Development", description: "Crafting responsive user interfaces with React, Next.js, and modern CSS that delight users." },
              { icon: Layers, title: "Backend Architecture", description: "Building secure, scalable server-side applications and APIs using Node.js, Python, and Firebase." },
              { icon: Sparkles, title: "AI Integration", description: "Exploring AI with Genkit, integrating intelligent features to create smarter applications." },
            ].map((item, index) => (
              <Card key={item.title} className="bg-card text-center p-6 animate-slideInUp shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: `${0.2 + index * 0.1}s`}}>
                <CardContent className="p-0">
                  <div className="p-3 inline-block bg-primary/10 rounded-full mb-3">
                     <item.icon className="h-8 w-8 text-primary mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-10 animate-slideInUp delay-500">
            <Button asChild size="lg" variant="outline" className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary transition-all transform hover:scale-105 px-7 py-3">
              <Link href="/resume">
                Explore My Resume <ArrowDown className="ml-2 h-4 w-4 rotate-[270deg]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section - Replaced with Carousel */}
      <section id="projects-section" className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-14 animate-slideInUp">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
              My <span className="text-secondary">Creations</span>
            </h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A selection of projects where I've turned ideas into reality, showcasing my skills in development and problem-solving.
            </p>
          </div>

          <div className="animate-slideInUp delay-200 p-4 md:p-6 border border-border/50 rounded-xl relative overflow-hidden carousel-track-lines">
            <ProjectCarousel projects={projectsData} onProjectClick={handleOpenProjectModal} />
          </div>
        </div>
      </section>

      {/* Call to Action / Contact Teaser */}
      <section className="section-padding bg-background/90">
        <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto animate-slideInUp">
                <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-foreground">
                    Ready to <span className="text-primary">Collaborate</span>?
                </h2>
                <p className="text-md text-muted-foreground mb-8 leading-relaxed">
                    I'm always excited to discuss new projects, innovative ideas, or potential collaborations. If you have something in mind, or just want to connect, feel free to reach out!
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 px-8 py-3.5 text-md">
                    <Link href="/contact">
                        Get In Touch <Mail className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      {selectedProjectForModal && (
        <ProjectDetailModal
          project={selectedProjectForModal}
          isOpen={!!selectedProjectForModal}
          onClose={handleCloseProjectModal}
        />
      )}
    </div>
  );
}
