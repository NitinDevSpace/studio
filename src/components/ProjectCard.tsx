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
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={project.imageUrl}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={project.imageHint || 'project image'}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
        <CardDescription className="text-sm h-20 overflow-y-auto">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-1 text-muted-foreground flex items-center">
            <Code className="w-4 h-4 mr-2" /> Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1 text-muted-foreground">Category</h4>
          <Badge variant="outline" className="text-xs">{project.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4 border-t">
        <div className="flex justify-start space-x-2 w-full">
          {project.liveUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" size="sm" asChild>
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
