
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UserCircle, MessageSquare, Brain, Menu, X, CodeXml } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/resume', label: 'Resume', icon: UserCircle },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
  { href: '/ask-nitin-ai', label: 'Ask NitinAI', icon: Brain },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); 
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-md border-b border-border/70" : "bg-transparent py-2"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-headline font-bold text-primary hover:text-secondary transition-colors duration-300 flex items-center group">
          <CodeXml className="mr-2 h-7 w-7 text-primary group-hover:text-secondary transition-colors" />
          Nitin<span className="text-foreground/80">DevSpace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "font-medium text-sm px-3.5 py-2 rounded-md transition-all duration-200",
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

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
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
