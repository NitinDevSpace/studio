import type { Project } from './types';

export const projectsData: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Pro',
    description: 'A full-featured e-commerce platform with Next.js, Stripe, and Firebase, focusing on a seamless user experience, advanced analytics, and robust backend.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern e-commerce dashboard analytics',
    techStack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Stripe', 'TailwindCSS'],
    category: 'E-commerce',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '2',
    name: 'IntelliTask AI Manager',
    description: 'A smart task manager that leverages AI (Genkit) to prioritize tasks, suggest deadlines, and optimize your workflow for peak productivity with a sleek UI.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'AI task manager interface',
    techStack: ['React', 'Node.js', 'Python', 'AI/ML', 'Genkit', 'ShadCN UI'],
    category: 'Web App',
    liveUrl: '#',
  },
  {
    id: '3',
    name: 'FitLife Mobile Tracker',
    description: 'A cross-platform mobile app for tracking fitness activities, setting goals, and visualizing progress with an intuitive and motivating interface.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mobile fitness app charts',
    techStack: ['React Native', 'Firebase', 'TypeScript', 'Charts.js'],
    category: 'Mobile App',
    repoUrl: '#',
  },
  {
    id: '4',
    name: 'NitinDevSpace Portfolio',
    description: 'This very portfolio site, built with Next.js and Tailwind CSS, designed to elegantly showcase my skills, projects, and journey as a developer.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'developer portfolio homepage',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Framer Motion'],
    category: 'Portfolio',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '5',
    name: 'InsightDash Visualization',
    description: 'An interactive dashboard for visualizing complex datasets, featuring dynamic charts, filters, and real-time data updates, built with React and D3.js.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'data visualization dashboard graph',
    techStack: ['React', 'D3.js', 'Node.js', 'Express', 'Socket.IO'],
    category: 'Web App',
  },
  {
    id: '6',
    name: 'ConnectSphere Chat App',
    description: 'A scalable real-time chat application using WebSockets and Firebase, offering instant messaging, group chats, media sharing, and rich notifications.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chat application user interface',
    techStack: ['React', 'Node.js', 'Firebase', 'WebSockets', 'Redux'],
    category: 'Web App',
    liveUrl: '#',
    repoUrl: '#',
  },
];

export const allTechStacks = Array.from(new Set(projectsData.flatMap(p => p.techStack))).sort();
export const allCategories = Array.from(new Set(projectsData.map(p => p.category))).sort();
