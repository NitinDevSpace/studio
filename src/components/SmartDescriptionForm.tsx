'use client';

import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getSmartDescriptionAction, type SmartDescriptionFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


const initialState: SmartDescriptionFormState = {
  message: null,
  description: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Description
        </>
      )}
    </Button>
  );
}

export default function SmartDescriptionForm() {
  const [state, formAction] = useFormState(getSmartDescriptionAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.description) { // Success
        toast({
          title: "Success!",
          description: state.message,
          variant: "default",
        });
      } else { // Error
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state.message, state.description, toast]);


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary flex items-center">
          <Sparkles className="mr-2 h-6 w-6" />
          Smart Project Description Generator
        </CardTitle>
        <CardDescription>
          Paste your project&apos;s code (e.g., a key component or README snippet) below. 
          Our AI will analyze it and suggest an engaging project description.
          Minimum 50 characters.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="codeContext" className="font-semibold">Project Code / Context</Label>
            <Textarea
              id="codeContext"
              name="codeContext"
              placeholder="Paste your code or a detailed summary of your project here..."
              rows={12}
              className="mt-1"
              defaultValue={state.formData?.codeContext || ""}
              aria-describedby="codeContextError"
            />
            {state.fieldErrors?.codeContext && (
              <p id="codeContextError" className="text-sm text-destructive mt-1">
                {state.fieldErrors.codeContext.join(', ')}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end border-t pt-6">
          <SubmitButton />
        </CardFooter>
      </form>

      {state.message && !state.description && ( // Only show this general alert if there's a message but no successful description
        <div className="p-6">
           <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Request Failed</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {state.description && (
        <div className="p-6 border-t">
          <Alert variant="default" className="mt-0 bg-primary/10 border-primary/30">
             <CheckCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Generated Description:</AlertTitle>
            <AlertDescription className="text-foreground whitespace-pre-wrap py-2">
              {state.description}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
