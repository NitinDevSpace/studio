
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UserCircle, MessageSquare, Brain, Menu, X, CodeXml, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/resume', label: 'Resume', icon: UserCircle },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
  { href: '/ask-nitin-ai', label: 'Ask NAI', icon: Brain }, // Renamed to Ask NAI
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    // Avoid rendering theme-dependent UI on the server or before hydration
    return (
      <header className="sticky top-0 z-50 bg-transparent py-2">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-headline font-bold text-primary hover:text-secondary transition-colors duration-300 flex items-center group">
              <CodeXml className="mr-2 h-7 w-7 text-primary group-hover:text-secondary transition-colors" />
              Nitin<span className="text-foreground/80">DevSpace</span>
            </Link>
            <div className="h-8 w-8 bg-muted rounded-full animate-pulse md:hidden"></div> {/* Placeholder for menu button */}
            <div className="h-8 w-8 bg-muted rounded-full animate-pulse hidden md:block"></div> {/* Placeholder for theme toggle */}
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md border-b border-border/70" : "bg-transparent py-1"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-headline font-bold text-primary hover:text-secondary transition-colors duration-300 flex items-center group">
          <CodeXml className="mr-2 h-7 w-7 text-primary group-hover:text-secondary transition-colors" />
          Nitin<span className="text-foreground/80">DevSpace</span>
        </Link>

        {/* Desktop Navigation & Theme Toggle */}
        <div className="hidden md:flex items-center space-x-1">
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className={cn(
                  "font-medium text-sm px-3 py-1.5 rounded-md transition-all duration-200",
                  pathname === item.href
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                )}
              >
                <Link href={item.href} className="flex items-center">
                  <item.icon className={cn("mr-1.5 h-4 w-4", pathname === item.href ? "text-primary" : "text-foreground/60 group-hover:text-primary")} />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-2 text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors w-9 h-9"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>


        {/* Mobile Navigation Trigger & Theme Toggle */}
        <div className="md:hidden flex items-center space-x-2">
           <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors w-9 h-9"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px] bg-card p-0 border-l border-border/70">
              <div className="flex flex-col h-full">
                <div className="p-4 flex justify-between items-center border-b border-border/50">
                  <Link href="/" className="text-xl font-headline font-bold text-primary flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                     <CodeXml className="mr-2 h-6 w-6 text-primary" />
                     Nitin<span className="text-foreground/80">DevSpace</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex-grow p-3 space-y-1.5">
                  {navItems.map((item) => (
                     <SheetClose asChild key={item.href}>
                        <Button
                          variant="ghost"
                          asChild
                          className={cn(
                            "w-full justify-start font-medium text-base py-3 px-3 rounded-md",
                             pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/70 hover:text-primary hover:bg-primary/10"
                          )}
                        >
                          <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
                            <item.icon className="mr-2.5 h-5 w-5" />
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
