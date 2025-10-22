import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Series } from '../types';

interface AIAssistantProps {
    series: Series;
}

interface Message {
    author: 'user' | 'ai';
    text: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const AIAssistant: React.FC<AIAssistantProps> = ({ series }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const generatePrompt = (userInput: string) => {
        return `
You are a cinematic expert and a helpful assistant for 'Snapshots', a streaming platform for short series.
Your task is to answer user questions about a specific series based ONLY on the information provided below.
Do not invent any details. If the information is not available in the context, clearly state that.
Keep your answers concise, engaging, and in a slightly cinematic tone.

---
SERIES INFORMATION:
Title: ${series.title}
Creator: ${series.creator}
Genre: ${series.genre}
Synopsis: ${series.synopsis}
Cast: ${series.cast.join(', ')}
Episodes:
${series.episodes.map(e => `- ${e.title} (${e.duration})`).join('\n')}
---

USER QUESTION:
${userInput}
`;
    };

    const sendMessage = async (messageText: string) => {
        if (!messageText.trim()) return;

        const newUserMessage: Message = { author: 'user', text: messageText };
        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);
        setError(null);
        setInput('');

        try {
            const prompt = generatePrompt(messageText);
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            const aiResponse: Message = { author: 'ai', text: response.text };
            setMessages(prev => [...prev, aiResponse]);

        } catch (err) {
            console.error('Error fetching AI response:', err);
            setError('Sorry, something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };
    
    const promptStarters = [
        "What is the main theme of this series?",
        "Describe the main character's journey.",
        "Is this a good series for comedy fans?",
        "Tell me a fun fact based on the synopsis.",
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">AI Series Assistant</h2>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                <div className="h-64 overflow-y-auto mb-4 pr-2 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.author === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md p-3 rounded-lg ${msg.author === 'user' ? 'bg-cyan-800 text-white' : 'bg-zinc-700 text-zinc-200'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                             <div className="max-w-md p-3 rounded-lg bg-zinc-700 text-zinc-200">
                                <p className="text-sm italic">AI is thinking...</p>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {messages.length === 0 && !isLoading && (
                     <div className="mb-4">
                        <p className="text-sm text-zinc-400 mb-3 text-center">Ask me anything about "{series.title}" or try a suggestion:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {promptStarters.map(prompt => (
                                <button 
                                    key={prompt}
                                    onClick={() => sendMessage(prompt)}
                                    className="bg-zinc-700 text-zinc-200 text-xs font-medium py-1 px-3 rounded-full hover:bg-zinc-600 transition-colors"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                
                <form onSubmit={handleFormSubmit} className="flex gap-4">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about the plot, characters, themes..."
                        disabled={isLoading}
                        className="flex-grow bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50"
                    />
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:bg-cyan-800 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AIAssistant;