import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'NitinDevSpace | Nitin Kumar - Expert Developer Portfolio',
  description: 'A portfolio showcasing innovative projects and software solutions by Nitin Kumar, an expert developer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"><head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head><body className="font-body antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {children}
        <Toaster />
      </body></html>
  );
}
