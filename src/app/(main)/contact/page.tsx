'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Linkedin, Github, MapPin, Send, Loader2, UserCircle } from "lucide-react";
import Link from "next/link";
import { useFormStatus, useFormState } from 'react-dom';
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";


async function submitContactForm(prevState: any, formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
  const name = formData.get('name');
  // Basic validation example
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { success: false, message: "Please enter a valid name.", fieldErrors: { name: "Name is too short." } };
  }
  console.log("Form submitted:", Object.fromEntries(formData.entries()));
  return { success: true, message: "Your message has been sent successfully! I'll get back to you soon." };
}

const initialState = {
  message: null,
  success: false,
  fieldErrors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 py-3 text-base">
      {pending ? (
        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
      ) : (
        <><Send className="mr-2 h-4 w-4" /> Send Message</>
      )}
    </Button>
  );
}


export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Message Sent!" : "Oops!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
    }
  }, [state, toast]);


  return (
    <div className="space-y-12 py-8 sm:py-16 fade-in-page">
      <header className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary mb-4 animate-slideInUp">Let&apos;s Connect</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto animate-slideInUp delay-200">
          I&apos;m always excited to discuss new projects, creative ideas, or opportunities to be part of something amazing. Feel free to reach out!
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start px-4">
        <Card className="shadow-xl bg-card/70 backdrop-blur-xl border-border/40 rounded-xl animate-slideInUp delay-300 transform hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="p-6 sm:p-8">
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <UserCircle className="mr-3 h-7 w-7 text-accent"/> Contact Information
            </CardTitle>
            <CardDescription className="text-foreground/70">You can reach me through the following channels:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-6 sm:p-8 pt-0">
            <div className="flex items-center space-x-3 group">
              <Mail className="h-5 w-5 text-accent transition-transform group-hover:scale-110 group-hover:text-primary" />
              <Link href="mailto:your.email@example.com" className="text-foreground/90 hover:text-primary transition-colors duration-300">
                your.email@example.com
              </Link>
            </div>
            <div className="flex items-center space-x-3 group">
              <Phone className="h-5 w-5 text-accent transition-transform group-hover:scale-110 group-hover:text-primary" />
              <span className="text-foreground/90">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <MapPin className="h-5 w-5 text-accent transition-transform group-hover:scale-110 group-hover:text-primary" />
              <span className="text-foreground/90">San Francisco, CA (Open to remote)</span>
            </div>
            <div className="flex items-center space-x-4 pt-6">
              <Link href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <Button variant="outline" size="icon" className="text-accent border-accent/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-110 rounded-full shadow-md hover:shadow-accent/30">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                 <Button variant="outline" size="icon" className="text-accent border-accent/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-110 rounded-full shadow-md hover:shadow-accent/30">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl bg-card/70 backdrop-blur-xl border-border/40 rounded-xl animate-slideInUp delay-500 transform hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="p-6 sm:p-8">
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
             <Send className="mr-3 h-7 w-7 text-accent"/> Send a Message
            </CardTitle>
            <CardDescription className="text-foreground/70">Or fill out this form and I&apos;ll get back to you.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 pt-0">
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground/80 font-medium">Full Name</Label>
                <Input id="name" name="name" type="text" placeholder="Your Name" required 
                       className="mt-1.5 bg-input border-border/70 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg py-2.5 text-base" />
                {state.fieldErrors?.name && <p className="text-xs text-destructive mt-1.5">{state.fieldErrors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground/80 font-medium">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="your.email@example.com" required 
                       className="mt-1.5 bg-input border-border/70 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg py-2.5 text-base" />
              </div>
              <div>
                <Label htmlFor="subject" className="text-foreground/80 font-medium">Subject</Label>
                <Input id="subject" name="subject" type="text" placeholder="Project Inquiry" required 
                       className="mt-1.5 bg-input border-border/70 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg py-2.5 text-base" />
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground/80 font-medium">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required 
                          className="mt-1.5 bg-input border-border/70 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg text-base" />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
