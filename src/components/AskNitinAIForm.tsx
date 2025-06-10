
'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { askNitinAIAction, type AskNitinAIFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, AlertCircle, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const initialState: AskNitinAIFormState = {
  message: null,
  answer: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 py-2.5 text-sm">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Ask NitinAI
        </>
      )}
    </Button>
  );
}

// For use inside chatbot overlay, we might want a version without the Card wrapper.
// This prop allows conditional rendering of the Card.
interface AskNitinAIFormProps {
  isEmbedded?: boolean; 
}

export default function AskNitinAIForm({ isEmbedded = false }: AskNitinAIFormProps) {
  const [state, formAction] = useFormState(askNitinAIAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.answer && !isEmbedded) { // Only toast errors if not embedded (embedded has its own error display)
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
    if (state.message && state.answer) { // If answer is successful, clear the form
        formRef.current?.reset();
    }
  }, [state.message, state.answer, toast, isEmbedded]);

  const FormContent = (
    <form action={formAction} ref={formRef}>
      <CardContent className={cn("space-y-3 p-6 pt-0", isEmbedded && "p-0")}>
        <div>
          <Label htmlFor="question" className="font-medium text-foreground/80 text-sm sr-only">Your Question</Label>
          <Textarea
            id="question"
            name="question"
            placeholder="e.g., What are Nitin's key skills?"
            rows={isEmbedded ? 3 : 4}
            className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 rounded-md text-sm shadow-sm"
            defaultValue={state.formData?.question || ""}
            aria-describedby="questionError"
            required
          />
          {state.fieldErrors?.question && (
            <p id="questionError" className="text-xs text-destructive mt-1">
              {state.fieldErrors.question.join(', ')}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className={cn("flex justify-end border-t border-border/50 p-4", isEmbedded && "p-0 pt-3")}>
        <SubmitButton />
      </CardFooter>
    </form>
  );

  const ResultsDisplay = (
    <>
      {state.message && !state.answer && (
        <div className={cn("p-6 border-t border-border/50", isEmbedded && "p-0 pt-3")}>
           <Alert variant="destructive" className="mt-0 text-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Request Failed</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {state.answer && (
        <div className={cn("p-6 border-t border-border/50", isEmbedded && "p-0 pt-3 mt-3")}>
          <Alert variant="default" className="mt-0 bg-primary/5 border-primary/20 text-sm">
             <Brain className="h-5 w-5 text-primary shrink-0" />
            <AlertTitle className="text-primary font-semibold text-md">NitinAI Says:</AlertTitle>
            <AlertDescription className="text-foreground/80 whitespace-pre-wrap py-1.5 leading-relaxed max-h-48 overflow-y-auto">
              {state.answer}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );

  if (isEmbedded) {
    return (
      <div className="space-y-4">
        {FormContent}
        {ResultsDisplay}
      </div>
    );
  }

  return (
    <Card className="w-full bg-card/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl">
      <CardHeader className="p-6">
        <CardTitle className="font-headline text-xl text-primary flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-secondary" />
          Your Question
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-1 text-sm">
          Ask anything about Nitin Kumar, his projects, or this portfolio.
        </CardDescription>
      </CardHeader>
      {FormContent}
      {ResultsDisplay}
    </Card>
  );
}
