
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatbotOverlay from '@/components/ChatbotOverlay';

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
  // themeColor for dark and light mode
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E3F2FD' }, // Light background
    { media: '(prefers-color-scheme: dark)', color: '#2C2C2C' },  // Dark background
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head />
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <ChatbotOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
