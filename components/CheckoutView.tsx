import React, { useMemo, useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import athMovilLogo from '/assets/ath-movil-logo.png';
import type { Theme, CartItem } from '../types';
import Button from './Button';

// ATH Móvil Modal Component for manual payment flow
const ATHMovilModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onPaymentConfirmed: () => void;
    theme: Theme;
}> = ({ isOpen, onClose, onPaymentConfirmed, theme }) => {
    const [copySuccess, setCopySuccess] = useState('');
    const phoneNumber = '(787) 553-4067';

    const handleCopy = () => {
        navigator.clipboard.writeText(phoneNumber.replace(/\D/g, ''))
            .then(() => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000); // Reset message after 2 seconds
            })
            .catch(() => {
                setCopySuccess('Failed to copy');
                setTimeout(() => setCopySuccess(''), 2000);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[1003] p-4" onClick={onClose}>
            <div className="bg-[--color-surface] p-6 sm:p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-[--color-on-surface] mb-2">ATH Móvil</h2>
                <p className="text-[--color-on-surface-variant] mb-4">
                    Send the payment to the following person:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
                    <p className="text-sm text-gray-500 font-medium">Business Name</p>
                    <p className="text-lg font-semibold text-gray-800">SubliGraphic</p>
                    <p className="text-sm text-gray-500 mt-3 font-medium">Phone Number </p>
                    <p className="text-lg font-semibold text-gray-800">{phoneNumber}</p>
                </div>
                <div className="flex flex-col gap-3">
                    <Button onClick={handleCopy} theme={theme} className="w-full">
                        {copySuccess || 'Copy Number'}
                    </Button>
                    <Button onClick={onPaymentConfirmed} theme={theme} className="w-full !bg-[--color-secondary] hover:opacity-90">
                        I've Sent the Payment
                    </Button>
                </div>
                <button onClick={onClose} className="mt-4 text-sm text-[--color-on-surface-variant] hover:text-[--color-primary] transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export const OrderConfirmation: React.FC<{
    onBackToStore: () => void;
    theme: Theme;
}> = ({ onBackToStore, theme }) => {
    const isIOS = theme === 'ios';
    const containerClasses = isIOS 
        ? 'bg-white/75 backdrop-blur-[25px] border border-white/20 rounded-2xl shadow-xl' 
        : 'bg-[--color-surface] rounded-3xl shadow-2xl';

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[1002] p-4">
            <div className={`w-full max-w-md p-8 text-center ${containerClasses}`}>
                <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-[--color-on-surface] mb-2">Payment Successful!</h2>
                <p className="text-[--color-on-surface-variant] mb-6">
                    Thank you for your order. A confirmation email has been sent to you.
                </p>
                <Button onClick={onBackToStore} theme={theme}>
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
};


interface CheckoutViewProps {
    cart: CartItem[];
    theme: Theme;
    onBackToCart: () => void;
    onPaymentSuccess: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, theme, onBackToCart, onPaymentSuccess }) => {
    const isIOS = theme === 'ios';
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAthMovilModalOpen, setIsAthMovilModalOpen] = useState(false);
    const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

    const containerClasses = isIOS 
        ? 'bg-white/75 backdrop-blur-[25px] border border-white/20 rounded-2xl shadow-xl' 
        : 'bg-[--color-surface] rounded-3xl shadow-2xl';
    
    const paymentButtonBase = 'w-full flex items-center justify-center p-3 rounded-xl border transition-all duration-200';
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
        <>
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
                         <PayPalButtons
                            key={cart.length} // Force re-render when cart changes
                            style={{ layout: "vertical", label: "pay" }}
                            fundingSource="paypal"
                            createOrder={async (data, actions) => {
                                return actions.order.create({
                                    intent: 'CAPTURE', // <-- Cambio Aqui
                                    purchase_units: [{
                                        amount: {
                                            value: total.toFixed(2),
                                            currency_code: 'USD'
                                        },
                                    }],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                setIsProcessing(true);
                                try {
                                    if (actions.order) {
                                        const details = await actions.order.capture();
                                        console.log('Payment successful:', details);
                                        onPaymentSuccess();
                                    } else {
                                        throw new Error("Order actions are not available");
                                    }
                                } catch (error) {
                                    console.error('Payment failed to capture:', error);
                                    setIsProcessing(false);
                                    alert('There was an issue with your payment. Please try again.');
                                }
                            }}
                            onError={(err) => {
                                console.error("PayPal Checkout Error:", err);
                                alert('An error occurred with the PayPal transaction. Please try again.');
                            }}
                        />

                        {/* ATH Móvil Button */}
                        <button onClick={() => setIsAthMovilModalOpen(true)} className={`${paymentButtonBase} ${isIOS ? paymentButtonIOS : paymentButtonAndroid}`}>
                           <img src={athMovilLogo} alt="Pay with ATH Móvil" className="h-8" />
                        </button>
                    </div>
                </div>
            </div>
             <ATHMovilModal 
                isOpen={isAthMovilModalOpen} 
                onClose={() => setIsAthMovilModalOpen(false)} 
                onPaymentConfirmed={() => {
                    setIsAthMovilModalOpen(false);
                    onPaymentSuccess();
                }} 
                theme={theme}
            />
        </>
    );
};

export default CheckoutView;
