import type { Project } from './types';

export const projectsData: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with Next.js, Stripe, and Firebase, focusing on a seamless user experience and robust backend.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern e-commerce interface',
    techStack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Stripe'],
    category: 'E-commerce',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '2',
    name: 'AI Powered Task Manager',
    description: 'A smart task manager that leverages AI to prioritize tasks, suggest deadlines, and optimize your workflow for peak productivity.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'AI productivity app dashboard',
    techStack: ['React', 'Node.js', 'Python', 'AI/ML', 'Genkit'],
    category: 'Web App',
    liveUrl: '#',
  },
  {
    id: '3',
    name: 'Mobile Fitness Tracker',
    description: 'A cross-platform mobile app for tracking fitness activities, setting goals, and visualizing progress with an intuitive interface.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'sleek mobile fitness UI',
    techStack: ['React Native', 'Firebase', 'TypeScript', 'Swift'],
    category: 'Mobile App',
    repoUrl: '#',
  },
  {
    id: '4',
    name: 'Personal Portfolio Site',
    description: 'This very portfolio site, built with Next.js and Tailwind CSS, designed to elegantly showcase my skills and projects.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'minimalist developer portfolio',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'ShadCN UI'],
    category: 'Portfolio',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '5',
    name: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets, featuring dynamic charts and filters, built with React and D3.js.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'interactive data dashboard charts',
    techStack: ['React', 'D3.js', 'Node.js', 'Express'],
    category: 'Web App',
  },
  {
    id: '6',
    name: 'Real-time Chat Application',
    description: 'A scalable real-time chat application using WebSockets and Firebase, offering instant messaging, group chats, and notifications.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern chat application interface',
    techStack: ['React', 'Node.js', 'Firebase', 'WebSockets'],
    category: 'Web App',
    liveUrl: '#',
    repoUrl: '#',
  },
];

export const allTechStacks = Array.from(new Set(projectsData.flatMap(p => p.techStack))).sort();
export const allCategories = Array.from(new Set(projectsData.map(p => p.category))).sort();
