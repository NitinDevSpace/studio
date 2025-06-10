import React from 'react';
import { Github, Linkedin, Instagram, Code, ShieldCheck } from 'lucide-react'; // Added ShieldCheck for LeetCode, Code for HackerRank
import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/NitinDevSpace', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/nitin5kumar02', icon: Linkedin },
    { name: 'Instagram', href: 'https://instagram.com/your_insta_username', icon: Instagram }, // Update href
    { name: 'HackerRank', href: 'https://www.hackerrank.com/profile/your_hackerrank', icon: Code }, // Update href
    { name: 'LeetCode', href: 'https://leetcode.com/your_leetcode/', icon: ShieldCheck }, // Update href
  ];

  return (
    <footer className="bg-background/50 border-t border-border/20 mt-auto section-padding pt-12 pb-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-headline font-semibold mb-2 text-glow-primary">NitinDevSpace</h3>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Crafting digital experiences with precision and passion. Let's build something amazing together.
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {socialLinks.map((link) => (
            <Button key={link.name} variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110">
              <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                <link.icon className="h-6 w-6" />
              </Link>
            </Button>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground/80">
          &copy; {currentYear} Nitin Kumar. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Designed with inspiration, coded with <span className="text-primary">&lt;/&gt;</span>.
        </p>
      </div>
    </footer>
  );
}
