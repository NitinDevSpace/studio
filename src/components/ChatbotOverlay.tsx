
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Bot } from 'lucide-react'; // MessageCircle removed as button is in loader
import AskNAIForm from '@/components/AskNitinAIForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';

interface ChatbotOverlayProps {
  initialOpenState?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  isLoadedByLoader?: boolean; // To know if it's managed by ChatbotLoader
}

export default function ChatbotOverlay({ 
  initialOpenState = false, 
  onOpenChange,
  isLoadedByLoader = false
}: ChatbotOverlayProps) {
  // If loaded by loader, the loader manages the button and overall visibility.
  // This component just manages its own presentation when told to be visible.
  const [internalIsOpen, setInternalIsOpen] = useState(initialOpenState);

  const isOpen = isLoadedByLoader ? initialOpenState : internalIsOpen;

  const handleToggle = () => {
    const newState = !isOpen;
    if (isLoadedByLoader && onOpenChange) {
      onOpenChange(newState); // Inform loader about the state change
    } else {
      setInternalIsOpen(newState);
    }
  };
  
  // Sync with prop if controlled by loader
  useEffect(() => {
    if (isLoadedByLoader) {
      setInternalIsOpen(initialOpenState);
    }
  }, [initialOpenState, isLoadedByLoader]);


  // Close chatbot if Esc key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isLoadedByLoader && onOpenChange) {
          onOpenChange(false);
        } else {
          setInternalIsOpen(false);
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onOpenChange, isLoadedByLoader]);

  // If this component is not supposed to be open (e.g. loader decided it shouldn't be), don't render its UI
  if (!isOpen && isLoadedByLoader) {
    return null;
  }

  return (
    <>
      {/* Button is handled by ChatbotLoader if isLoadedByLoader is true */}
      {/* {!isLoadedByLoader && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground transform transition-all hover:scale-110"
          onClick={handleToggle}
          aria-label={isOpen ? "Close NAI Chatbot" : "Open NAI Chatbot"}
        >
          {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
        </Button>
      )} */}

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
                <Button variant="ghost" size="icon" onClick={handleToggle} className="h-7 w-7 text-muted-foreground hover:text-primary">
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
