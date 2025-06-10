
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk } from 'next/font/google';

// Setup fonts according to PRD
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NitinDevSpace | Nitin Kumar - Full Stack Developer Portfolio',
  description: 'Portfolio of Nitin Kumar, a passionate Full Stack Developer specializing in modern web and AI solutions. Explore innovative projects and technical expertise.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Removed direct Google Font links, relying on next/font */}
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
