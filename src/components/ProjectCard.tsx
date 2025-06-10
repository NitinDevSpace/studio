import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Code } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden bg-card/80 backdrop-blur-md border border-border/40 shadow-xl hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:border-primary/60 rounded-2xl group">
      <div className="relative w-full h-56 sm:h-64 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={project.imageHint || 'project image'}
          priority={project.id === '1' || project.id === '2' || project.id === '3'} // Prioritize loading for first few cards
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-300"></div>
      </div>
      <CardHeader className="p-6">
        <CardTitle className="font-headline text-2xl text-primary-foreground group-hover:text-primary transition-colors duration-300">{project.name}</CardTitle>
        <CardDescription className="text-sm text-foreground/70 h-[4.5rem] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <div className="mb-5">
          <h4 className="text-xs font-semibold mb-2.5 text-muted-foreground uppercase tracking-wider flex items-center">
            <Code className="w-4 h-4 mr-2 text-accent" /> Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-secondary/60 text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 py-1 px-2.5 rounded-md">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold mb-1.5 text-muted-foreground uppercase tracking-wider">Category</h4>
          <Badge variant="outline" className="text-xs border-accent/50 text-accent hover:bg-accent/10 transition-colors duration-200 py-1 px-2.5 rounded-md">{project.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-6 border-t border-border/30 bg-card/50">
        <div className="flex justify-start space-x-3 w-full">
          {project.liveUrl && (
            <Button variant="outline" size="sm" asChild className="border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm hover:shadow-primary/20 transform hover:scale-105">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:bg-accent/20 hover:text-accent transition-all duration-200 transform hover:scale-105">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Repository
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
