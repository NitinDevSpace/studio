
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Bot } from 'lucide-react';
import AskNAIForm from '@/components/AskNitinAIForm'; // Renamed from AskNitinAIForm
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ChatbotOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  // Close chatbot if Esc key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground transform transition-all hover:scale-110"
        onClick={toggleChatbot}
        aria-label={isOpen ? "Close NAI Chatbot" : "Open NAI Chatbot"}
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] max-w-sm"
            aria-modal="true"
            role="dialog"
            aria-labelledby="chatbot-title"
          >
            <Card className="shadow-2xl border-border/80 bg-card/95 backdrop-blur-md rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between p-3 border-b bg-card">
                <CardTitle id="chatbot-title" className="text-md font-headline text-primary flex items-center">
                  <Bot className="mr-2 h-5 w-5" /> NAI Assistant
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={toggleChatbot} className="h-7 w-7 text-muted-foreground hover:text-primary">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close Chatbot</span>
                </Button>
              </CardHeader>
              <CardContent className="p-0"> {/* Padding handled by AskNAIForm */}
                <AskNAIForm isEmbedded={true} /> 
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
