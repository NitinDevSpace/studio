
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatbotLoader from '@/components/ChatbotLoader'; // Updated import

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
  title: 'NitinDevSpace | Nitin Kumar - Full Stack Developer & AI Portfolio',
  description: 'Explore the portfolio of Nitin Kumar (NitinDevSpace), a skilled Full Stack Developer and Software Engineer creating modern web applications and AI solutions. Discover innovative projects and expertise in Next.js, React, Genkit, and more.',
  keywords: [
    'Nitin Kumar',
    'NitinDevSpace',
    'Full Stack Developer',
    'Software Engineer',
    'Portfolio Website',
    'Web Developer',
    'AI Portfolio',
    'AI Developer',
    'Next.js Developer',
    'React Developer',
    'Genkit AI',
    'Modern Web Applications',
    'TypeScript',
    'JavaScript',
    'Nitin Kumar Portfolio',
    'Developer Portfolio India',
    'AI Chatbot Developer',
    'ShadCN UI Developer'
  ],
  authors: [{ name: 'Nitin Kumar', url: 'https://nitindevspace.com' }], // Assuming you have a domain
  creator: 'Nitin Kumar',
  publisher: 'Nitin Kumar',
  // themeColor for dark and light mode
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E3F2FD' }, // Light background
    { media: '(prefers-color-scheme: dark)', color: '#2C2C2C' },  // Dark background
  ],
  // Add Open Graph and Twitter card metadata for better social sharing
  openGraph: {
    title: 'NitinDevSpace | Nitin Kumar - Full Stack Developer & AI Portfolio',
    description: 'Portfolio of Nitin Kumar, showcasing expertise in Full Stack Development, AI Solutions, and modern web technologies.',
    url: 'https://nitindevspace.com', // Replace with your actual domain
    siteName: 'NitinDevSpace',
    // images: [ // Add an image for social sharing previews
    //   {
    //     url: 'https://nitindevspace.com/og-image.png', // Replace with your actual OG image URL
    //     width: 1200,
    //     height: 630,
    //     alt: 'NitinDevSpace Portfolio Preview',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NitinDevSpace | Nitin Kumar - Full Stack Developer & AI Portfolio',
    description: 'Explore Nitin Kumar\'s Full Stack Developer portfolio featuring AI projects and modern web applications.',
    // site: '@yourtwitterhandle', // Optional: Your Twitter handle
    // creator: '@yourtwitterhandle', // Optional: Your Twitter handle
    // images: ['https://nitindevspace.com/twitter-image.png'], // Replace with your actual Twitter image URL
  },
  robots: { // Basic robots meta tag
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // manifest: '/site.webmanifest', // If you have a webmanifest file
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
          <ChatbotLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
