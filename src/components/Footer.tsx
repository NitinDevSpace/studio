import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {currentYear} Code Canvas. All rights reserved.</p>
        <p className="text-sm mt-1">Designed with passion by an expert developer.</p>
      </div>
    </footer>
  );
}
