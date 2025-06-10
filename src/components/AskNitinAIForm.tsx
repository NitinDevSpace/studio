'use client';

import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { askNitinAIAction, type AskNitinAIFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, AlertCircle, CheckCircle, Loader2, Sparkles, MessageSquare } from 'lucide-react'; // Added Sparkles
import { useToast } from "@/hooks/use-toast";

const initialState: AskNitinAIFormState = {
  message: null,
  answer: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 py-3 text-base">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> {/* Changed Icon */}
          Ask NitinAI
        </>
      )}
    </Button>
  );
}

export default function AskNitinAIForm() {
  const [state, formAction] = useFormState(askNitinAIAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.answer) { // Error
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
    // Success toast is handled implicitly by displaying the answer
  }, [state.message, state.answer, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto glassmorphism-card transform hover:-translate-y-1 transition-all duration-300">
      <CardHeader className="p-6 sm:p-8">
        <CardTitle className="font-headline text-2xl text-primary flex items-center">
          <MessageSquare className="mr-2.5 h-7 w-7 text-secondary" /> {/* Changed Icon */}
          Your Question
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-1">
          Ask anything about Nitin Kumar, his projects, or this portfolio.
          The AI will try its best to answer.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4 p-6 sm:p-8 pt-0">
          <div>
            <Label htmlFor="question" className="font-semibold text-foreground/90">Your Question</Label>
            <Textarea
              id="question"
              name="question"
              placeholder="e.g., What technologies was the E-commerce Platform Pro built with?"
              rows={5} 
              className="mt-1.5 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg text-base"
              defaultValue={state.formData?.question || ""}
              aria-describedby="questionError"
              required
            />
            {state.fieldErrors?.question && (
              <p id="questionError" className="text-sm text-destructive mt-1.5">
                {state.fieldErrors.question.join(', ')}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end border-t border-border/30 pt-6 p-6 sm:p-8">
          <SubmitButton />
        </CardFooter>
      </form>

      {state.message && !state.answer && ( 
        <div className="p-6 sm:p-8 border-t border-border/30">
           <Alert variant="destructive" className="mt-0">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Request Failed</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {state.answer && (
        <div className="p-6 sm:p-8 border-t border-border/30">
          <Alert variant="default" className="mt-0 bg-primary/5 border-primary/30 text-primary-foreground">
             <Brain className="h-5 w-5 text-primary shrink-0" /> {/* Changed Icon */}
            <AlertTitle className="text-primary font-semibold text-lg">NitinAI Says:</AlertTitle>
            <AlertDescription className="text-foreground/90 whitespace-pre-wrap py-2 text-base leading-relaxed">
              {state.answer}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
