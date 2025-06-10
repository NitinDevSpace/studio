
import React from 'react';
import { Github, Linkedin, Instagram, Code, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/NitinDevSpace', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/nitin5kumar02', icon: Linkedin },
    { name: 'Instagram', href: 'https://instagram.com/your_insta_username', icon: Instagram },
    { name: 'HackerRank', href: 'https://www.hackerrank.com/profile/your_hackerrank', icon: Code },
    { name: 'LeetCode', href: 'https://leetcode.com/your_leetcode/', icon: ShieldCheck },
    { name: 'Email', href: 'mailto:nitindevspace@gmail.com', icon: Mail },
  ];

  return (
    <footer className="bg-background/70 border-t border-border/60 mt-auto section-padding pt-10 pb-6">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-headline font-semibold mb-1 text-primary">NitinDevSpace</h3>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Passionate about building innovative web solutions and exploring the frontiers of AI. Let's connect and create something impactful.
          </p>
        </div>

        <div className="flex justify-center space-x-3 sm:space-x-4 mb-7">
          {socialLinks.map((link) => (
            <Button key={link.name} variant="outline" size="icon" asChild className="text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-110 rounded-full border-border/80 shadow-sm hover:shadow-primary/20">
              <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                <link.icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground/90">
          &copy; {currentYear} Nitin Kumar. All Rights Reserved.
        </p>
        <p className="text-xs text-muted-foreground/80 mt-1">
          Built with Next.js, Tailwind CSS, and <span className="text-primary">&hearts;</span>.
        </p>
      </div>
    </footer>
  );
}
