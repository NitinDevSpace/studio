'use server';
/**
 * @fileOverview A Genkit flow for answering questions about Nitin Kumar, his portfolio, and projects.
 *
 * - askNitinAI -  A function that takes a question as input and returns an AI-generated answer.
 * - AskNitinAIInput - The input type for the askNitinAI function.
 * - AskNitinAIOutput - The output type for the askNitinAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { projectsData } from '@/lib/data'; // To get project details

// Data for the AI's context - ideally, this would be more structured or from a CMS
const nitinResumeContext = `
Nitin Kumar - Full Stack Developer

Summary:
A passionate Full-Stack Developer with experience in building responsive web applications and a strong foundation in both front-end and back-end technologies. Proficient in JavaScript, TypeScript, React, Next.js, Node.js, and Python. Currently enhancing skills in AI/ML integration with Genkit. Experience includes leading small development teams and end-to-end project development.

Experience:
- GET in R&D at YKK India Pvt. Ltd. (March 2024 - Oct 2024): Led a small development team, designed and prototyped innovative solutions, oversaw end-to-end project development.

Education:
- B.Tech. in Mechanical Engineering from Maharshi Dayanand University (Sept 2019 - May 2023, 70%).
- Software Development program at Scaler Academy (Sept 2024 - Oct 2025), covering Computer Architecture, DSA, Full Stack Development, RDBMS, Java, Projects, LLD, HLD.

Key Skills:
- Programming Languages: Java, JavaScript, TypeScript, C++, Python
- Web Technologies: React.js, Next.js, Node.js, HTML5, CSS3, RESTful APIs, Tailwind CSS
- Backend Frameworks: Node.js, Express.js, Django (Python), Firebase
- Databases: MongoDB, PostgreSQL, MySQL, Firebase, Microsoft SQL Server
- Development Tools: Git, GitHub, Docker, VS Code, IntelliJ IDEA, Xcode, Genkit
- Soft Skills: Problem Solving, Team Collaboration, Agile Methodologies, Communication, Adaptability

Portfolio Information:
This portfolio (NitinDevSpace) is built by Nitin Kumar using Next.js, React, Tailwind CSS, ShadCN UI components, and Genkit for AI features. It showcases his skills, projects, and professional journey.
`;

const projectContext = projectsData.map(p => {
  return `Project: ${p.name}\nDescription: ${p.description}\nTechnologies: ${p.techStack.join(', ')}\nCategory: ${p.category}\n${p.liveUrl ? `Live URL: ${p.liveUrl}\n` : ''}${p.repoUrl ? `Repository URL: ${p.repoUrl}\n` : ''}`;
}).join('\n---\n');


const AskNitinAIInputSchema = z.object({
  question: z
    .string().min(5, "Please ask a more specific question (at least 5 characters).")
    .describe("The user's question about Nitin Kumar, his portfolio, or his projects."),
});
export type AskNitinAIInput = z.infer<typeof AskNitinAIInputSchema>;

const AskNitinAIOutputSchema = z.object({
  answer: z
    .string()
    .describe('The AI-generated answer to the user\'s question.'),
});
export type AskNitinAIOutput = z.infer<typeof AskNitinAIOutputSchema>;

export async function askNitinAI(
  input: AskNitinAIInput
): Promise<AskNitinAIOutput> {
  return askNitinAIFlow(input);
}

const askNitinAIPrompt = ai.definePrompt({
  name: 'askNitinAIPrompt',
  input: {schema: AskNitinAIInputSchema},
  output: {schema: AskNitinAIOutputSchema},
  prompt: `You are NitinAI, a helpful and friendly AI assistant for Nitin Kumar's portfolio.
Your goal is to answer questions about Nitin Kumar, his professional background, his projects, or this portfolio website based *only* on the information provided below.
Be concise and informative. If the information is not available in the context, politely state that you don't have that specific detail. Do not make up information.

=== Context about Nitin Kumar ===
${nitinResumeContext}

=== Context about Nitin Kumar's Projects ===
${projectContext}
=== End of Context ===

User's Question: {{{question}}}

Based *only* on the provided context, answer the user's question.
Answer:`,
});

const askNitinAIFlow = ai.defineFlow(
  {
    name: 'askNitinAIFlow',
    inputSchema: AskNitinAIInputSchema,
    outputSchema: AskNitinAIOutputSchema,
  },
  async (input) => {
    // In a more advanced scenario, we might use tools here to fetch dynamic data
    // or decide which parts of the context are most relevant.
    // For now, the full context is passed via the prompt template.
    const {output} = await askNitinAIPrompt(input);
    
    if (!output?.answer) {
        return { answer: "I'm sorry, I couldn't generate an answer at this time. Please try rephrasing your question or ask something else." };
    }
    return output!;
  }
);
