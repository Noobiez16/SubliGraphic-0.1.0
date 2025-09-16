
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
                    {/* PayPal Button */}
                    <button onClick={handlePayment} disabled={isProcessing} className={`${paymentButtonBase} ${isIOS ? paymentButtonIOS : paymentButtonAndroid}`}>
                        <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" alt="PayPal" className="h-6" />
                    </button>

                    {/* ATH Mobile Button */}
                    <button onClick={handlePayment} disabled={isProcessing} className={`${paymentButtonBase} bg-[#E87324] hover:bg-[#D4651A]`}>
                        <img src="https://i.imgur.com/u8KES31.png" alt="ATH Mobile" className="h-8" />
                    </button>

                    {/* Apple Pay & Google Pay Buttons */}
                    <div className="grid grid-cols-1 gap-3">
                        {isIOS ? (
                            // Apple Pay button (Only shown on iOS)
                            <button onClick={handlePayment} disabled={isProcessing} className={`${paymentButtonBase} bg-black text-white hover:bg-gray-800`}>
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-7 fill-current"><title>Apple Pay</title><path d="M14.885 8.65a2.532 2.532 0 00-1.546.685 2.215 2.215 0 00-.67 1.488.015.015 0 00.015.015h.004a1.96 1.96 0 011.61-1.123 1.93 1.93 0 011.399.535c-.473.282-.9.62-1.213 1.025a4.293 4.293 0 00-1.261 2.494c.057.004.113.004.169.004.59 0 1.152-.165 1.621-.448a2.55 2.55 0 001.08-1.303c.03-.09.053-.185.071-.282a1.88 1.88 0 00-1.282-2.108zm-5.06-2.52a4.42 4.42 0 012.215-.603c.338.004.678.04 1.01.104a4.34 4.34 0 00-2.333.91 4.444 4.444 0 00-1.748 2.253c-.3.832-.44 1.703-.424 2.578a10.87 10.87 0 00.51 3.251 3.22 3.22 0 002.822 2.148 3.1 3.1 0 003.04-1.22c.237-.36.434-.75.586-1.157a.016.016 0 00-.02-.018l-.008-.002a3.31 3.31 0 01-2.9-2.012 3.42 3.42 0 01-.13-1.603c0-.05.003-.1.003-.148a4.426 4.426 0 011.45-3.09 4.38 4.38 0 013.01-1.393 4.47 4.47 0 012.44 1.156 5.92 5.92 0 00-2.28 1.487 5.9 5.9 0 00-1.892 3.518c-.015.086-.027.172-.043.258a.015.015 0 00.015.017h.002l.02-.001a4.22 4.22 0 003.95-3.13 4.3 4.3 0 00-2.2-4.96c-1.353-.82-3.03-.9-4.53-.41a5.9 5.9 0 00-4.248 2.37zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg>
                            </button>
                        ) : (
                            // Google Pay button (Only shown on Android and others)
                            <button onClick={handlePayment} disabled={isProcessing} className={`${paymentButtonBase} ${paymentButtonAndroid}`}>
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-7 fill-current"><title>Google Pay</title><path d="M20.895 9.425a2.208 2.208 0 00-2.2-2.2h-9.39a2.21 2.21 0 00-2.2 2.2v5.15a2.21 2.21 0 002.2 2.2h9.39a2.21 2.21 0 002.2-2.2V9.425zm-6.233 4.135h-1.932v2.18h-1.39v-2.18h-1.57v-1.18h1.57v-1.63c0-.988.46-2.02 2.015-2.02.58 0 .97.05 1.22.08v1.17h-.72c-.44 0-.58.2-.58.55v.72h1.31l-.165 1.18z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.818C6.58 21.818 2.18 17.42 2.18 12S6.58 2.182 12 2.182s9.818 4.398 9.818 9.818-4.398 9.818-9.818 9.818z"/></svg>
                            </button>
                        )}
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
