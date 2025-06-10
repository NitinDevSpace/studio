
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Bot } from 'lucide-react'; // Removed Send icon as it's not used
import AskNitinAIForm from '@/components/AskNitinAIForm'; // Will be AskNAIForm conceptually
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';

export default function ChatbotOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground transform transition-all hover:scale-110"
        onClick={toggleChatbot}
        aria-label="Toggle Chatbot"
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
          >
            <Card className="shadow-2xl border-border/80 bg-card/95 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <CardTitle className="text-lg font-headline text-primary flex items-center">
                  <Bot className="mr-2 h-5 w-5" /> NAI Assistant 
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={toggleChatbot} className="h-7 w-7 text-muted-foreground hover:text-primary">
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 max-h-[50vh] overflow-y-auto">
                <AskNitinAIForm isEmbedded={true} /> 
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
