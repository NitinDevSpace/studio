'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Linkedin, Github, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { useFormStatus, useFormState } from 'react-dom';

// Placeholder server action
async function submitContactForm(prevState: any, formData: FormData) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Form submitted:", Object.fromEntries(formData.entries()));
  // In a real app, you'd send this data to a backend or email service
  return { message: "Your message has been sent successfully! I'll get back to you soon." };
}

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <><Send className="mr-2 h-4 w-4 animate-pulse" /> Sending...</>
      ) : (
        <><Send className="mr-2 h-4 w-4" /> Send Message</>
      )}
    </Button>
  );
}


export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">Get In Touch</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          I&apos;m always excited to discuss new projects, creative ideas, or opportunities to be part of something amazing. Feel free to reach out!
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Contact Information</CardTitle>
            <CardDescription>You can reach me through the following channels:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-accent" />
              <Link href="mailto:your.email@example.com" className="text-foreground/90 hover:text-primary transition-colors">
                your.email@example.com
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-accent" />
              <span className="text-foreground/90">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-foreground/90">San Francisco, CA (Open to remote)</span>
            </div>
            <div className="flex items-center space-x-3 pt-4">
              <Link href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <Button variant="outline" size="icon" className="text-accent hover:bg-accent hover:text-accent-foreground">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                 <Button variant="outline" size="icon" className="text-accent hover:bg-accent hover:text-accent-foreground">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Send a Message</CardTitle>
            <CardDescription>Or fill out this form and I&apos;ll get back to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" type="text" placeholder="Your Name" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" type="text" placeholder="Project Inquiry" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required />
              </div>
              <SubmitButton />
              {state?.message && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">{state.message}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
