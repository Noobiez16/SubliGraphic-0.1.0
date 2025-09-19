
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

    return (
        <div className={`flex flex-col overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-[--color-surface] shadow-lg rounded-xl ${className}`}>
            <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className={`text-lg font-bold text-[--color-on-surface] ${isIOS ? 'text-ios-safe' : ''}`}>{product.name}</h3>
                <p className={`text-sm mt-1 text-[--color-on-surface-variant] ${isIOS ? 'text-ios-safe' : ''}`}>{product.category}</p>
                <div className="flex-grow"></div>
                <div className="flex items-center justify-center mt-4 gap-2">
                    <p className={`text-xl font-semibold text-[--color-primary] ${isIOS ? 'text-ios-safe' : ''}`}>
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