
'use client';

import { Brain, CheckSquare, Lightbulb, MessageCircle, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const AskNAIForm = dynamic(() => import('@/components/AskNitinAIForm'), {
  loading: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-md" />
      </div>
      <Skeleton className="h-40 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
      <div className="flex justify-end">
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  ),
  ssr: false, // The form is interactive and client-side heavy
});

export default function AskNAIPage() {
  return (
    <div className="section-padding fade-in-page container mx-auto px-4 bg-gradient-to-br from-background via-sky-50/5 dark:via-sky-900/10 to-indigo-100/5 dark:to-indigo-900/10 min-h-[calc(100vh-10rem)] flex flex-col">
      <header className="text-center mb-8 sm:mb-10 animate-slideInUp">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold mb-3 text-foreground">
          Ask <span className="text-primary">NAI</span> 
        </h1>
        <p className="text-md text-muted-foreground max-w-xl mx-auto leading-relaxed animate-slideInUp delay-200">
          Have questions about me, my projects, or this portfolio? Ask away! 
          NAI is here to provide you with quick and informative answers in a conversational way.
        </p>
      </header>
      
      <div className="max-w-3xl w-full mx-auto animate-slideInUp delay-300 flex-grow">
        <AskNAIForm isEmbedded={false} />
      </div>

      <section className="mt-10 sm:mt-12 p-6 sm:p-8 bg-card/80 backdrop-blur-sm shadow-xl rounded-xl animate-slideInUp delay-500 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-headline font-semibold text-primary mb-5 flex items-center">
          <Brain className="mr-2.5 h-6 w-6 text-secondary" /> How NAI Works 
        </h2>
        <p className="text-foreground/80 text-sm mb-3 leading-relaxed">
          NAI uses a sophisticated language model, powered by Genkit, to understand and respond to your questions. It has been provided with context about:
        </p>
        <ul className="space-y-2.5 text-sm text-foreground/70">
          <li className="flex items-start">
            <CheckSquare className="h-4 w-4 text-secondary mr-2.5 mt-0.5 shrink-0" />
            <span><strong>My Professional Background:</strong> Experience, skills, and education.</span>
          </li>
          <li className="flex items-start">
            <Lightbulb className="h-4 w-4 text-secondary mr-2.5 mt-0.5 shrink-0" />
           <span> <strong>Portfolio Projects:</strong> Details and technologies used in the projects showcased here.</span>
          </li>
          <li className="flex items-start">
            <MessageCircle className="h-4 w-4 text-secondary mr-2.5 mt-0.5 shrink-0" />
            <span><strong>This Portfolio Site:</strong> Its purpose and how it was built.</span>
          </li>
        </ul>
        <p className="text-foreground/80 text-sm mt-4 leading-relaxed">
          Simply type your question, and NAI will do its best to provide a relevant and helpful answer based on its knowledge. Your conversation is saved in this browser tab for this session.
        </p>
      </section>
    </div>
  );
}
