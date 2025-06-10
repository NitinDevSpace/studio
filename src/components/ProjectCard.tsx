import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Layers } from 'lucide-react'; // Replaced Code with Layers for Tech Stack

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden glassmorphism-card group transition-all duration-500 ease-in-out hover:shadow-neon-primary hover:border-primary/50 transform hover:-translate-y-2">
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl"> {/* Aspect ratio for consistency */}
        <Image
          src={project.imageUrl}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="transform transition-all duration-700 ease-in-out group-hover:scale-110 "
          data-ai-hint={project.imageHint || 'project image'}
          priority={project.id === '1' || project.id === '2'} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>
      <CardHeader className="p-5 sm:p-6">
        <CardTitle className="font-headline text-xl sm:text-2xl text-foreground group-hover:text-glow-primary transition-colors duration-300">{project.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground h-16 sm:h-20 overflow-y-auto mt-1 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-5 sm:p-6 pt-0">
        <div className="mb-4">
          <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider flex items-center">
            <Layers className="w-4 h-4 mr-1.5 text-secondary" /> Tech Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => ( // Show limited initially
              <Badge key={tech} variant="secondary" className="text-xs bg-muted/70 text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200 py-1 px-2.5 rounded-md">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 5 && (
                 <Badge variant="outline" className="text-xs border-primary/50 text-primary py-1 px-2.5 rounded-md">+{project.techStack.length - 5} more</Badge>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold mb-1 text-muted-foreground uppercase tracking-wider">Category</h4>
          <Badge variant="outline" className="text-xs border-secondary/50 text-secondary hover:bg-secondary/10 transition-colors duration-200 py-1 px-2.5 rounded-md">{project.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-5 sm:p-6 border-t border-border/20 bg-card/30">
        <div className="flex justify-start space-x-3 w-full">
          {project.liveUrl && (
            <Button variant="default" size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-neon-primary transform hover:scale-105 flex-grow sm:flex-grow-0">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" size="sm" asChild className="border-secondary/60 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-sm hover:shadow-neon-secondary transform hover:scale-105 flex-grow sm:flex-grow-0">
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
