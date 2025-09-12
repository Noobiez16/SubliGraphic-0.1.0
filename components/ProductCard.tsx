
import React from 'react';
import type { Product, Theme } from '../types';
import Button from './Button';

interface ProductCardProps {
    product: Product;
    onSelect: (product: Product) => void;
    theme: Theme;
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, theme, className = '' }) => {
    const isIOS = theme === 'ios';

    const cardClasses = isIOS
        ? 'bg-white/30 backdrop-blur-[18px] border border-white/20 rounded-[18px]'
        : 'bg-[--color-surface] shadow-lg rounded-xl';

    return (
        <div className={`flex flex-col overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${cardClasses} ${className}`}>
            <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className={`text-lg font-bold ${isIOS ? 'text-white' : 'text-[--color-on-surface]'}`}>{product.name}</h3>
                <p className={`text-sm mt-1 ${isIOS ? 'text-gray-200' : 'text-[--color-on-surface-variant]'}`}>{product.category}</p>
                <div className="flex-grow"></div>
                <div className="flex justify-between items-center mt-4">
                    <p className={`text-xl font-semibold ${isIOS ? 'text-white' : 'text-[--color-primary]'}`}>
                        ${product.price.toFixed(2)}
                    </p>
                    <Button onClick={() => onSelect(product)} theme={theme} size="sm">
                        View
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;