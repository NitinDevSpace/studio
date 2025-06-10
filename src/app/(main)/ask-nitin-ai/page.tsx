
import AskNitinAIForm from '@/components/AskNitinAIForm';
import { Brain, CheckSquare, Lightbulb, MessageCircle } from 'lucide-react';

export default function AskNitinAIPage() {
  return (
    <div className="section-padding fade-in-page container mx-auto px-4 bg-gradient-to-br from-background via-sky-50 to-indigo-100 min-h-[calc(100vh-10rem)]">
      <header className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold mb-3 text-gray-800">
          Ask <span className="text-primary">NitinAI</span>
        </h1>
        <p className="text-md text-gray-600 max-w-xl mx-auto animate-slideInUp delay-200 leading-relaxed">
          Have questions about me, my projects, or this portfolio? Ask away! 
          My AI assistant is here to provide you with quick and informative answers.
        </p>
      </header>
      
      <div className="animate-slideInUp delay-300 max-w-2xl mx-auto" style={{opacity: 0}}>
        <AskNitinAIForm />
      </div>

      <section className="mt-12 sm:mt-16 p-6 sm:p-8 bg-card/80 backdrop-blur-sm shadow-xl rounded-xl animate-slideInUp delay-500 max-w-3xl mx-auto" style={{opacity: 0}}>
        <h2 className="text-xl sm:text-2xl font-headline font-semibold text-primary mb-5 flex items-center">
          <Brain className="mr-2.5 h-6 w-6 text-secondary" /> How NitinAI Works
        </h2>
        <p className="text-foreground/80 text-sm mb-3 leading-relaxed">
          NitinAI uses a sophisticated language model, powered by Genkit, to understand and respond to your questions. It has been provided with context about:
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
          Simply type your question, and NitinAI will do its best to provide a relevant and helpful answer based on its knowledge.
        </p>
      </section>
    </div>
  );
}
