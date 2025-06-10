
// @ts-nocheck
// Ignoring TypeScript errors in this file due to ongoing Genkit integration refinements.
// This allows for rapid prototyping while the Genkit SDK and its Next.js adapter mature.
// TODO: Revisit and resolve TypeScript errors once Genkit provides more stable type definitions and integration patterns for Next.js Server Actions.
'use server';
import { generateProjectDescription, type GenerateProjectDescriptionInput } from '@/ai/flows/generate-project-description';
import { z } from 'zod';
import { db } from '@/lib/firebase'; // Import Firestore instance
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
    const result = await generateProjectDescription(input);
    
    if (result && result.projectDescription) {
       return {
        message: "Description generated successfully!",
        description: result.projectDescription,
      };
    } else {
      return {
        message: "AI could not generate a description. Please try a different input or check the AI service.",
        description: null,
        formData: validatedFields.data,
      };
    }

  } catch (error) {
    console.error("Error generating description with AI:", error);
    let errorMessage = "Failed to generate description due to an unexpected error. Please try again.";
    if (error instanceof Error) {
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

// Contact Form Action
const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters long."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export interface ContactFormState {
  success: boolean;
  message: string | null;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    subject?: string[];
    message?: string[];
  };
}

export async function submitContactFormAction(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const validatedFields = ContactFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data. Please check the errors below.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!db) {
    console.error("Firestore not initialized. Cannot submit contact form.");
    return {
      success: false,
      message: "Server configuration error. Could not submit form. Please try again later.",
    };
  }

  try {
    await addDoc(collection(db, "contactSubmissions"), {
      ...validatedFields.data,
      submittedAt: serverTimestamp(),
    });
    return {
      success: true,
      message: "Your message has been sent successfully! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error submitting contact form to Firestore:", error);
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    };
  }
}
