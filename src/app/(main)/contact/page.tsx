
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Linkedin, Github, MapPin, Send, Loader2, UserCircle, Instagram, Code, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useFormStatus, useActionState } from 'react'; // Updated import
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
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 py-3 text-base">
      {pending ? (
        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
      ) : (
        <><Send className="mr-2 h-4 w-4" /> Send Message</>
      )}
    </Button>
  );
}


export default function ContactPage() {
  const [state, formAction] = useActionState(submitContactFormAction, initialState);
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
    <div className="section-padding fade-in-page container mx-auto px-4 bg-gradient-to-br from-background via-sky-50/5 dark:via-sky-900/10 to-indigo-100/5 dark:to-indigo-900/10 min-h-[calc(100vh-10rem)]">
      <header className="text-center mb-12 sm:mb-16 animate-slideInUp">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold mb-3 text-foreground">
          Get In <span className="text-primary">Touch</span>
        </h1>
        <p className="text-md text-muted-foreground max-w-xl mx-auto leading-relaxed animate-slideInUp delay-200">
          Have a project in mind, a question, or just want to connect? I&apos;m here to listen. Drop me a line!
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start max-w-5xl mx-auto">
        <Card className="bg-card/90 backdrop-blur-sm p-1 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl animate-slideInUp delay-300">
          <CardHeader className="p-6 sm:p-7">
            <CardTitle className="font-headline text-xl text-primary flex items-center">
              <UserCircle className="mr-2.5 h-6 w-6 text-secondary"/> Contact Information
            </CardTitle>
            <CardDescription className="text-muted-foreground pt-0.5">Find me through these channels or on social media.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6 sm:p-7 pt-0">
            <div className="flex items-center space-x-3 group">
              <Mail className="h-5 w-5 text-secondary transition-transform group-hover:scale-110 group-hover:text-primary" />
              <Link href="mailto:nitindevspace@gmail.com" className="text-foreground/80 hover:text-primary transition-colors duration-300">
                nitindevspace@gmail.com
              </Link>
            </div>
            <div className="flex items-center space-x-3 group">
              <Phone className="h-5 w-5 text-secondary transition-transform group-hover:scale-110 group-hover:text-primary" />
              <span className="text-foreground/80">+91 74041 85860</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <MapPin className="h-5 w-5 text-secondary transition-transform group-hover:scale-110 group-hover:text-primary" />
              <span className="text-foreground/80">Bawal, Haryana, India (Remote)</span>
            </div>
            <div className="pt-5">
              <h3 className="text-xs font-semibold text-muted-foreground mb-2.5 uppercase tracking-wider">Connect with me</h3>
              <div className="flex items-center space-x-2.5">
                {[
                  { href: "https://linkedin.com/in/nitin5kumar02", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://github.com/NitinDevSpace", icon: Github, label: "GitHub" },
                  { href: "https://instagram.com/your_insta_username", icon: Instagram, label: "Instagram" }, 
                  { href: "https://www.hackerrank.com/profile/your_hackerrank", icon: Code, label: "HackerRank" }, 
                  { href: "https://leetcode.com/your_leetcode/", icon: ShieldCheck, label: "LeetCode" } 
                ].map(social => (
                  <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <Button variant="outline" size="icon" className="text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-110 rounded-full border-border/80 shadow-sm hover:shadow-primary/20">
                      <social.icon className="h-5 w-5" />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/90 backdrop-blur-sm p-1 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl animate-slideInUp delay-400">
          <CardHeader className="p-6 sm:p-7">
            <CardTitle className="font-headline text-xl text-primary flex items-center">
             <Send className="mr-2.5 h-6 w-6 text-secondary"/> Send a Message
            </CardTitle>
            <CardDescription className="text-muted-foreground pt-0.5">Fill out the form and I&apos;ll get back to you promptly.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-7 pt-0">
            <form action={formAction} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-foreground/80 font-medium text-sm">Full Name</Label>
                <Input id="name" name="name" type="text" placeholder="Your Name" required 
                       className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 rounded-md py-2 text-sm shadow-sm" />
                {state.fieldErrors?.name && <p className="text-xs text-destructive mt-1">{state.fieldErrors.name.join(', ')}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground/80 font-medium text-sm">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="your.email@example.com" required 
                       className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 rounded-md py-2 text-sm shadow-sm" />
                {state.fieldErrors?.email && <p className="text-xs text-destructive mt-1">{state.fieldErrors.email.join(', ')}</p>}
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground/80 font-medium text-sm">Phone Number (Optional)</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567"
                       className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 rounded-md py-2 text-sm shadow-sm" />
                {state.fieldErrors?.phone && <p className="text-xs text-destructive mt-1">{state.fieldErrors.phone.join(', ')}</p>}
              </div>
              <div>
                <Label htmlFor="subject" className="text-foreground/80 font-medium text-sm">Subject</Label>
                <Input id="subject" name="subject" type="text" placeholder="Project Inquiry" required 
                       className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 rounded-md py-2 text-sm shadow-sm" />
                {state.fieldErrors?.subject && <p className="text-xs text-destructive mt-1">{state.fieldErrors.subject.join(', ')}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground/80 font-medium text-sm">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message here..." rows={4} required 
                          className="mt-1 bg-input border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 rounded-md text-sm shadow-sm" />
                {state.fieldErrors?.message && <p className="text-xs text-destructive mt-1">{state.fieldErrors.message.join(', ')}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
