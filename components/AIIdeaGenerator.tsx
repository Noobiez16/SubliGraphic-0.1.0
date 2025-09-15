import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

type Theme = 'ios' | 'android';

interface AIIdeaGeneratorProps {
    theme: Theme;
}

const AIIdeaGenerator: React.FC<AIIdeaGeneratorProps> = ({ theme }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copyButtonText, setCopyButtonText] = useState('Copy Idea');

    const isIOS = theme === 'ios';

    const handleGenerate = async () => {
        if (!prompt) {
            setError('Please enter a prompt to start.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResponse('');
        setCopyButtonText('Copy Idea');

        try {
            // API Key is sourced from `process.env.API_KEY` as per guidelines.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const systemInstruction = "You are a creative assistant specializing in unique and fun ideas for custom mug designs. Provide 3 concise and distinct ideas in a numbered list. The ideas should be visual and easy to describe. Do not use markdown.";
            
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                },
            });
            
            const ideaText = result.text;

            if (ideaText) {
                setResponse(ideaText);
            } else {
                setError('The response was empty or blocked. Please try a different or more specific prompt.');
            }
        } catch (err: any) {
            console.error('Error calling Gemini API:', err);
            setError(`An error occurred: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = async () => {
        if (!response) return;
        try {
            await navigator.clipboard.writeText(response);
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy Idea'), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopyButtonText('Copy Failed');
             setTimeout(() => setCopyButtonText('Copy Idea'), 2000);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fabClasses = isIOS ? 'bg-white/70 backdrop-blur-[15px] border border-black/5' : 'bg-[--color-primary] shadow-lg';
    const fabIconColor = isIOS ? 'text-[--color-primary]' : 'text-[--color-on-primary]';
    const modalOverlayClasses = isIOS ? 'backdrop-blur-sm' : '';
    const modalContentClasses = isIOS ? 'bg-white/75 backdrop-blur-[25px] border border-white/20 rounded-2xl shadow-xl' : 'bg-[--color-surface] rounded-3xl shadow-2xl';
    const textColor = isIOS ? 'text-black' : 'text-[--color-on-surface]';
    const subTextColor = isIOS ? 'text-gray-600' : 'text-[--color-on-surface-variant]';
    const textAreaThemeClasses = isIOS 
        ? 'border-black/10 placeholder-gray-500 bg-white/80' 
        : 'border-gray-300 placeholder-gray-400 bg-white';

    return (
        <>
            <button id="ai-fab" onClick={openModal} className={`fixed bottom-5 right-5 h-14 w-14 rounded-full flex items-center justify-center cursor-pointer z-[999] transition-transform hover:scale-105 ${fabClasses}`} aria-label="Generate idea with AI" >
                <div className={fabIconColor}>
                    {isIOS ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L9.5 5.5 12 8l2.5-2.5L12 3zm0 18l2.5-2.5L12 16l-2.5 2.5L12 21zm-9-9l2.5 2.5L8 12 5.5 9.5 3 12zm18 0l-2.5-2.5L16 12l2.5 2.5L21 12z"/></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9l1.25-2.5L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5z"/></svg>
                    )}
                </div>
            </button>
            
            <div 
              id="ai-modal-overlay" 
              onClick={closeModal} 
              className={`fixed z-[1001] inset-0 bg-black/50 flex items-center justify-center p-4 md:p-0 md:bg-transparent md:inset-auto md:bottom-24 md:right-5 transition-all duration-300 ease-in-out ${modalOverlayClasses} md:backdrop-blur-none ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div 
                  id="ai-modal-content" 
                  onClick={(e) => e.stopPropagation()} 
                  className={`relative w-full max-w-lg p-6 ${modalContentClasses} transform transition-all duration-300 ease-in-out md:origin-bottom-right ${isModalOpen ? 'scale-100' : 'scale-95'}`}
                >
                    <button id="ai-modal-close" onClick={closeModal} className={`absolute top-2 right-4 text-3xl cursor-pointer ${subTextColor}`} >&times;</button>
                    <h2 className={`text-2xl font-bold mt-0 ${textColor}`}>No Ideas?...</h2>
                    <p className={`mb-4 ${subTextColor}`}>Describe what you're looking for...</p>
                    <textarea id="ai-prompt-input" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ex: 'A fun design for my dad's birthday, he's a programmer'" className={`w-full min-h-[100px] rounded-lg border p-3 text-base resize-vertical mb-4 text-[#212529] ${textAreaThemeClasses}`} ></textarea>
                    <button id="ai-generate-btn" onClick={handleGenerate} disabled={isLoading} className={`w-full py-3 px-4 border-none rounded-lg text-base font-semibold cursor-pointer bg-[--color-primary] text-[--color-on-primary] disabled:bg-gray-400 disabled:cursor-not-allowed`} >
                        {isLoading ? 'Thinking...' : 'Generate Ideas'}
                    </button>
                    {(error || response) && (
                        <div id="ai-response-area" className={`mt-4 p-4 rounded-lg min-h-[50px] whitespace-pre-wrap ${isIOS ? 'bg-black/5' : 'bg-gray-100'}`}>
                            {error && <p className="text-red-500">{error}</p>}
                            {response && <p className={`${textColor}`}>{response}</p>}
                        </div>
                    )}
                    {response && !error && (
                        <button id="ai-copy-btn" onClick={handleCopy} className="w-full mt-3 py-3 px-4 border-none rounded-lg text-base font-semibold cursor-pointer bg-[--color-secondary] text-[--color-on-primary]" >
                            {copyButtonText}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default AIIdeaGenerator;
