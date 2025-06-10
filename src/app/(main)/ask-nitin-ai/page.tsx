import AskNitinAIForm from '@/components/AskNitinAIForm';
import { Brain, CheckSquare, Lightbulb, MessageCircle } from 'lucide-react';

export default function AskNitinAIPage() {
  return (
    <div className="section-padding fade-in-page container mx-auto px-4">
      <header className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-4">
          Ask <span className="text-glow-primary">NitinAI</span>
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto animate-slideInUp delay-200">
          Have questions about me, my projects, or this portfolio? Ask away! 
          My AI assistant is here to provide you with quick and informative answers.
        </p>
      </header>
      
      <div className="animate-slideInUp delay-300" style={{opacity: 0}}>
        <AskNitinAIForm />
      </div>

      <section className="mt-12 sm:mt-16 p-6 sm:p-8 glassmorphism-card animate-slideInUp delay-500" style={{opacity: 0}}>
        <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-primary mb-6 flex items-center">
          <Brain className="mr-3 h-7 w-7 text-secondary" /> How NitinAI Works
        </h2>
        <p className="text-foreground/80 mb-4 leading-relaxed">
          NitinAI uses a sophisticated language model, powered by Genkit, to understand and respond to your questions. It has been provided with context about:
        </p>
        <ul className="space-y-3 text-foreground/70">
          <li className="flex items-start">
            <CheckSquare className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
            <span><strong>My Professional Background:</strong> Experience, skills, and education.</span>
          </li>
          <li className="flex items-start">
            <Lightbulb className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
           <span> <strong>Portfolio Projects:</strong> Details and technologies used in the projects showcased here.</span>
          </li>
          <li className="flex items-start">
            <MessageCircle className="h-5 w-5 text-secondary mr-3 mt-1 shrink-0" />
            <span><strong>This Portfolio Site:</strong> Its purpose and how it was built.</span>
          </li>
        </ul>
        <p className="text-foreground/80 mt-5 leading-relaxed">
          Simply type your question, and NitinAI will do its best to provide a relevant and helpful answer based on its knowledge.
        </p>
      </section>
    </div>
  );
}
