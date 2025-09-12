import React from 'react';
import type { Theme } from '../types';

interface HeaderProps {
    theme: Theme;
    cartItemCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, cartItemCount, onCartClick }) => {
    const isIOS = theme === 'ios';

    const headerClasses = isIOS
        ? 'bg-white/30 backdrop-blur-[18px] border-b border-white/20'
        : 'bg-[--color-surface] shadow-md';

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}>
            <nav className="px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <svg className={`h-8 w-8 ${isIOS ? 'text-white' : 'text-[--color-primary]'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.148-6.136a1.76 1.76 0 011.17-2.121l6.136-2.148a1.76 1.76 0 012.228 1.17l.592 3.417a1.76 1.76 0 01-1.17 2.121l-6.136 2.148z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8.236l8.136-2.848a1.76 1.76 0 012.228 1.17l.592 3.417a1.76 1.76 0 01-1.17 2.121L13.764 15.5" />
                    </svg>
                    <span className={`text-2xl font-bold ${isIOS ? 'text-white' : 'text-[--color-on-surface]'}`}>SubliGraphic</span>
                </div>
                <button onClick={onCartClick} aria-label={`View cart with ${cartItemCount} items`} className={`relative h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200 ${isIOS ? 'bg-white/20 hover:bg-white/30' : 'bg-[--color-primary]/10 hover:bg-[--color-primary]/20'}`}>
                   <div className={isIOS ? 'text-white' : 'text-[--color-primary]'}>
                        {isIOS ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <g>
                                    <circle cx="9" cy="21" r="1"/>
                                    <circle cx="20" cy="21" r="1"/>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                                </g>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m.16-8L8.1 13h5.52l4.24-7.53l-1.42-.79L12 9.24V6H5.21l.94 2H12v2H6.94zM5.21 4H20.78a1 1 0 0 1 .97 1.24l-4.25 8.5a1 1 0 0 1-.97.76H8.1a1 1 0 0 1-.97-.76L3.33 4H2V2h2.61a1 1 0 0 1 .97.76L6 6H5.21z"/>
                            </svg>
                        )}
                   </div>
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                            {cartItemCount}
                        </span>
                    )}
                </button>
            </nav>
        </header>
    );
};

export default Header;