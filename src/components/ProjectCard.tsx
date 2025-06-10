
import Image from 'next/image';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void; // To open the modal
  className?: string;
}

export default function ProjectCard({ project, onClick, className }: ProjectCardProps) {
  return (
    <Card 
      className={`group w-[300px] sm:w-[360px] md:w-[420px] h-auto flex-shrink-0 bg-card rounded-lg shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 ease-in-out cursor-pointer mx-3 ${className}`}
      onClick={onClick}
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="transform transition-all duration-500 ease-in-out group-hover:scale-110"
          data-ai-hint={project.imageHint || 'project screenshot'}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority={project.id === '1'} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="absolute bottom-3 left-3 right-3 p-2 ">
            <h3 className="font-headline text-lg font-semibold text-white truncate group-hover:text-primary transition-colors">
              {project.name}
            </h3>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2 h-8">
          {project.description}
        </p>
        
        <div>
          <h4 className="text-xs font-semibold mb-1.5 text-foreground/70 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1 text-secondary" /> Tech Stack
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs bg-muted/50 border-border/60 text-muted-foreground py-0.5 px-1.5 rounded">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
                 <Badge variant="outline" className="text-xs border-primary/70 text-primary py-0.5 px-1.5 rounded">+{project.techStack.length - 4}</Badge>
            )}
          </div>
        </div>
        
        <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-2 text-primary hover:bg-primary/10 hover:text-primary text-xs"
            onClick={(e) => { e.stopPropagation(); onClick(); }} // Prevent card click if button is separate
        >
            <Eye className="mr-1.5 h-3.5 w-3.5" /> View Details
        </Button>
      </div>
    </Card>
  );
}
