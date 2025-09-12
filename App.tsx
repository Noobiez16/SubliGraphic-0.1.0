
import React, { useState, useEffect, useMemo } from 'react';
import { useThemeDetector } from './hooks/useThemeDetector';
import type { Product, CartItem } from './types';
import { products } from './constants';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Button from './components/Button';
import AIIdeaGenerator from './components/AIIdeaGenerator';
import Footer from './components/Footer';

// ProductDetail component
interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  theme: 'ios' | 'android';
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart, theme }) => {
  const isIOS = theme === 'ios';

  const containerClasses = isIOS
    ? 'bg-gray-200/40 backdrop-blur-[18px] border border-white/30 rounded-[18px]'
    : 'bg-[--color-surface] shadow-xl rounded-xl';

  return (
    <div className="p-4 sm:p-6 w-full max-w-4xl mx-auto">
      <div className={`overflow-hidden ${containerClasses}`}>
        <div className="p-4">
            <Button onClick={onBack} theme={theme}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Products
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-8">
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-[--color-on-surface]">{product.name}</h1>
            <p className="text-lg text-[--color-on-surface-variant] mt-2">{product.category}</p>
            <p className="text-3xl font-light text-[--color-primary] my-6">${product.price.toFixed(2)}</p>
            <p className="text-base text-[--color-on-surface] leading-relaxed">{product.description}</p>
            <div className="mt-8">
              <Button onClick={() => { onAddToCart(product); alert(`Added ${product.name} to cart!`); }} theme={theme} className="w-full sm:w-auto">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CartView component
interface CartViewProps {
    cart: CartItem[];
    onClose: () => void;
    onUpdateQuantity: (productId: number, newQuantity: number) => void;
    theme: 'ios' | 'android';
    isOpen: boolean;
}

const CartView: React.FC<CartViewProps> = ({ cart, onClose, onUpdateQuantity, theme, isOpen }) => {
    const isIOS = theme === 'ios';

    const containerClasses = isIOS 
        ? 'bg-[rgba(250,250,250,0.75)] backdrop-blur-[30px] rounded-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]' 
        : 'bg-[--color-surface] rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.2)]';
    
    const textColor = 'text-[--color-on-surface]';
    const subTextColor = 'text-[--color-on-surface-variant]';
    const borderColor = 'border-[--color-outline]';

    const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

    const quantityBtnClasses = `w-7 h-7 bg-transparent border border-[--color-outline] rounded-full ${textColor} text-xl font-bold flex items-center justify-center transition-colors duration-200 ease-in-out hover:bg-[--color-primary] hover:text-[--color-on-primary] hover:border-[--color-primary]`;

    return (
        <div className={`w-[90vw] max-w-[450px] md:w-full md:max-w-[600px] max-h-[85vh] p-6 relative flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'scale-100' : 'scale-95'} ${containerClasses}`}>
            <button onClick={onClose} className={`absolute top-3 right-4 text-4xl font-light leading-none p-1 cursor-pointer ${subTextColor}`}>&times;</button>
            <h2 className={`font-['Playfair_Display'] text-3xl mb-4 ${textColor}`}>Your Cart</h2>
            
            <div className={`flex-grow overflow-y-auto py-2 border-t border-b ${borderColor} mb-4`}>
                {cart.length === 0 ? (
                    <p className={`py-8 text-center ${subTextColor}`}>Your cart is empty.</p>
                ) : (
                    <div className="divide-y divide-[--color-outline]">
                        {cart.map(item => (
                            <div key={item.id} className="py-4 flex items-center justify-between space-x-4">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow-sm"/>
                                <div className="flex-grow">
                                    <h3 className={`font-semibold ${textColor}`}>{item.name}</h3>
                                    <p className={`text-sm ${subTextColor}`}>${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className={quantityBtnClasses}>-</button>
                                    <span className={`min-w-[20px] text-center font-medium ${textColor}`}>{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className={quantityBtnClasses}>+</button>
                                </div>
                                <button onClick={() => onUpdateQuantity(item.id, 0)} className={`text-red-500/80 hover:text-red-500 ml-2`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="cart-summary flex justify-between items-center text-lg font-medium mb-5 text-[--color-text]">
                <strong>Total:</strong>
                <span>${total.toFixed(2)}</span>
            </div>
            
            <Button 
                onClick={() => alert('Checkout is not implemented yet.')} 
                theme={theme} 
                className="w-full !rounded-full font-bold py-3.5 text-base hover:scale-105"
                disabled={cart.length === 0}
            >
              Proceed to Payment
            </Button>
        </div>
    );
};


export default function App() {
  const theme = useThemeDetector();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('subligraphic_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('subligraphic_cart', JSON.stringify(cart));
    } catch (error) {
        console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsCartOpen(false);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
    setSelectedProduct(null);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  }

  const handleAddToCart = (productToAdd: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        // Increment quantity
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };
  
  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
        // Remove item
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
        // Update quantity
        setCart(prevCart => prevCart.map(item => item.id === productId ? {...item, quantity: newQuantity} : item));
    }
  };

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);
  
  const renderContent = () => {
    if (selectedProduct) {
      return <ProductDetail product={selectedProduct} onBack={handleBack} onAddToCart={handleAddToCart} theme={theme} />;
    }
    return (
      <div className="container mx-auto px-4">
        <h2 
          className="font-['Playfair_Display'] text-5xl font-bold text-center text-white mb-8"
          style={{textShadow: '0 3px 6px rgba(0, 0, 0, 0.5)'}}
        >
          Our Collection
        </h2>
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleProductSelect}
              theme={theme}
              className="flex-grow-0 flex-shrink basis-[calc(50%-0.75rem)] md:basis-[calc(33.333%-1rem)] xl:basis-[calc(20%-1.2rem)]"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}>
      <div className="min-h-screen w-full bg-black/10 flex flex-col">
        <Header theme={theme} cartItemCount={cartItemCount} onCartClick={handleCartClick}/>
        <main className="pt-24 pb-12 lg:flex lg:flex-col lg:justify-center lg:min-h-screen flex-grow">
          {renderContent()}
        </main>

        <Footer theme={theme} />
        
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-[8px] flex justify-center items-start lg:items-center z-[1001] pt-[10vh] px-4 pb-4 lg:p-4 transition-all duration-300 ease-in-out ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={handleCloseCart}
        >
            <div onClick={(e) => e.stopPropagation()}>
              <CartView cart={cart} onClose={handleCloseCart} onUpdateQuantity={handleUpdateQuantity} theme={theme} isOpen={isCartOpen}/>
            </div>
        </div>
        
        <AIIdeaGenerator theme={theme} />
      </div>
    </div>
  );
}
