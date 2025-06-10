// @ts-nocheck
// Ignoring TypeScript errors in this file due to ongoing Genkit integration refinements.
// This allows for rapid prototyping while the Genkit SDK and its Next.js adapter mature.
// TODO: Revisit and resolve TypeScript errors once Genkit provides more stable type definitions and integration patterns for Next.js Server Actions.
'use server';
import { generateProjectDescription, type GenerateProjectDescriptionInput } from '@/ai/flows/generate-project-description';
import { z } from 'zod';

const SmartDescriptionSchema = z.object({
  codeContext: z.string().min(50, "Code context must be at least 50 characters long to provide enough information for a meaningful description.").max(5000, "Code context is too long. Please provide a more concise snippet (max 5000 characters)."),
});

export interface SmartDescriptionFormState {
  message: string | null;
  description: string | null;
  issues?: string[];
  fieldErrors?: {
    codeContext?: string[];
  };
  formData?: {
    codeContext?: string;
  }
}

export async function getSmartDescriptionAction(
  prevState: SmartDescriptionFormState,
  formData: FormData
): Promise<SmartDescriptionFormState> {
  const rawFormData = {
    codeContext: formData.get('codeContext'),
  };

  const validatedFields = SmartDescriptionSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Invalid form data. Please check the errors below.",
      description: null,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      formData: {
        codeContext: typeof rawFormData.codeContext === 'string' ? rawFormData.codeContext : "",
      }
    };
  }

  try {
    const input: GenerateProjectDescriptionInput = {
      codeContext: validatedFields.data.codeContext,
    };
    // This is where you would call your AI flow.
    // Ensure `generateProjectDescription` is correctly imported and works.
    const result = await generateProjectDescription(input);
    
    if (result && result.projectDescription) {
       return {
        message: "Description generated successfully!",
        description: result.projectDescription,
      };
    } else {
      // This case handles if the AI returns an empty or malformed response
      return {
        message: "AI could not generate a description. Please try a different input or check the AI service.",
        description: null,
        formData: validatedFields.data,
      };
    }

  } catch (error) {
    console.error("Error generating description with AI:", error);
    // Determine if the error is from the AI service or network, etc.
    let errorMessage = "Failed to generate description due to an unexpected error. Please try again.";
    if (error instanceof Error) {
        // Potentially more specific error handling based on error.name or error.message
        if (error.message.includes('quota')) {
            errorMessage = "AI service quota exceeded. Please try again later.";
        } else if (error.message.includes('timeout')) {
            errorMessage = "Request to AI service timed out. Please try again.";
        }
    }
    return {
      message: errorMessage,
      description: null,
      formData: validatedFields.data,
    };
  }
}
