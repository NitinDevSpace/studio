
'use client';

import React, { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dynamically import the ChatbotOverlay
const ChatbotOverlay = React.lazy(() => import('@/components/ChatbotOverlay'));

export default function ChatbotLoader() {
  const [isChatbotRequested, setIsChatbotRequested] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Manages open state for the button icon

  const handleToggleChatbot = () => {
    if (!isChatbotRequested) {
      setIsChatbotRequested(true);
    }
    setIsChatOpen(prev => !prev);
  };

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground transform transition-all hover:scale-110"
        onClick={handleToggleChatbot}
        aria-label={isChatOpen ? "Close NAI Chatbot" : "Open NAI Chatbot"}
      >
        {isChatOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </Button>

      {isChatbotRequested && (
        <Suspense fallback={
          <div className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] max-w-sm p-4 bg-card rounded-xl shadow-2xl flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="ml-2 text-muted-foreground">Loading NAI...</span>
          </div>
        }>
          {/* Pass the initial open state and a way to update the button's icon state */}
          <ChatbotOverlay initialOpenState={isChatOpen} onOpenChange={setIsChatOpen} isLoadedByLoader={true} />
        </Suspense>
      )}
    </>
  );
}
