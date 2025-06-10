import type { Project } from './types';

export const projectsData: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with Next.js, Stripe, and Firebase.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'online shopping',
    techStack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Stripe'],
    category: 'E-commerce',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '2',
    name: 'AI Powered Task Manager',
    description: 'A smart task manager that uses AI to prioritize and suggest tasks.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'task management',
    techStack: ['React', 'Node.js', 'Python', 'AI/ML'],
    category: 'Web App',
    liveUrl: '#',
  },
  {
    id: '3',
    name: 'Mobile Fitness Tracker',
    description: 'A cross-platform mobile app for tracking fitness activities and goals.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'fitness app',
    techStack: ['React Native', 'Firebase', 'TypeScript'],
    category: 'Mobile App',
    repoUrl: '#',
  },
  {
    id: '4',
    name: 'Personal Portfolio Site',
    description: 'This very portfolio site, built to showcase my skills and projects.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'developer portfolio',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    category: 'Portfolio',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '5',
    name: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets using D3.js and React.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'data dashboard',
    techStack: ['React', 'D3.js', 'Node.js'],
    category: 'Web App',
  },
  {
    id: '6',
    name: 'Real-time Chat Application',
    description: 'A scalable real-time chat application using WebSockets and Firebase.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chat application',
    techStack: ['React', 'Node.js', 'Firebase', 'WebSockets'],
    category: 'Web App',
    liveUrl: '#',
    repoUrl: '#',
  },
];

export const allTechStacks = Array.from(new Set(projectsData.flatMap(p => p.techStack))).sort();
export const allCategories = Array.from(new Set(projectsData.map(p => p.category))).sort();
