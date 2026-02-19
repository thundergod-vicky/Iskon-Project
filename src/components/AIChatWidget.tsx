'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUserAlt, FaGlobe } from 'react-icons/fa';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface ConversationMessage {
    role: 'user' | 'assistant';
    content: string;
}

const QUICK_REPLIES = [
    { label: '🕐 Temple Hours', message: 'What are the temple timings?' },
    { label: '🎉 Festivals', message: 'Tell me about upcoming festivals' },
    { label: '📿 How to Start', message: 'How can I start my spiritual journey?' },
    { label: '🙏 Philosophy', message: 'Explain Krishna Consciousness' },
];

const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা', flag: '🇮🇳' },
];

export default function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hare Krishna! 🙏 I am your ISKCON Durgapur Digital Assistant. How can I help you today?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState('en');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [streamingText, setStreamingText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingText]);

    const handleSend = async (messageText?: string) => {
        const textToSend = messageText || input;
        if (!textToSend.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: textToSend,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setStreamingText('');

        // Add to conversation history
        const newHistory = [...conversationHistory, { role: 'user' as const, content: textToSend }];

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: textToSend,
                    history: conversationHistory,
                    language: language,
                }),
            });

            const contentType = response.headers.get('content-type');

            if (contentType?.includes('text/event-stream')) {
                // Handle streaming response
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
                let fullText = '';

                if (reader) {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value);
                        const lines = chunk.split('\n');

                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6);
                                if (data === '[DONE]') {
                                    // Streaming complete
                                    const botMessage: Message = {
                                        id: (Date.now() + 1).toString(),
                                        text: fullText,
                                        sender: 'bot',
                                        timestamp: new Date(),
                                    };
                                    setMessages((prev) => [...prev, botMessage]);
                                    setStreamingText('');
                                    setConversationHistory([
                                        ...newHistory,
                                        { role: 'assistant', content: fullText }
                                    ]);
                                } else {
                                    try {
                                        const parsed = JSON.parse(data);
                                        if (parsed.text) {
                                            fullText += parsed.text;
                                            setStreamingText(fullText);
                                        }
                                    } catch {
                                        // Skip invalid JSON
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                // Handle regular JSON response (fallback)
                const data = await response.json();
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: data.reply || 'I apologize, I encountered an error. Please try again.',
                    sender: 'bot',
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, botMessage]);
                setConversationHistory([
                    ...newHistory,
                    { role: 'assistant', content: data.reply }
                ]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'I apologize, I encountered an error. Please try again.',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickReply = (message: string) => {
        handleSend(message);
    };

    const handleLanguageChange = (langCode: string) => {
        setLanguage(langCode);
        setShowLanguageMenu(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-poppins">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[calc(100vw-3rem)] sm:w-[350px] md:w-[400px] h-[calc(100vh-8rem)] sm:h-[500px] md:h-[550px] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-amber-100"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <FaRobot className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">ISKCON Assistant</h3>
                                    <p className="text-[10px] opacity-80 uppercase tracking-widest">Always Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Language Selector */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                                        className="hover:bg-white/10 p-2 rounded-full transition-colors flex items-center gap-1"
                                        aria-label="Select Language"
                                    >
                                        <FaGlobe className="text-sm" />
                                        <span className="text-xs">{LANGUAGES.find(l => l.code === language)?.flag}</span>
                                    </button>
                                    {showLanguageMenu && (
                                        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl py-1 min-w-[120px] z-[60] border border-gray-100">
                                            {LANGUAGES.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => handleLanguageChange(lang.code)}
                                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-orange-50 flex items-center gap-2 ${language === lang.code ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
                                                        }`}
                                                >
                                                    <span>{lang.flag}</span>
                                                    <span>{lang.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="hover:bg-white/10 p-2 rounded-full transition-colors"
                                    aria-label="Close Chat"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-amber-50/30">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-orange-100' : 'bg-amber-600'
                                            }`}>
                                            {msg.sender === 'user' ? <FaUserAlt className="text-orange-600 text-xs" /> : <FaRobot className="text-white text-xs" />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap ${msg.sender === 'user'
                                            ? 'bg-orange-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 border border-amber-100 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                            <p className={`text-[9px] mt-1 opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Streaming message */}
                            {streamingText && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] flex items-end gap-2">
                                        <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
                                            <FaRobot className="text-white text-xs" />
                                        </div>
                                        <div className="p-3 rounded-2xl rounded-tl-none text-sm shadow-sm bg-white text-gray-800 border border-amber-100 whitespace-pre-wrap">
                                            {streamingText}
                                            <span className="inline-block w-1 h-4 bg-orange-500 ml-1 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Loading indicator */}
                            {isLoading && !streamingText && (
                                <div className="flex justify-start">
                                    <div className="flex items-end gap-2">
                                        <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                                            <FaRobot className="text-white text-xs" />
                                        </div>
                                        <div className="bg-white border border-amber-100 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        <div className="px-4 py-2 bg-white border-t border-amber-100 flex gap-2 overflow-x-auto">
                            {QUICK_REPLIES.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickReply(reply.message)}
                                    disabled={isLoading}
                                    className="shrink-0 px-3 py-1.5 text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-full border border-orange-200 transition-colors disabled:opacity-50"
                                >
                                    {reply.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-amber-100">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={language === 'hi' ? 'प्रश्न पूछें...' : language === 'bn' ? 'প্রশ্ন করুন...' : 'Ask a question...'}
                                    className="flex-grow px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-orange-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white p-2.5 rounded-full transition-all shadow-lg active:scale-95"
                                >
                                    <FaPaperPlane className="text-sm" />
                                </button>
                            </form>
                            <p className="text-[9px] text-center text-gray-400 mt-2">
                                Powered by Krishna Consciousness & Gemini AI
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-orange-500 to-amber-600 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white relative border-2 border-white/20"
            >
                {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-2xl" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border border-white"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
