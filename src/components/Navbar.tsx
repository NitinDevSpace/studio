'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UserCircle, MessageSquare, Brain, Menu, X, CodeXml } from 'lucide-react'; // Changed icons
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home }, // Changed 'Projects' to 'Home'
  { href: '/resume', label: 'Resume', icon: UserCircle }, // Changed Briefcase to UserCircle for 'About' feel
  { href: '/contact', label: 'Contact', icon: MessageSquare }, // Changed Mail to MessageSquare
  { href: '/ask-nitin-ai', label: 'Ask NitinAI', icon: Brain }, // Updated label and href
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Trigger earlier for sticky effect
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-border/20" : "bg-transparent shadow-none py-2"
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-headline font-bold text-glow-primary hover:text-glow-secondary transition-all duration-300 flex items-center group">
          <CodeXml className="mr-2.5 h-8 w-8 text-secondary group-hover:text-primary group-hover:animate-pulse" />
          Nitin<span className="text-foreground">DevSpace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "font-medium text-base px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105",
                pathname === item.href 
                  ? "bg-primary/10 text-primary hover:bg-primary/20 shadow-md shadow-primary/10" 
                  : "text-foreground/80 hover:text-primary hover:bg-transparent"
              )}
            >
              <Link href={item.href}>
                <item.icon className={cn("mr-2 h-5 w-5", pathname === item.href ? "text-primary" : "text-secondary group-hover:text-primary")} />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card p-0 border-l border-border/50">
              <div className="flex flex-col h-full">
                <div className="p-5 flex justify-between items-center border-b border-border/30">
                  <Link href="/" className="text-2xl font-headline font-bold text-glow-primary flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                     <CodeXml className="mr-2 h-7 w-7 text-secondary" />
                     Nitin<span className="text-foreground">DevSpace</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
                        <X className="h-7 w-7" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                  {navItems.map((item) => (
                     <SheetClose asChild key={item.href}>
                        <Button
                          variant="ghost"
                          asChild
                          className={cn(
                            "w-full justify-start font-medium text-lg py-3.5 px-4 rounded-lg",
                             pathname === item.href 
                              ? "bg-primary/10 text-primary" 
                              : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                          )}
                        >
                          <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.label}
                          </Link>
                        </Button>
                     </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
