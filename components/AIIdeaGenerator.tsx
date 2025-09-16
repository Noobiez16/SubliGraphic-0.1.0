import React, { useState } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import Button from './Button';
// FIX: Import the global Theme type to ensure consistency.
import type { Product, Theme } from '../types';
// FIX: Import the stylesheet to use the new CSS class.
import './AIIdeaGenerator.css';

// FIX: Removed the local Theme type definition ('ios' | 'android') to use the imported global Theme type.

interface AIIdeaGeneratorProps {
    theme: Theme;
    products: Product[];
    onAddToCartWithDesign: (baseProduct: Product, designUrl: string) => void;
}

const AIIdeaGenerator: React.FC<AIIdeaGeneratorProps> = ({ theme, products, onAddToCartWithDesign }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showMugPreview, setShowMugPreview] = useState(false);
    const [isProductSelectorOpen, setIsProductSelectorOpen] = useState(false);

    const isIOS = theme === 'ios';

    const handleGenerate = async () => {
        if (!prompt) {
            setError('Please enter a description for your design.');
            return;
        }
        setIsLoading(true);
        setError('');
        setImageUrl('');
        setShowMugPreview(false);
        setIsProductSelectorOpen(false);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const systemInstruction = "Create a vibrant, high-quality image based on the following description. The style should be suitable for printing on a mug or cup. The design should be clear, centered, and visually appealing, with a simple background.";
            
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: {
                    parts: [{ text: `${systemInstruction}\n\nDescription: ${prompt}` }]
                },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            const imagePart = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
            const base64Data = imagePart?.inlineData?.data;

            if (base64Data) {
                const generatedUrl = `data:image/png;base64,${base64Data}`;
                setImageUrl(generatedUrl);
            } else {
                setError('Could not generate an image from the prompt. Please try being more specific.');
            }
        } catch (err: any) {
            console.error('Error calling Gemini API:', err);
            setError(`An error occurred: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    const closeModal = () => setIsModalOpen(false);

    const fabClasses = isIOS ? 'bg-white/70 backdrop-blur-[15px] border border-black/5' : 'bg-[--color-primary] shadow-lg';
    const fabIconColor = isIOS ? 'text-[--color-primary]' : 'text-[--color-on-primary]';
    const modalOverlayClasses = isIOS ? 'backdrop-blur-sm' : '';
    const modalContentClasses = isIOS ? 'bg-gray-100/75 backdrop-blur-[25px] border border-white/20 rounded-2xl shadow-xl' : 'bg-[--color-surface] rounded-3xl shadow-2xl';
    const textColor = isIOS ? 'text-black' : 'text-[--color-on-surface]';
    const subTextColor = isIOS ? 'text-gray-600' : 'text-[--color-on-surface-variant]';
    const textAreaThemeClasses = isIOS 
        ? 'border-black/10 placeholder-gray-500 bg-white/80' 
        : 'border-gray-300 placeholder-gray-400 bg-white';

    return (
        <>
            <style>{`
                @keyframes spin360 {
                    from {
                        background-position: 0 0;
                        mask-position: 0 0;
                    }
                    to {
                        background-position: -4640px 0; 
                        mask-position: -4640px 0;
                    }
                }
             `}</style>
        
            {/* * FIX: The button is now wrapped in a container div.
              * This container uses Tailwind CSS classes for universal sticky positioning.
              * 'sticky' works on all modern browsers, including iOS Safari.
              * 'bottom-5 right-5' places it correctly in the bottom-right corner.
              * 'z-[1999]' ensures it floats above other content.
              * 'pointer-events-none' on the container and 'pointer-events-auto' on the button
              * prevent the container from blocking interactions with elements underneath it.
            */}
            <div className="sticky bottom-5 right-5 z-[1999] self-end pointer-events-none">
                <button 
                    id="ai-fab" 
                    onClick={() => setIsModalOpen(!isModalOpen)} 
                    className={`h-14 w-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 pointer-events-auto ${fabClasses}`} 
                    aria-label="Generate design with AI"
                >
                    <div className={fabIconColor}>
                        {isIOS ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L9.5 5.5 12 8l2.5-2.5L12 3zm0 18l2.5-2.5L12 16l-2.5 2.5L12 21zm-9-9l2.5 2.5L8 12 5.5 9.5 3 12zm18 0l-2.5-2.5L16 12l2.5 2.5L21 12z"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9l1.25-2.5L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5z"/></svg>
                        )}
                    </div>
                </button>
            </div>
          
            <div 
              id="ai-modal-overlay" 
              onClick={closeModal} 
              className={`fixed z-[2000] inset-0 bg-black/50 flex items-center justify-center p-4 md:p-0 md:bg-transparent md:inset-auto md:bottom-24 md:right-5 transition-all duration-300 ease-in-out ${modalOverlayClasses} md:backdrop-blur-none ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div 
                  id="ai-modal-content" 
                  onClick={(e) => e.stopPropagation()} 
                  className={`relative w-full max-w-lg p-6 ${modalContentClasses} transform transition-all duration-300 ease-in-out md:origin-bottom-right ${isModalOpen ? 'scale-100' : 'scale-95'}`}
                >
                    <div className="relative w-full min-h-[400px] flex flex-col">
                        <div className={`relative transition-opacity duration-300 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <h2 className={`text-2xl font-bold mt-0 ${textColor}`}>AI Design Generator</h2>
                            <p className={`mb-4 ${subTextColor}`}>Describe the design you want to create.</p>
                            <div 
                                id="ai-prompt-input" 
                                contentEditable 
                                onInput={(e) => setPrompt(e.currentTarget.textContent || '')} 
                                data-placeholder="Ex: 'An astronaut surfing on a cosmic coffee wave'" 
                                className={`w-full min-h-[44px] max-h-48 overflow-y-auto rounded-lg border p-3 text-base resize-none mb-4 text-[#212529] ${textAreaThemeClasses} empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400`}
                            ></div>
                            <button id="ai-generate-btn" onClick={handleGenerate} disabled={isLoading} className={`w-full py-3 px-4 border-none rounded-lg text-base font-semibold cursor-pointer bg-[--color-primary] text-[--color-on-primary] disabled:bg-gray-400 disabled:cursor-not-allowed`} >
                                Generate Design
                            </button>
                            
                            <div id="ai-response-area" className={`mt-4 flex flex-col items-center justify-center min-h-[250px] p-4 rounded-lg ${isIOS ? 'bg-black/5' : 'bg-gray-100'}`}>
                                {error ? (
                                    <p className="text-red-500 text-center">{error}</p>
                                ) : imageUrl ? (
                                    showMugPreview ? (
                                        <div className="w-full flex flex-col items-center">
                                            <h4 className="font-semibold text-center mb-2">360 Preview</h4>
                                            <div className="relative w-64 h-64">
                                                <div className="absolute inset-0 w-full h-full bg-no-repeat mug-preview-sprite"></div>
                                                <div className="absolute inset-0 w-full h-full mug-preview-design" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                                            </div>
                                            <div className="flex justify-center mt-4">
                                                <button onClick={() => setShowMugPreview(false)} className={`py-2 px-5 rounded-full font-semibold text-sm ${isIOS ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>
                                                    Back to Layout
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center w-full">
                                            <h4 className={`font-semibold text-center mb-2 ${textColor}`}>Your Design</h4>
                                            <img src={imageUrl} alt="AI-generated Design" className="rounded-lg shadow-lg w-full max-w-xs mx-auto aspect-square object-cover" />
                                            <div className="flex justify-center items-center gap-3 mt-4">
                                                <Button onClick={() => setShowMugPreview(true)} theme={theme} size="sm">
                                                    Mug Preview
                                                </Button>
                                                <Button onClick={() => setIsProductSelectorOpen(true)} theme={theme} size="sm" className="!bg-[--color-secondary] hover:opacity-90">
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                ) : ( 
                                    <p className={`text-center ${subTextColor}`}>Your generated design will appear here.</p> 
                                )}
                            </div>
                             {isProductSelectorOpen && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col p-4 rounded-2xl z-20">
                                    <h3 className="text-center font-bold mb-2 text-black">Select a Product</h3>
                                    <div className="overflow-y-auto space-y-2 flex-grow">
                                        {products.map(product => (
                                            <button 
                                                key={product.id} 
                                                onClick={() => {
                                                    onAddToCartWithDesign(product, imageUrl);
                                                    setIsProductSelectorOpen(false);
                                                }}
                                                className="w-full flex items-center p-2 rounded-lg hover:bg-gray-200/80 transition-colors text-left"
                                            >
                                                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md mr-3 object-cover" />
                                                <span className="font-medium text-black">{product.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setIsProductSelectorOpen(false)} className="mt-2 pt-2 text-sm text-gray-600 hover:text-black">Cancel</button>
                                </div>
                            )}
                        </div>

                        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}> 
                            <svg className="animate-spin h-10 w-10 text-[--color-primary]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> 
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> 
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-4 text-[--color-on-surface-variant]">Generating your artwork...</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIIdeaGenerator;