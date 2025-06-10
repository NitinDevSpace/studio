
export type ProjectStatus = 'Planning' | 'In Progress' | 'Finished';

export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint?: string; // For data-ai-hint
  techStack: string[];
  category: string;
  status?: ProjectStatus; // Added status
  liveUrl?: string;
  repoUrl?: string;
}

export type FilterType = 'techStack' | 'category';
