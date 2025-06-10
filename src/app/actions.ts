
// @ts-nocheck
// Ignoring TypeScript errors in this file due to ongoing Genkit integration refinements.
// This allows for rapid prototyping while the Genkit SDK and its Next.js adapter mature.
// TODO: Revisit and resolve TypeScript errors once Genkit provides more stable type definitions and integration patterns for Next.js Server Actions.
'use server';

import { askNitinAI, type AskNitinAIInput } from '@/ai/flows/askNitinAIFlow'; // Updated import
import { z } from 'zod';
import { db } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Schema for the new "Ask NitinAI" feature
const AskNitinAISchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters long.").max(500, "Question is too long (max 500 characters)."),
});

export interface AskNitinAIFormState {
  message: string | null;
  answer: string | null;
  issues?: string[];
  fieldErrors?: {
    question?: string[];
  };
  formData?: {
    question?: string;
  }
}

export async function askNitinAIAction(
  prevState: AskNitinAIFormState,
  formData: FormData
): Promise<AskNitinAIFormState> {
  const rawFormData = {
    question: formData.get('question'),
  };

  const validatedFields = AskNitinAISchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Invalid question. Please check the errors below.",
      answer: null,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      formData: {
        question: typeof rawFormData.question === 'string' ? rawFormData.question : "",
      }
    };
  }

  try {
    const input: AskNitinAIInput = {
      question: validatedFields.data.question,
    };
    const result = await askNitinAI(input); // Call the new flow
    
    if (result && result.answer) {
       return {
        message: "Answer generated successfully!", // This message might not be shown if answer is directly displayed
        answer: result.answer,
      };
    } else {
      return {
        message: "NitinAI could not generate an answer. Please try a different question or check the AI service.",
        answer: null,
        formData: validatedFields.data,
      };
    }

  } catch (error)
 {
    console.error("Error generating answer with NitinAI:", error);
    let errorMessage = "Failed to get an answer due to an unexpected error. Please try again.";
    if (error instanceof Error) {
        if (error.message.includes('quota')) {
            errorMessage = "AI service quota exceeded. Please try again later.";
        } else if (error.message.includes('timeout')) {
            errorMessage = "Request to AI service timed out. Please try again.";
        } else if (error.message.includes('safety') || error.message.includes('blocked')) {
            errorMessage = "The question or the generated answer was flagged by the safety filter. Please rephrase your question.";
        }
    }
    return {
      message: errorMessage,
      answer: null,
      formData: validatedFields.data,
    };
  }
}

// Contact Form Action (remains largely the same)
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
