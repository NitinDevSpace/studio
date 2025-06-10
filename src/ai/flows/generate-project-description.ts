'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating project descriptions using AI.
 *
 * - generateProjectDescription -  A function that takes project code as input and returns a generated project description.
 * - GenerateProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - GenerateProjectDescriptionOutput - The output type for the generateProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDescriptionInputSchema = z.object({
  codeContext: z
    .string()
    .describe("The project's code context to generate a description from."),
});
export type GenerateProjectDescriptionInput = z.infer<
  typeof GenerateProjectDescriptionInputSchema
>;

const GenerateProjectDescriptionOutputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The generated project description based on the code context.'),
});
export type GenerateProjectDescriptionOutput = z.infer<
  typeof GenerateProjectDescriptionOutputSchema
>;

export async function generateProjectDescription(
  input: GenerateProjectDescriptionInput
): Promise<GenerateProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

const generateDescriptionPrompt = ai.definePrompt({
  name: 'generateDescriptionPrompt',
  input: {schema: GenerateProjectDescriptionInputSchema},
  output: {schema: GenerateProjectDescriptionOutputSchema},
  prompt: `You are an AI assistant specialized in generating project descriptions based on code context.

  Given the following code context, generate a concise and engaging project description that highlights the key features, technologies used, and the overall purpose of the project.
  \nCode Context:\n{{codeContext}}`,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateDescriptionPrompt(input);
    return output!;
  }
);
