import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/30 mt-auto shadow-inner">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">&copy; {currentYear} Code Canvas. All rights reserved.</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Designed with <span className="text-accent animate-pulse">❤️</span> and coded with precision.
        </p>
      </div>
    </footer>
  );
}
