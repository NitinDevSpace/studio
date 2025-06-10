
'use client';

import React, { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { adminLoginAction, type AdminLoginFormState } from '@/app/actions';
import { KeyRound, Loader2, LogIn, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

const initialLoginState: AdminLoginFormState = {
  success: false,
  message: null,
  fieldErrors: null,
};

function LoginSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? (
        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging In...</>
      ) : (
        <><LogIn className="mr-2 h-4 w-4" /> Login</>
      )}
    </Button>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(adminLoginAction, initialLoginState);

  useEffect(() => {
    if (state.success) {
      // In a real app, a session would be established here (e.g., cookie, token).
      // For this prototype, we just redirect.
      router.push('/admin/dashboard');
    }
  }, [state.success, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <KeyRound className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-headline text-primary">Admin Panel Access</CardTitle>
          <CardDescription className="text-muted-foreground">Enter your credentials to manage the website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-foreground/80 font-medium">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Your admin username"
                required
                className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {state.fieldErrors?.username && <p className="text-xs text-destructive mt-1">{state.fieldErrors.username.join(', ')}</p>}
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground/80 font-medium">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your admin password"
                required
                className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {state.fieldErrors?.password && <p className="text-xs text-destructive mt-1">{state.fieldErrors.password.join(', ')}</p>}
            </div>
            <LoginSubmitButton />
          </form>

          {state.message && !state.success && (
            <Alert variant="destructive" className="mt-4">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          {state.message && state.success && ( // Should not typically show if redirecting immediately
            <Alert variant="default" className="mt-4">
              <LogIn className="h-4 w-4" />
              <AlertTitle>Login Successful</AlertTitle>
              <AlertDescription>{state.message} Redirecting...</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground flex-col pt-4 border-t border-border/50">
           <p className="mb-2">
            <strong>Security Notice:</strong> This login is for demonstration purposes.
            Production systems require robust authentication like Firebase Auth.
          </p>
          <Link href="/" className="hover:text-primary transition-colors">
            &larr; Back to main website
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
