'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Mail, Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React from 'react';

const navItems = [
  { href: '/', label: 'Projects', icon: Home },
  { href: '/resume', label: 'Resume', icon: Briefcase },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/smart-description', label: 'Smart Descriptions', icon: Sparkles },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-headline font-bold text-primary">
          Code Canvas
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'default' : 'ghost'}
              asChild
              className={cn(
                "font-medium",
                pathname === item.href ? "text-primary-foreground" : "text-foreground hover:text-primary"
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 flex justify-between items-center border-b">
                  <Link href="/" className="text-xl font-headline font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    Code Canvas
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                  {navItems.map((item) => (
                     <SheetClose asChild key={item.href}>
                        <Button
                          variant={pathname === item.href ? 'default' : 'ghost'}
                          asChild
                          className={cn(
                            "w-full justify-start font-medium text-lg py-3",
                            pathname === item.href ? "text-primary-foreground" : "text-foreground hover:text-primary"
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
