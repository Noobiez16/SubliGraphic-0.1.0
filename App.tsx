import React, { useState, useEffect, useMemo } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useThemeDetector } from './hooks/useThemeDetector';
import './App.css';
// FIX: Import the global Theme type to ensure consistency across components.
import type { Product, CartItem, Theme } from './types';
import { products } from './constants';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Button from './components/Button';
import AIIdeaGenerator from './components/AIIdeaGenerator';
import Footer from './components/Footer';
import CheckoutView, { OrderConfirmation } from './components/CheckoutView';

const paypalClientId = process.env.PAYPAL_CLIENT_ID;

// ProductDetail component
interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  // FIX: Changed type from `'ios' | 'android'` to the global `Theme` type to correctly handle all possible theme values.
  theme: Theme;
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
    onCheckout: () => void;
    // FIX: Changed type from `'ios' | 'android'` to the global `Theme` type to correctly handle all possible theme values.
    theme: Theme;
    isOpen: boolean;
}

const CartView: React.FC<CartViewProps> = ({ cart, onClose, onUpdateQuantity, onCheckout, theme, isOpen }) => {
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
            <button onClick={onClose} aria-label="Close cart" className={`absolute top-3 right-4 text-4xl font-light leading-none p-1 cursor-pointer ${subTextColor}`}>&times;</button>
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
                                <button
                                    onClick={() => onUpdateQuantity(item.id, 0)}
                                    className={`text-red-500/80 hover:text-red-500 ml-2`}
                                    aria-label="Remove item"
                                    title="Remove item"
                                >
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
                onClick={onCheckout} 
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
  const [currentView, setCurrentView] = useState('store'); // 'store', 'cart', 'checkout', 'confirmation'

  // Load cart from localStorage on initial render, rehydrating custom images
  useEffect(() => {
    try {
      const savedCartJson = localStorage.getItem('subligraphic_cart');
      if (savedCartJson) {
        const cartFromStorage: CartItem[] = JSON.parse(savedCartJson);
        
        const hydratedCart = cartFromStorage.map(item => {
          if (item.customDesignUrl && item.customDesignUrl.startsWith('ref:')) {
            const imageId = item.customDesignUrl.substring(4);
            const imageData = localStorage.getItem(`custom_design_${imageId}`);
            if (imageData) {
              return { ...item, imageUrl: imageData, customDesignUrl: imageData };
            }
          }
          return item;
        });
        setCart(hydratedCart);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes, separating custom images to avoid quota errors
  useEffect(() => {
    // Don't save an empty cart to localStorage
    if (cart.length === 0) {
      const savedCart = localStorage.getItem('subligraphic_cart');
      if (savedCart) {
        localStorage.removeItem('subligraphic_cart');
      }
      return;
    }

    try {
      const cartToSave = cart.map(item => {
        if (item.customDesignUrl && item.customDesignUrl.startsWith('data:image')) {
          localStorage.setItem(`custom_design_${item.id}`, item.customDesignUrl);
          return { ...item, imageUrl: `ref:${item.id}`, customDesignUrl: `ref:${item.id}` };
        }
        return item;
      });
      
      localStorage.setItem('subligraphic_cart', JSON.stringify(cartToSave));
      
      const currentCustomItemIds = new Set(cart.filter(item => item.customDesignUrl).map(item => String(item.id)));
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('custom_design_')) {
              const idFromKey = key.substring(14);
              if (!currentCustomItemIds.has(idFromKey)) {
                  localStorage.removeItem(key);
              }
          }
      }
    } catch (error) {
        console.error("Failed to save cart to localStorage", error);
        alert("Error: Could not save your item. Your browser's storage might be full.");
    }
  }, [cart]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('store');
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setSelectedProduct(null);
    setCurrentView(currentView === 'cart' ? 'store' : 'cart');
  };

  const handleAddToCart = (productToAdd: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id && !item.customDesignUrl);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };
  
  const handleAddToCartWithDesign = (baseProduct: Product, designUrl: string) => {
    setCart(prevCart => {
        const newItem: CartItem = {
            ...baseProduct,
            id: Date.now(), // Use timestamp as a unique ID for custom items
            name: `${baseProduct.name} (Custom Design)`,
            imageUrl: designUrl,
            customDesignUrl: designUrl,
            quantity: 1
        };
        return [...prevCart, newItem];
    });
    alert('Your custom design has been added to the cart!');
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
        setCart(prevCart => prevCart.map(item => item.id === productId ? {...item, quantity: newQuantity} : item));
    }
  };

  const handlePaymentSuccess = () => {
    setCart([]); // Clear the cart state
    setCurrentView('confirmation'); // Show confirmation screen
  };

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);
  
  const renderStoreContent = () => {
    if (selectedProduct) {
      return <ProductDetail product={selectedProduct} onBack={handleBack} onAddToCart={handleAddToCart} theme={theme} />;
    }
    return (
      <div className="container mx-auto px-4">
        <h2 
          className="font-['Playfair_Display'] text-5xl font-bold text-center text-white mb-8 text-shadow"
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
  
  if (!paypalClientId) {
    return (
        <div className="min-h-screen w-full bg-red-100 flex items-center justify-center p-4">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-red-700">Configuration Error</h1>
                <p className="mt-2 text-gray-600">
                    The PayPal Client ID is not configured. Please set the <code className="bg-red-200 text-red-800 px-1 rounded">VITE_PAYPAL_CLIENT_ID</code> variable in your <code>.env</code> file.
                </p>
            </div>
        </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId, currency: "USD" }}>
        <div className={`min-h-screen w-full bg-cover bg-center bg-fixed ${theme === 'ios' ? 'theme-ios' : 'theme-android'} app-background`}>
            <div className="min-h-screen w-full bg-black/10 flex flex-col">
                {!selectedProduct && <Header theme={theme} cartItemCount={cartItemCount} onCartClick={handleCartClick}/>}
                <main className={`${selectedProduct ? '' : 'pt-24'} pb-12 lg:flex lg:flex-col lg:justify-center lg:min-h-screen flex-grow ${selectedProduct && theme !== 'ios' ? 'flex items-center lg:items-start' : ''}`}>
                {renderStoreContent()}
                </main>
                {!selectedProduct && <Footer theme={theme} />}
            </div>
                
            <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-[8px] flex justify-center items-start lg:items-center z-[1001] pt-[10vh] px-4 pb-4 lg:p-4 transition-all duration-300 ease-in-out ${currentView === 'cart' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={() => setCurrentView('store')}
            >
                <div onClick={(e) => e.stopPropagation()}>
                <CartView 
                    cart={cart} 
                    onClose={() => setCurrentView('store')} 
                    onUpdateQuantity={handleUpdateQuantity} 
                    onCheckout={() => setCurrentView('checkout')}
                    theme={theme} 
                    isOpen={currentView === 'cart'}/>
                </div>
            </div>
            
            {currentView === 'checkout' && (
                <CheckoutView 
                    cart={cart}
                    theme={theme}
                    onBackToCart={() => setCurrentView('cart')}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}

            {currentView === 'confirmation' && (
                // FIX: Pass the 'theme' prop to OrderConfirmation as it is required.
                <OrderConfirmation onBackToStore={() => setCurrentView('store')} theme={theme} />
            )}
        </div>
        <AIIdeaGenerator 
            theme={theme} 
            products={products}
            onAddToCartWithDesign={handleAddToCartWithDesign}
        />
    </PayPalScriptProvider>
  );
}