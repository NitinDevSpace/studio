import SmartDescriptionForm from '@/components/SmartDescriptionForm';

export default function SmartDescriptionPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">AI-Powered Descriptions</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Leverage the power of AI to craft compelling descriptions for your projects. 
          Simply provide some context from your code or project documentation, and let our smart tool do the rest.
        </p>
      </header>
      
      <SmartDescriptionForm />

      <section className="mt-12 p-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-headline font-semibold text-primary mb-3">How it Works</h2>
        <p className="text-foreground/90 mb-2">
          Our Smart Description tool uses a sophisticated AI model to understand the nuances of your project based on the provided code or text. It identifies key functionalities, technologies used, and the overall purpose to generate a description that is:
        </p>
        <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-4">
          <li><strong>Concise:</strong> Highlights the most important aspects.</li>
          <li><strong>Engaging:</strong> Captures attention and piques interest.</li>
          <li><strong>Keyword-rich:</strong> Helps your project get discovered.</li>
        </ul>
        <p className="text-foreground/90 mt-3">
          The more relevant context you provide, the better the AI can tailor the description to your project.
        </p>
      </section>
    </div>
  );
}
