
import Image from 'next/image';
import type { Project, ProjectStatus } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Layers, Github, ExternalLink, CheckCircle2, Wrench, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
}

const StatusBadge: React.FC<{ status?: ProjectStatus }> = ({ status }) => {
  if (!status) return null;

  let icon = null;
  let colorClasses = '';

  switch (status) {
    case 'Planning':
      icon = <ClipboardList className="h-3 w-3" />;
      colorClasses = 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      break;
    case 'In Progress':
      icon = <Wrench className="h-3 w-3" />;
      colorClasses = 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      break;
    case 'Finished':
      icon = <CheckCircle2 className="h-3 w-3" />;
      colorClasses = 'bg-green-500/20 text-green-500 border-green-500/30';
      break;
    default:
      return null;
  }

  return (
    <Badge
      className={cn(
        "absolute top-2 right-2 z-10 text-xs py-0.5 px-2 rounded-full flex items-center gap-1",
        colorClasses
      )}
    >
      {icon}
      {status}
    </Badge>
  );
};


export default function ProjectCard({ project, onClick, className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "group w-[320px] sm:w-[380px] md:w-[450px] h-auto flex-shrink-0 bg-card rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 ease-in-out cursor-pointer relative",
        className
      )}
      onClick={onClick}
    >
      <StatusBadge status={project.status} />
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="transform transition-all duration-500 ease-in-out group-hover:scale-110"
          data-ai-hint={project.imageHint || 'project screenshot'}
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 60vw, (max-width: 1024px) 450px, 450px"
          priority={project.id === '1' || project.id === '2'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 group-hover:opacity-60 transition-opacity duration-300"></div>
        <div className="absolute bottom-3 left-3 right-3 p-2">
            <h3 className="font-headline text-lg md:text-xl font-semibold text-white truncate group-hover:text-primary transition-colors">
              {project.name}
            </h3>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2 h-8 leading-relaxed">
          {project.description}
        </p>

        <div>
          <h4 className="text-xs font-semibold mb-1.5 text-card-foreground/80 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1.5 text-secondary" /> Tech Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs bg-muted/50 border-border/60 text-muted-foreground py-0.5 px-2 rounded">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
                 <Badge variant="outline" className="text-xs border-primary/70 text-primary py-0.5 px-2 rounded">+{project.techStack.length - 4}</Badge>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
            <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10 hover:text-primary text-xs px-2.5 py-1.5"
                onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
                <Eye className="mr-1.5 h-3.5 w-3.5" /> View Details
            </Button>
            <div className="flex space-x-2">
                {project.liveUrl && project.liveUrl !== "#" && (
                    <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="h-7 w-7 border-border/70 text-muted-foreground hover:text-primary hover:border-primary/70 hover:bg-primary/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="View Live Demo">
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </Button>
                )}
                {project.repoUrl && project.repoUrl !== "#" && (
                    <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="h-7 w-7 border-border/70 text-muted-foreground hover:text-primary hover:border-primary/70 hover:bg-primary/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="View Repository">
                            <Github className="h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
