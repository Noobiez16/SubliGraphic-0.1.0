
import React from 'react';
import type { Theme } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme: Theme;
    size?: 'sm' | 'md';
}

const Button: React.FC<ButtonProps> = ({ children, theme, size = 'md', className = '', ...props }) => {
    const isIOS = theme === 'ios';

    const baseClasses = 'font-bold flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const themeClasses = isIOS
        ? 'bg-white/40 text-white border border-white/50 hover:bg-white/60 focus:ring-white/50 rounded-[18px] shadow-sm'
        : 'bg-[--color-primary] text-[--color-on-primary] hover:bg-opacity-90 focus:ring-[--color-primary] rounded-full shadow-md hover:shadow-lg';

    const sizeClasses = size === 'sm' ? 'py-1.5 px-4 text-sm' : 'py-2.5 px-6 text-base';

    return (
        <button
            className={`${baseClasses} ${themeClasses} ${sizeClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
