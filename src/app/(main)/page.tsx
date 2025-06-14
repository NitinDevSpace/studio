
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
import dynamic from 'next/dynamic';

const ProjectDetailModal = dynamic(() => import('@/components/ProjectDetailModal'), {
  // ssr: false, // Modal is client-side interactive, SSR might not be necessary
  loading: () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><p className="text-white p-4 bg-background rounded-md shadow-lg">Loading project details...</p></div>,
});


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

  const aboutMeItems = [
    {
      icon: CodeIcon,
      title: "Frontend Development",
      descriptionJsx: (
        <>
          Crafting responsive user interfaces with key technologies like <strong className="text-primary">React</strong>, <strong className="text-primary">Next.js</strong>, and <strong className="text-primary">TypeScript</strong>, focusing on performance and <strong className="text-primary">modern CSS solutions</strong> to delight users.
        </>
      )
    },
    {
      icon: Layers,
      title: "Backend Architecture",
      descriptionJsx: (
        <>
          Building secure, scalable server-side applications and APIs using <strong className="text-primary">Node.js</strong>, <strong className="text-primary">Python (Django/Flask)</strong>, and <strong className="text-primary">Firebase</strong>, with expertise in databases like <strong className="text-primary">PostgreSQL & MongoDB</strong>.
        </>
      )
    },
    {
      icon: Sparkles,
      title: "AI Integration",
      descriptionJsx: (
        <>
          Exploring the exciting world of AI using <strong className="text-primary">Genkit</strong> and <strong className="text-primary">Python</strong>, integrating intelligent features and <strong className="text-primary">LLMs</strong> to create smarter, more intuitive applications.
        </>
      )
    },
  ];


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
      <section className="w-full min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden py-16 sm:py-20 bg-gradient-to-br from-background via-background/95 to-background/80">
        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-slideInUp text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold mb-5 text-foreground">
                Hi, I&apos;m <span className="text-primary">Nitin Kumar</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium mb-6 text-foreground/80 animate-slideInUp delay-100">
                Software Engineer <span className="text-accent mx-1 sm:mx-1.5"> // </span> 
                Full Stack Developer <span className="text-accent mx-1 sm:mx-1.5"> // </span> 
                AI Enthusiast
              </p>
              <p className="text-base text-muted-foreground max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed animate-slideInUp delay-200">
                I craft innovative and user-centric web applications, bringing ideas to life with clean code and elegant design. Currently exploring the exciting possibilities of AI integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start animate-slideInUp delay-300">
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
            
            <div className="hidden md:flex justify-center items-center animate-slideInFromRight delay-200 overflow-hidden">
                <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Spider-Man_%28Miles_Morales%29_character_art.png/250px-Spider-Man_%28Miles_Morales%29_character_art.png"
                    alt="Spider-Man (Miles Morales) character art for hero section"
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 350px, 400px"
                    className="object-cover object-top"
                    data-ai-hint="Spider-Man Miles Morales character"
                    priority
                />
                </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ArrowDown className="h-7 w-7 text-primary animate-bounce" />
        </div>
      </section>

      {/* About Me Section */}
      <section id="about-section" className="section-padding bg-background/90 animate-slideInUp delay-400">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
              A Little <span className="text-primary">About Me</span>
            </h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I&apos;m a dedicated Full-Stack Developer passionate about building robust, scalable applications and creating seamless user experiences. I thrive in collaborative environments and am always eager to learn and adapt to new technologies.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {aboutMeItems.map((item, index) => (
              <Card key={item.title} className="bg-card text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideInUp" style={{ animationDelay: `${0.2 + (index * 0.1) + 0.4}s`}}>
                <CardContent className="p-0">
                  <div className="p-3 inline-block bg-primary/10 rounded-full mb-3">
                     <item.icon className="h-8 w-8 text-primary mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.descriptionJsx}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-10 animate-slideInUp delay-700">
            <Button asChild size="lg" variant="outline" className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary transition-all transform hover:scale-105 px-7 py-3">
              <Link href="/resume">
                Explore My Resume <ArrowDown className="ml-2 h-4 w-4 rotate-[270deg]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section - Replaced with Carousel */}
      <section id="projects-section" className="section-padding bg-background animate-slideInUp delay-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
              My <span className="text-secondary">Creations</span>
            </h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A selection of projects where I've turned ideas into reality, showcasing my skills in development and problem-solving.
            </p>
          </div>
          
          <ProjectCarousel projects={projectsData} onProjectClick={handleOpenProjectModal} />
          
        </div>
      </section>

      {/* Call to Action / Contact Teaser */}
      <section className="section-padding bg-background/90 animate-slideInUp delay-600">
        <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
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
