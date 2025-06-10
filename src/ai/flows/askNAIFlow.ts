
'use server';
/**
 * @fileOverview A Genkit flow for answering questions about Nitin Kumar, his portfolio, and projects, and engaging in general conversation.
 *
 * - askNAI -  A function that takes a question as input and returns an AI-generated answer.
 * - AskNAIInput - The input type for the askNAI function.
 * - AskNAIOutput - The output type for the askNAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { projectsData } from '@/lib/data'; // To get project details

// Data for the AI's context - ideally, this would be more structured or from a CMS
const nitinResumeContext = `
Nitin Kumar - Software Engineer // Full Stack Developer // AI Enthusiast

Summary:
A passionate Full-Stack Developer with experience in building responsive web applications and a strong foundation in both front-end and back-end technologies. Proficient in JavaScript, TypeScript, React, Next.js, Node.js, and Python. Currently enhancing skills in AI/ML integration with Genkit. Experience includes leading small development teams, end-to-end project development, and 3 years of part-time experience in video editing.

Experience:
- GET in R&D at YKK India Pvt. Ltd. (March 2024 - Oct 2024): Led a small development team, designed and prototyped innovative solutions, oversaw end-to-end project development.
- Video Editor (Part-time/Freelance, Approx. 3 years prior to 2024): Produced and edited video content for various clients, focusing on promotional materials and tutorials.

Education:
- Software Development program at Scaler Academy (Sept 2024 - Oct 2025), covering Computer Architecture, DSA, Full Stack Development, RDBMS, Java, Projects, LLD, HLD.
- B.Tech. in Mechanical Engineering from Maharshi Dayanand University (Sept 2019 - May 2023, 70%).
- Higher Secondary Certificate (HSC/12th Grade) from [Your School Name, City] ([Year of Completion], [Percentage/CGPA]%). (Example: CBSE Board)
- Secondary School Certificate (SSC/10th Grade) from [Your School Name, City] ([Year of Completion], [Percentage/CGPA]%). (Example: CBSE Board)


Key Skills:
- Programming Languages: Java, JavaScript, TypeScript, C++, Python
- Web Technologies: React.js, Next.js, Node.js, HTML5, CSS3, RESTful APIs, Tailwind CSS
- Backend Frameworks: Node.js, Express.js, Django (Python), Firebase
- Databases: MongoDB, PostgreSQL, MySQL, Firebase, Microsoft SQL Server
- Development Tools: Git, GitHub, Docker, VS Code, IntelliJ IDEA, Xcode, Genkit
- Other Skills: Video Editing (Adobe Premiere Pro, Final Cut Pro)
- Soft Skills: Problem Solving, Team Collaboration, Agile Methodologies, Communication, Adaptability

Portfolio Information:
This portfolio (NitinDevSpace) is built by Nitin Kumar using Next.js, React, Tailwind CSS, ShadCN UI components, and Genkit for AI features (like NAI, the AI assistant). It showcases his skills, projects, and professional journey.
`;

const projectContext = projectsData.map(p => {
  return `Project: ${p.name}\nDescription: ${p.description}\nTechnologies: ${p.techStack.join(', ')}\nCategory: ${p.category}\n${p.liveUrl ? `Live URL: ${p.liveUrl}\n` : ''}${p.repoUrl ? `Repository URL: ${p.repoUrl}\n` : ''}`;
}).join('\n---\n');


const AskNAIInputSchema = z.object({
  question: z
    .string().min(1, "Please ask a question.") 
    .describe("The user's question about Nitin Kumar, his portfolio, his projects, or a general conversational query."),
});
export type AskNAIInput = z.infer<typeof AskNAIInputSchema>;

const AskNAIOutputSchema = z.object({
  answer: z
    .string()
    .describe('The AI-generated answer to the user\'s question.'),
});
export type AskNAIOutput = z.infer<typeof AskNAIOutputSchema>;

export async function askNAI(
  input: AskNAIInput
): Promise<AskNAIOutput> {
  return askNAIFlow(input);
}

const askNAIPrompt = ai.definePrompt({
  name: 'askNAIPrompt',
  input: {schema: AskNAIInputSchema},
  output: {schema: AskNAIOutputSchema},
  prompt: `You are NAI, a helpful and friendly AI assistant for Nitin Kumar's portfolio (NitinDevSpace).
Your primary goal is to answer questions about Nitin Kumar, his professional background, his projects, or this portfolio website based *only* on the information provided below.
Be concise and informative. If the information is not available in the context for specific questions about Nitin, politely state that you don't have that specific detail. Do not make up information about Nitin.

You can also engage in simple, friendly conversation. For example, if greeted with "hi" or asked "how are you?", respond naturally and politely (e.g., "Hello! How can I help you today?" or "I'm doing well, thank you for asking! How can I assist you?").
If the user's question is conversational and not related to Nitin, you can answer it generally.

=== Context about Nitin Kumar ===
${nitinResumeContext}

=== Context about Nitin Kumar's Projects ===
${projectContext}
=== End of Context ===

User's Question: {{{question}}}

Based on the instructions above and *only* the provided context for questions about Nitin, answer the user's question.
Answer:`,
});

const askNAIFlow = ai.defineFlow(
  {
    name: 'askNAIFlow',
    inputSchema: AskNAIInputSchema,
    outputSchema: AskNAIOutputSchema,
  },
  async (input) => {
    const {output} = await askNAIPrompt(input);
    
    if (!output?.answer) {
        return { answer: "I'm sorry, I couldn't generate an answer at this time. Please try rephrasing your question or ask something else." };
    }
    return output!;
  }
);

    