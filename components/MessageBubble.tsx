import React from 'react';
import type { Message } from '../types.ts';
import { User, Sparkles, Link, ShieldCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
  onVerify?: () => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5 h-6 px-2">
        <span className="w-2 h-2 bg-brand-blue/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-brand-purple/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-brand-blue/60 rounded-full animate-bounce"></span>
    </div>
);


export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLoading = false, onVerify }) => {
  const isUser = message.role === 'user';
  const hasSources = message.groundingMetadata && message.groundingMetadata.length > 0;

  const bubbleClasses = isUser
    ? 'bg-brand-blue text-white rounded-br-none'
    : 'bg-white/20 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 rounded-bl-none backdrop-blur-sm shadow-sm';
  
  const layoutClasses = isUser ? 'justify-end' : 'justify-start';
  
  const Avatar: React.FC = () => (
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-brand-purple shadow-lg shadow-brand-purple/20' : 'bg-gray-800 border border-white/10'}`}>
      {isUser ? <User size={16} className="text-white"/> : <Sparkles size={16} className="text-brand-blue"/>}
    </div>
  );

  return (
    <div className={`flex items-end gap-3 ${layoutClasses} animate-slide-up-fade-in`}>
      {!isUser && <Avatar />}
      <div className="flex flex-col gap-2 max-w-[85%] md:max-w-xl">
        <div className={`p-4 rounded-2xl relative group ${bubbleClasses}`}>
          {isLoading ? <TypingIndicator /> : <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>}
          
          {!isUser && !isLoading && hasSources && (
             <button 
                onClick={onVerify}
                className="absolute -right-12 top-0 p-2 text-gray-400 hover:text-brand-blue transition-colors opacity-0 group-hover:opacity-100"
                title="Verify for Hallucinations"
             >
                <ShieldCheck size={18} />
             </button>
          )}
        </div>

        {hasSources && !isLoading && (
          <div className="animate-fade-in px-1">
            <div className="flex items-center justify-between mb-1">
                <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">Sources & Verification</h4>
                <button 
                    onClick={onVerify}
                    className="flex items-center gap-1 text-[10px] font-semibold text-brand-blue hover:underline"
                >
                    <ShieldCheck size={10} />
                    Check Hallucinations
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {message.groundingMetadata?.map((source, index) => (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] bg-white/10 dark:bg-gray-800/80 hover:bg-white/20 dark:hover:bg-gray-700 px-2.5 py-1 rounded-full transition-all border border-white/5"
                  title={source.title}
                >
                  <Link size={10} />
                  <span className="truncate max-w-[120px]">{new URL(source.uri).hostname}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && <Avatar />}
    </div>
  );
};