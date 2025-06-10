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
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 py-3 text-base">
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
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-card/70 backdrop-blur-xl border-border/40 rounded-xl transform hover:-translate-y-1 transition-all duration-300">
      <CardHeader className="p-6 sm:p-8">
        <CardTitle className="font-headline text-2xl text-primary flex items-center">
          <Sparkles className="mr-2.5 h-7 w-7" />
          Smart Project Description
        </CardTitle>
        <CardDescription className="text-foreground/70 pt-1">
          Paste your project&apos;s code (e.g., a key component or README snippet) below. 
          Our AI will analyze it and suggest an engaging project description.
          Minimum 50 characters.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4 p-6 sm:p-8 pt-0">
          <div>
            <Label htmlFor="codeContext" className="font-semibold text-foreground/90">Project Code / Context</Label>
            <Textarea
              id="codeContext"
              name="codeContext"
              placeholder="Paste your code or a detailed summary of your project here..."
              rows={12}
              className="mt-1.5 bg-input border-border/70 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg text-base"
              defaultValue={state.formData?.codeContext || ""}
              aria-describedby="codeContextError"
            />
            {state.fieldErrors?.codeContext && (
              <p id="codeContextError" className="text-sm text-destructive mt-1.5">
                {state.fieldErrors.codeContext.join(', ')}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end border-t border-border/30 pt-6 p-6 sm:p-8">
          <SubmitButton />
        </CardFooter>
      </form>

      {state.message && !state.description && ( 
        <div className="p-6 sm:p-8 border-t border-border/30">
           <Alert variant="destructive" className="mt-0">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Request Failed</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        </div>
      )}

      {state.description && (
        <div className="p-6 sm:p-8 border-t border-border/30">
          <Alert variant="default" className="mt-0 bg-primary/5 border-primary/30 text-primary-foreground">
             <CheckCircle className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary font-semibold text-lg">Generated Description:</AlertTitle>
            <AlertDescription className="text-foreground/90 whitespace-pre-wrap py-2 text-base leading-relaxed">
              {state.description}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
