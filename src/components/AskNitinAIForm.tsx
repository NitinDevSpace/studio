
'use client';

import React, { useEffect, useRef, useActionState, useState, useCallback } from 'react';
import { useFormStatus } from 'react-dom';
import { askNAIAction, type AskNAIFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Loader2, MessageSquare, Send, Bot, RefreshCcw, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Keep for page version

const SESSION_STORAGE_KEY = 'naiChatHistory';

const initialActionState: AskNAIFormState = {
  message: null,
  answer: null,
};

interface AskNAIFormProps {
  isEmbedded?: boolean; // For styling tweaks in overlay vs page
}

export default function AskNAIForm({ isEmbedded = false }: AskNAIFormProps) {
  const [actionState, formAction, isActionPending] = useActionState(askNAIAction, initialActionState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for the Textarea
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from session storage on mount
  useEffect(() => {
    try {
      const storedHistory = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (storedHistory) {
        const parsedHistory: ChatMessage[] = JSON.parse(storedHistory).map((msg: ChatMessage) => ({
          ...msg,
          timestamp: new Date(msg.timestamp), // Ensure timestamp is a Date object
        }));
        setChatMessages(parsedHistory);
      }
    } catch (error) {
      console.error("Error loading chat history from session storage:", error);
    }
  }, []);

  // Save chat history to session storage whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(chatMessages));
    } catch (error) {
      console.error("Error saving chat history to session storage:", error);
    }
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle AI response or error, and refocus input
  useEffect(() => {
    if (!isActionPending) { // Action has completed
      if (actionState.message && actionState.answer === null) { // Error case from AI
        setChatMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          type: 'error',
          content: actionState.message || "An unexpected error occurred.",
          timestamp: new Date(),
        }]);
        toast({
          title: "NAI Error",
          description: actionState.message,
          variant: "destructive",
        });
        textareaRef.current?.focus(); // Refocus on error
      } else if (actionState.answer) { // Success case
        setChatMessages(prev => {
          if (prev.length > 0 && prev[prev.length -1].type === 'user') {
            return [...prev, {
              id: crypto.randomUUID(),
              type: 'bot',
              content: actionState.answer,
              timestamp: new Date(),
            }];
          }
          return prev;
        });
        textareaRef.current?.focus(); // Refocus on success
      }
    }
  }, [actionState, toast, isActionPending]);


  const handleSubmit = useCallback(() => {
    if (!currentQuestion.trim() || isActionPending) return;

    setChatMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      type: 'user',
      content: currentQuestion.trim(),
      timestamp: new Date(),
    }]);

    const formData = new FormData();
    formData.append('question', currentQuestion.trim());
    
    React.startTransition(() => {
      formAction(formData);
    });
    
    setCurrentQuestion('');
  }, [currentQuestion, isActionPending, formAction, setChatMessages]);

  useEffect(() => {
    // Reset form only after action is complete and successful
    if (!isActionPending && actionState.answer) {
        formRef.current?.reset();
        // setCurrentQuestion(''); // Already handled by handleSubmit
    }
  }, [isActionPending, actionState.answer]);


  const handleNewChat = () => {
    setChatMessages([]);
    setCurrentQuestion('');
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };
  
  const ChatHeader = () => (
    <div className={cn(
        "flex items-center justify-between p-3 border-b",
        isEmbedded ? "bg-card rounded-t-lg" : "bg-transparent" 
    )}>
      <div className="flex items-center gap-2">
        <Bot className={cn("h-5 w-5", isEmbedded ? "text-primary": "text-secondary")} />
        <span className={cn("font-semibold", isEmbedded ? "text-primary" : "text-xl")}>NAI Assistant</span>
      </div>
      <Button variant="ghost" size="sm" onClick={handleNewChat} className="text-muted-foreground hover:text-primary">
        <RefreshCcw className="h-4 w-4 mr-1.5" />
        New Chat
      </Button>
    </div>
  );

  const ChatArea = (
    <div className={cn("flex flex-col", isEmbedded ? "h-[350px]" : "h-[calc(100vh-250px)] sm:h-[calc(100vh-280px)]")}>
       {!isEmbedded && <ChatHeader />} 
      <ScrollArea className="flex-grow p-3 sm:p-4 space-y-3">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end gap-2 max-w-[85%] sm:max-w-[75%] mb-3",
              msg.type === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            )}
          >
            {msg.type !== 'error' && (
                 <div className={cn(
                    "flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center",
                    msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                 )}>
                    {msg.type === 'user' ? <User className="h-4 w-4 sm:h-5 sm:w-5" /> : <Bot className="h-4 w-4 sm:h-5 sm:w-5" />}
                 </div>
            )}
            <div
              className={cn(
                'p-2.5 sm:p-3 rounded-lg shadow-md text-sm leading-relaxed',
                msg.type === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' :
                msg.type === 'bot' ? 'bg-card text-card-foreground border border-border/70 rounded-bl-none' :
                'bg-destructive/10 text-destructive border border-destructive/30 rounded-lg w-full flex items-center gap-2'
              )}
            >
              {msg.type === 'error' && <AlertCircle className="h-4 w-4 shrink-0" />}
              <span className="whitespace-pre-wrap break-words">{msg.content}</span>
            </div>
          </div>
        ))}
        {isActionPending && chatMessages.length > 0 && chatMessages[chatMessages.length -1].type === 'user' && (
           <div className="flex items-end gap-2 max-w-[75%] mr-auto mb-3">
             <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                <Bot className="h-5 w-5" />
             </div>
             <div className="p-3 rounded-lg shadow-md bg-card text-card-foreground border border-border/70 rounded-bl-none">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <form
        onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}
        ref={formRef}
        className="flex items-center gap-2 p-2 sm:p-3 border-t bg-background"
      >
        <Textarea
          ref={textareaRef} // Assign ref to Textarea
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Ask NAI anything..."
          rows={1}
          className="flex-grow resize-none border-border/70 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/60 rounded-md text-sm shadow-sm py-2 px-3 min-h-[40px] max-h-[100px] sm:max-h-[120px]"
          onKeyDown={handleKeyDown}
          disabled={isActionPending}
        />
        <Button type="submit" disabled={isActionPending || !currentQuestion.trim()} size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 w-9 sm:h-10 sm:w-10 shrink-0">
          {isActionPending ? (
            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          ) : (
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );

  if (isEmbedded) {
    return ChatArea;
  }

  // Full page version
  return (
    <Card className="w-full bg-card/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardHeader className="p-0"> 
        {/* ChatHeader is now part of ChatArea for dedicated page */}
      </CardHeader>
      <CardContent className="p-0">
         {ChatArea}
      </CardContent>
    </Card>
  );
}
