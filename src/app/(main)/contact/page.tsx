
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Linkedin, Github, MapPin, Send, Loader2, UserCircle, Instagram, Code, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useFormStatus, useFormState } from 'react-dom';
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitContactFormAction, type ContactFormState } from '@/app/actions';


const initialState: ContactFormState = {
  message: null,
  success: false,
  fieldErrors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 py-3 text-base">
      {pending ? (
        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
      ) : (
        <><Send className="mr-2 h-4 w-4" /> Send Message</>
      )}
    </Button>
  );
}


export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactFormAction, initialState);
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
    <div className="section-padding fade-in-page container mx-auto px-4">
      <header className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-4">
          Get In <span className="text-glow-primary">Touch</span>
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto animate-slideInUp delay-200">
          Have a project in mind, a question, or just want to connect? I&apos;m here to listen. Drop me a line!
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <Card className="glassmorphism-card animate-slideInUp delay-300 transform hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="p-6 sm:p-8">
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
              <UserCircle className="mr-3 h-7 w-7 text-secondary"/> Contact Information
            </CardTitle>
            <CardDescription className="text-muted-foreground">Find me through these channels or on social media.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-6 sm:p-8 pt-0">
            <div className="flex items-center space-x-3 group">
              <Mail className="h-5 w-5 text-secondary transition-transform group-hover:scale-110 group-hover:text-primary" />
              <Link href="mailto:nitindevspace@gmail.com" className="text-foreground/90 hover:text-primary transition-colors duration-300">
                nitindevspace@gmail.com
              </Link>
            </div>
            <div className="flex items-center space-x-3 group">
              <Phone className="h-5 w-5 text-secondary transition-transform group-hover:scale-110 group-hover:text-primary" />
              <span className="text-foreground/90">+91 74041 85860</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <MapPin className="h-5 w-5 text-secondary transition-transform group-hover:scale-110 group-hover:text-primary" />
              <span className="text-foreground/90">Bawal, Haryana, India (Remote)</span>
            </div>
            <div className="pt-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Connect with me</h3>
              <div className="flex items-center space-x-3">
                {[
                  { href: "https://linkedin.com/in/nitin5kumar02", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://github.com/NitinDevSpace", icon: Github, label: "GitHub" },
                  { href: "https://instagram.com/your_insta_username", icon: Instagram, label: "Instagram" }, // Update href
                  { href: "https://www.hackerrank.com/profile/your_hackerrank", icon: Code, label: "HackerRank" }, // Update href
                  { href: "https://leetcode.com/your_leetcode/", icon: ShieldCheck, label: "LeetCode" } // Update href
                ].map(social => (
                  <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <Button variant="outline" size="icon" className="text-secondary border-secondary/50 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 transform hover:scale-110 rounded-full shadow-md hover:shadow-secondary/30">
                      <social.icon className="h-5 w-5" />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism-card animate-slideInUp delay-500 transform hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="p-6 sm:p-8">
            <CardTitle className="font-headline text-2xl text-primary flex items-center">
             <Send className="mr-3 h-7 w-7 text-secondary"/> Send a Message
            </CardTitle>
            <CardDescription className="text-muted-foreground">Fill out the form and I&apos;ll get back to you promptly.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 pt-0">
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground/80 font-medium">Full Name</Label>
                <Input id="name" name="name" type="text" placeholder="Your Name" required 
                       className="mt-1.5 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg py-2.5 text-base" />
                {state.fieldErrors?.name && <p className="text-xs text-destructive mt-1.5">{state.fieldErrors.name.join(', ')}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground/80 font-medium">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="your.email@example.com" required 
                       className="mt-1.5 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg py-2.5 text-base" />
                {state.fieldErrors?.email && <p className="text-xs text-destructive mt-1.5">{state.fieldErrors.email.join(', ')}</p>}
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground/80 font-medium">Phone Number (Optional)</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567"
                       className="mt-1.5 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg py-2.5 text-base" />
                {state.fieldErrors?.phone && <p className="text-xs text-destructive mt-1.5">{state.fieldErrors.phone.join(', ')}</p>}
              </div>
              <div>
                <Label htmlFor="subject" className="text-foreground/80 font-medium">Subject</Label>
                <Input id="subject" name="subject" type="text" placeholder="Project Inquiry" required 
                       className="mt-1.5 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg py-2.5 text-base" />
                {state.fieldErrors?.subject && <p className="text-xs text-destructive mt-1.5">{state.fieldErrors.subject.join(', ')}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground/80 font-medium">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required 
                          className="mt-1.5 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/70 rounded-lg text-base" />
                {state.fieldErrors?.message && <p className="text-xs text-destructive mt-1.5">{state.fieldErrors.message.join(', ')}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
