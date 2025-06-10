import React from 'react';
import { HeartPulse } from 'lucide-react'; // Using a more thematic icon

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/60 backdrop-blur-lg border-t border-border/40 mt-auto shadow-top-md">
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-sm text-muted-foreground">&copy; {currentYear} NitinDevSpace. All rights reserved.</p>
        <p className="text-xs text-muted-foreground/80 mt-2 flex items-center justify-center">
          Crafted with <HeartPulse className="w-4 h-4 mx-1.5 text-accent animate-pulse" /> and coded with precision.
        </p>
      </div>
    </footer>
  );
}
