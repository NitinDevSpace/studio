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
    <Card className="flex flex-col h-full overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:border-primary/50 rounded-xl">
      <div className="relative w-full h-48 sm:h-56 group">
        <Image
          src={project.imageUrl}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={project.imageHint || 'project image'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
      <CardHeader className="p-5">
        <CardTitle className="font-headline text-xl text-primary-foreground group-hover:text-primary transition-colors duration-300">{project.name}</CardTitle>
        <CardDescription className="text-sm text-foreground/70 h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-5 pt-0">
        <div className="mb-4">
          <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider flex items-center">
            <Code className="w-4 h-4 mr-2 text-accent" /> Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-secondary/70 text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold mb-1 text-muted-foreground uppercase tracking-wider">Category</h4>
          <Badge variant="outline" className="text-xs border-accent/50 text-accent hover:bg-accent/20 transition-colors">{project.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-5 border-t border-border/30">
        <div className="flex justify-start space-x-3 w-full">
          {project.liveUrl && (
            <Button variant="outline" size="sm" asChild className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:bg-accent/20 hover:text-accent transition-all">
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
