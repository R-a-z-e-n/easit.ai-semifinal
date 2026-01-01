import React, { useEffect, useRef, useState } from 'react';
import type { Conversation, Message } from '../types.ts';
import { MessageBubble } from './MessageBubble.tsx';
import { ChatInput } from './ChatInput.tsx';

interface ChatViewProps {
  conversation: Conversation;
  addMessage: (conversationId: string, message: Message) => void;
  onVerifyMessage: (conversationId: string, message: Message) => void;
  systemInstruction: string;
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ 
  conversation, 
  addMessage, 
  onVerifyMessage,
  systemInstruction, 
  isSearchActive, 
  setIsSearchActive 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  // Check if the last message is from the user to show a loading indicator
  useEffect(() => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage && lastMessage.role === 'user') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [conversation.messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toISOString(),
    };
    addMessage(conversation.id, userMessage);
  };
  
  const handleSendVoiceMessage = (userText: string, aiText: string) => {
    const userTextTrimmed = userText.trim();
    if (userTextTrimmed) {
      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        text: userTextTrimmed,
        timestamp: new Date().toISOString(),
      };
      addMessage(conversation.id, userMessage);
    }

    if (aiText.trim()) {
        const aiMessage: Message = {
            id: `msg-${Date.now() + 1}`,
            role: 'model',
            text: aiText.trim(),
            timestamp: new Date().toISOString(),
        };
        addMessage(conversation.id, aiMessage);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.3),rgba(255,255,255,0))]">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {conversation.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-50 text-center px-4">
             <p className="text-lg font-medium">No messages yet.</p>
             <p className="text-sm">Try one of the enhanced prompt presets below!</p>
          </div>
        ) : (
          conversation.messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              onVerify={() => onVerifyMessage(conversation.id, message)}
            />
          ))
        )}
        {isLoading && (
            <MessageBubble 
                message={{ id: 'loading', role: 'model', text: '...', timestamp: ''}} 
                isLoading={true} 
            />
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        onSendVoiceMessage={handleSendVoiceMessage}
        isLoading={isLoading}
        systemInstruction={systemInstruction}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
    </div>
  );
};