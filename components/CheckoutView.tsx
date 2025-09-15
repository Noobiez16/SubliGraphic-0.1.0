
import React, { useMemo, useState } from 'react';
import type { Theme, CartItem } from '../types';
import Button from './Button';

interface CheckoutViewProps {
    cart: CartItem[];
    theme: Theme;
    onBackToCart: () => void;
    onPaymentSuccess: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, theme, onBackToCart, onPaymentSuccess }) => {
    const isIOS = theme === 'ios';
    const [isProcessing, setIsProcessing] = useState(false);
    const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

    const handlePayment = () => {
        setIsProcessing(true);
        // In a real app, payment logic would go here.
        setTimeout(() => {
            onPaymentSuccess();
        }, 2000); // Simulate a 2-second delay
    };

    const containerClasses = isIOS 
        ? 'bg-white/75 backdrop-blur-[25px] border border-white/20 rounded-2xl shadow-xl' 
        : 'bg-[--color-surface] rounded-3xl shadow-2xl';

    const paymentButtonBase = 'w-full flex items-center justify-center p-3 rounded-xl border transition-all duration-200 disabled:opacity-50 disabled:cursor-wait';
    const paymentButtonIOS = 'bg-black/5 hover:bg-black/10 border-black/10';
    const paymentButtonAndroid = 'bg-gray-100 hover:bg-gray-200 border-gray-200';

    if (isProcessing) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[1002] p-4">
                <div className={`w-full max-w-md p-8 text-center ${containerClasses}`}>
                     <svg className="animate-spin h-10 w-10 text-[--color-primary] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> 
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> 
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-[--color-on-surface-variant]">Processing your payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[1002] p-4`}>
            <div className={`w-full max-w-md p-6 ${containerClasses}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-[--color-on-surface]">Checkout</h2>
                    <button onClick={onBackToCart} className="text-sm text-[--color-on-surface-variant] hover:text-[--color-primary]">Back to Cart</button>
                </div>

                {/* Order Summary */}
                <div className="border-t border-b border-[--color-outline] py-4 my-4">
                    <div className="flex justify-between text-[--color-on-surface-variant]">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[--color-on-surface-variant] mt-2">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-[--color-on-surface] mt-4 pt-4 border-t border-[--color-outline]">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                    <button onClick={handlePayment} disabled={isProcessing} className={`${paymentButtonBase} ${isIOS ? paymentButtonIOS : paymentButtonAndroid}`}>
                        <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" alt="PayPal" className="h-6" />
                    </button>

                    <button onClick={handlePayment} disabled={isProcessing} className={`${paymentButtonBase} ${isIOS ? paymentButtonIOS : paymentButtonAndroid} bg-[#E87324] hover:bg-[#D4651A]`}>
                        <img src="https://i.imgur.com/u8KES31.png" alt="ATH Móvil" className="h-8" />
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={handlePayment} disabled={isProcessing} className={`${paymentButtonBase} ${isIOS ? 'bg-black text-white hover:bg-gray-800' : paymentButtonAndroid}`}>
                             <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className={`h-6 ${isIOS ? 'filter invert' : ''}`} />
                        </button>
                        <button onClick={handlePayment} disabled={isProcessing} className={`${paymentButtonBase} ${isIOS ? paymentButtonIOS : paymentButtonAndroid}`}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Pay_mark_800.svg" alt="Google Pay" className="h-7"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const OrderConfirmation: React.FC<{ onBackToStore: () => void; theme: Theme }> = ({ onBackToStore, theme }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[1002] p-4">
        <div className="bg-[--color-surface] p-8 rounded-2xl text-center shadow-2xl max-w-sm">
            <h2 className="text-2xl font-bold text-[--color-on-surface] mb-2">Thank you for your order!</h2>
            <p className="text-[--color-on-surface-variant] mb-6">Your order has been successfully processed.</p>
            <Button onClick={onBackToStore} theme={theme}>Back to Store</Button>
        </div>
    </div>
);

export default CheckoutView;
