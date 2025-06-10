
'use client';

import React from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Layers, Tag, X } from 'lucide-react';
import Link from 'next/link';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-lg shadow-2xl bg-card">
        <DialogHeader className="p-6 pb-4 border-b border-border/70 sticky top-0 bg-card z-10">
          <DialogTitle className="text-2xl font-headline text-primary">{project.name}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden border border-border/50">
            <Image
              src={project.imageUrl}
              alt={project.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={project.imageHint || 'project detail image'}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.description}
            </DialogDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-semibold mb-2 text-foreground/90 flex items-center">
                <Layers className="w-4 h-4 mr-2 text-secondary" /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-secondary/10 text-secondary-foreground font-normal text-xs py-1 px-2.5 rounded-md border border-secondary/30">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-2 text-foreground/90 flex items-center">
                <Tag className="w-4 h-4 mr-2 text-accent" /> Category
              </h4>
              <Badge variant="outline" className="bg-accent/10 text-accent-foreground font-normal text-xs py-1 px-2.5 rounded-md border border-accent/30">
                {project.category}
              </Badge>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-border/70 sticky bottom-0 bg-card z-10 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          {project.liveUrl && (
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-primary/20 transition-all duration-300">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" asChild className="border-foreground/30 text-foreground/80 hover:bg-muted hover:text-foreground hover:border-foreground/50 transition-all duration-300 shadow-sm">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Repository
              </Link>
            </Button>
          )}
          <Button variant="ghost" onClick={onClose} className="text-muted-foreground hover:bg-muted">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
