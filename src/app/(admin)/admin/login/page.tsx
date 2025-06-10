
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { KeyRound, Loader2, LogIn, ShieldAlert, User, Lock } from 'lucide-react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Updated import

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To show success message briefly

  useEffect(() => {
    // Check if user is already logged in (optional, basic check)
    // A more robust solution would involve checking auth state persistence
    if (auth && auth.currentUser) {
      // If you want to redirect if already logged in (might need a proper auth state listener)
      // router.push('/admin/dashboard'); 
    }
  }, [router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsLoggedIn(false);

    if (!auth) {
      setError("Firebase Auth is not initialized. Please check your Firebase configuration.");
      setIsLoading(false);
      return;
    }

    try {
      // Use 'devspace.admin@example.com' or the email you created in Firebase console
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setError(null); // Clear any previous error
      // Wait a bit for the success message to be visible before redirecting
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000); 
    } catch (err: any) {
      let friendlyMessage = "Login failed. Please check your email and password.";
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        friendlyMessage = "Invalid email or password.";
      } else if (err.code === 'auth/invalid-email') {
        friendlyMessage = "The email address is not valid.";
      } else if (err.code === 'auth/too-many-requests') {
        friendlyMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
      }
      console.error("Firebase Login Error:", err);
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <KeyRound className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-headline text-primary">Admin Panel Access</CardTitle>
          <CardDescription className="text-muted-foreground">Sign in to manage the website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-foreground/80 font-medium flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" /> Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g., devspace.admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground/80 font-medium flex items-center">
                <Lock className="mr-2 h-4 w-4 text-muted-foreground" /> Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your admin password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary"
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" disabled={isLoading || isLoggedIn} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging In...</>
              ) : isLoggedIn ? (
                <><LogIn className="mr-2 h-4 w-4" /> Success! Redirecting...</>
              ) : (
                <><LogIn className="mr-2 h-4 w-4" /> Login with Firebase</>
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isLoggedIn && (
             <Alert variant="default" className="mt-4 border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-500">
              <LogIn className="h-4 w-4" />
              <AlertTitle>Login Successful!</AlertTitle>
              <AlertDescription>Redirecting to dashboard...</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground flex-col pt-4 border-t border-border/50">
           <p className="mb-2">
            <strong>Security Note:</strong> This login uses Firebase Authentication. Ensure admin routes are protected.
          </p>
          <Link href="/" className="hover:text-primary transition-colors">
            &larr; Back to main website
          </Link>
        </CardFooter>
      </Card>
       <div className="mt-6 max-w-md w-full">
          <Alert variant="default" className="border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-500">
            <ShieldAlert className="h-4 w-4"/>
            <AlertTitle>Admin User</AlertTitle>
            <AlertDescription>
              Use the admin credentials you set up in Firebase Authentication. For example:
              <ul className="list-disc list-inside text-xs mt-1">
                <li>Email: <code className="bg-muted px-1 py-0.5 rounded">devspace.admin@example.com</code></li>
                <li>Password: <code className="bg-muted px-1 py-0.5 rounded">Nitin$Dev@5321</code></li>
              </ul>
               Ensure Email/Password sign-in is enabled in Firebase Authentication settings.
            </AlertDescription>
          </Alert>
        </div>
    </div>
  );
}
