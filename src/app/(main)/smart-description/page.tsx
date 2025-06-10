import SmartDescriptionForm from '@/components/SmartDescriptionForm';
import { Brain, CheckSquare, Lightbulb } from 'lucide-react';

export default function SmartDescriptionPage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12 fade-in-page">
      <header className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary mb-4 animate-slideInUp">AI-Powered Descriptions</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-slideInUp delay-200">
          Leverage the power of AI to craft compelling descriptions for your projects. 
          Simply provide some context from your code or project documentation, and let our smart tool do the rest.
        </p>
      </header>
      
      <div className="animate-slideInUp delay-300" style={{opacity: 0}}>
        <SmartDescriptionForm />
      </div>

      <section className="mt-12 p-6 sm:p-8 bg-card/70 backdrop-blur-xl border-border/40 rounded-xl shadow-xl animate-slideInUp delay-500" style={{opacity: 0}}>
        <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-primary mb-4 flex items-center">
          <Brain className="mr-3 h-7 w-7 text-accent" /> How It Works
        </h2>
        <p className="text-foreground/80 mb-4 leading-relaxed">
          Our Smart Description tool uses a sophisticated AI model to understand the nuances of your project based on the provided code or text. It identifies key functionalities, technologies used, and the overall purpose to generate a description that is:
        </p>
        <ul className="space-y-3 text-foreground/70">
          <li className="flex items-start">
            <CheckSquare className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
            <span><strong>Concise:</strong> Highlights the most important aspects, getting straight to the point.</span>
          </li>
          <li className="flex items-start">
            <Lightbulb className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
           <span> <strong>Engaging:</strong> Captures attention and piques interest with well-crafted language.</span>
          </li>
          <li className="flex items-start">
            <Brain className="h-5 w-5 text-accent mr-3 mt-1 shrink-0" />
            <span><strong>Keyword-rich:</strong> Helps your project get discovered by including relevant terms.</span>
          </li>
        </ul>
        <p className="text-foreground/80 mt-5 leading-relaxed">
          The more relevant and detailed context you provide, the better the AI can tailor the description to your project&apos;s unique strengths.
        </p>
      </section>
    </div>
  );
}
