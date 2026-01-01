import React, { useState, useCallback, useEffect } from 'react';
import { Mic, Send, Square, Loader2, AlertCircle, Search, Sparkles, BookOpen, Quote, Scissors, HelpCircle, ShieldCheck } from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive.ts';
import { GeminiLiveStatus } from '../types.ts';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendVoiceMessage: (userText: string, aiText: string) => void;
  isLoading: boolean;
  systemInstruction: string;
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
}

const MicButton: React.FC<{ status: GeminiLiveStatus; onClick: () => void }> = ({ status, onClick }) => {
    const getButtonContent = () => {
        switch (status) {
            case GeminiLiveStatus.CONNECTING:
                return (
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-brand-blue/30 cursor-wait">
                        <Loader2 size={20} className="text-brand-blue animate-spin" />
                    </div>
                );
            case GeminiLiveStatus.LISTENING:
                return (
                    <button
                        onClick={onClick}
                        className="flex items-center justify-center w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] ring-4 ring-red-500/20 animate-pulse transition-all duration-300"
                        title="Stop Listening"
                    >
                        <Square size={18} className="fill-current" />
                    </button>
                );
            case GeminiLiveStatus.ERROR:
                 return (
                    <button
                        onClick={onClick}
                        className="flex items-center justify-center w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300"
                        title="Retry Connection"
                    >
                        <AlertCircle size={20} />
                    </button>
                );
            default: // IDLE
                return (
                    <button
                        onClick={onClick}
                        className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white shadow-lg shadow-brand-blue/30 hover:scale-105 transition-all duration-300"
                        title="Start Voice Chat"
                    >
                        <Mic size={20} />
                    </button>
                );
        }
    };

    return getButtonContent();
};


export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onSendVoiceMessage, 
  isLoading, 
  systemInstruction,
  isSearchActive,
  setIsSearchActive
}) => {
  const [inputText, setInputText] = useState('');
  const { status, userTranscript, aiTranscript, startSession, stopSession, error } = useGeminiLive();

  useEffect(() => {
    if (status === GeminiLiveStatus.LISTENING) {
      setInputText(userTranscript);
    }
  }, [userTranscript, status]);

  const handleSend = () => {
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };
  
  const handleMicToggle = useCallback(() => {
    if (status === GeminiLiveStatus.IDLE || status === GeminiLiveStatus.ERROR) {
      startSession({
        onTurnComplete: (finalUserTranscript, finalAiTranscript) => {
          onSendVoiceMessage(finalUserTranscript, finalAiTranscript);
          setInputText('');
        },
        systemInstruction
      });
    } else {
      stopSession();
    }
  }, [status, startSession, stopSession, onSendVoiceMessage, systemInstruction]);

  const applyPreset = (preset: string) => {
      let finalPrompt = inputText.trim();
      if (!finalPrompt) return;

      switch(preset) {
          case 'summarize':
              finalPrompt = `Please provide a concise summary of the following:\n\n${finalPrompt}`;
              break;
          case 'explain':
              finalPrompt = `Explain this in simple terms that even a non-expert could understand:\n\n${finalPrompt}`;
              break;
          case 'research':
              setIsSearchActive(true);
              finalPrompt = `Perform deep research on this topic using Google Search and provide a detailed verified report:\n\n${finalPrompt}`;
              break;
          case 'procon':
              finalPrompt = `Provide a balanced pro/con list for the following:\n\n${finalPrompt}`;
              break;
          case 'verify':
              finalPrompt = `Verify the following claim for accuracy and potential hallucinations using all available tools:\n\n${finalPrompt}`;
              break;
      }
      
      onSendMessage(finalPrompt);
      setInputText('');
  };

  const isInputDisabled = isLoading || status === GeminiLiveStatus.LISTENING || status === GeminiLiveStatus.CONNECTING;

  return (
    <div className="p-4 bg-white/5 dark:bg-gray-800/20 backdrop-blur-lg border-t border-white/10 dark:border-gray-700/50">
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar max-w-4xl mx-auto">
            <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-tight transition-all whitespace-nowrap border ${
                    isSearchActive 
                        ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' 
                        : 'bg-white/10 text-gray-400 border-white/10 hover:border-brand-blue/50'
                }`}
            >
                <Search size={13} />
                Verified Search
            </button>
            <div className="w-px h-4 bg-white/10 mx-1"></div>
            <button
                onClick={() => applyPreset('research')}
                disabled={!inputText.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-white/5 text-gray-400 border border-white/10 hover:border-brand-purple/50 hover:text-brand-purple disabled:opacity-30 whitespace-nowrap transition-all"
            >
                <BookOpen size={13} />
                Deep Research
            </button>
            <button
                onClick={() => applyPreset('verify')}
                disabled={!inputText.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-white/5 text-gray-400 border border-white/10 hover:border-brand-blue/50 hover:text-brand-blue disabled:opacity-30 whitespace-nowrap transition-all"
            >
                <ShieldCheck size={13} />
                Hallucination Check
            </button>
            <button
                onClick={() => applyPreset('summarize')}
                disabled={!inputText.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-white/5 text-gray-400 border border-white/10 hover:border-orange-500/50 hover:text-orange-500 disabled:opacity-30 whitespace-nowrap transition-all"
            >
                <Scissors size={13} />
                Summarize
            </button>
            <button
                onClick={() => applyPreset('explain')}
                disabled={!inputText.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase bg-white/5 text-gray-400 border border-white/10 hover:border-green-500/50 hover:text-green-500 disabled:opacity-30 whitespace-nowrap transition-all"
            >
                <HelpCircle size={13} />
                Explain Simply
            </button>
        </div>

        {error && <div className="mb-2 text-center text-red-500 text-sm animate-fade-in">{error}</div>}
        
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder={status === GeminiLiveStatus.LISTENING ? "Listening..." : (isSearchActive ? "Verified search enabled..." : "Type a message...")}
                    className={`w-full p-3 pr-10 rounded-2xl bg-white dark:bg-gray-700/50 border focus:outline-none focus:ring-2 resize-none min-h-[48px] max-h-32 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm ${
                        isSearchActive 
                        ? 'border-brand-blue focus:ring-brand-blue/30 focus:border-brand-blue' 
                        : 'border-gray-200 dark:border-gray-600 focus:ring-brand-blue/50 focus:border-brand-blue'
                    }`}
                    rows={1}
                    disabled={isInputDisabled}
                />
                {isSearchActive && (
                    <div className="absolute right-3 bottom-3 text-brand-blue animate-pulse">
                        <Search size={16} />
                    </div>
                )}
            </div>
            
            <MicButton status={status} onClick={handleMicToggle} />
            
            <button
                onClick={handleSend}
                disabled={!inputText.trim() || isInputDisabled}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-blue text-white hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-brand-blue/20 hover:scale-105"
            >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="ml-0.5" />}
            </button>
        </div>
        {status === GeminiLiveStatus.LISTENING && aiTranscript && (
             <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400 animate-pulse truncate">
                 AI: {aiTranscript}
             </div>
        )}
    </div>
  );
};