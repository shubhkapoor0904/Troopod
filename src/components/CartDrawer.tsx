import { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [formError, setFormError] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !address.trim() || !cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
      setFormError('Please fill out all billing and payment fields.');
      return;
    }
    
    setFormError('');
    setIsProcessing(true);

    // Simulate API request authorization
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      setShowCheckoutForm(false);
    }, 1800);
  };

  const handleSuccessClose = () => {
    setCheckoutSuccess(false);
    onClearCart();
    onClose();
    // Reset form fields
    setFullName('');
    setEmail('');
    setAddress('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div 
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out animate-in slide-in-from-right"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-secondary/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-lg font-bold text-foreground">Your Cart</h2>
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {checkoutSuccess ? (
              /* Success Screen */
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">Order Confirmed!</h3>
                <p className="text-muted-foreground text-sm max-w-xs mb-6">
                  Thank you for your purchase. We've sent a receipt details summary to your email.
                </p>
                <button 
                  onClick={handleSuccessClose}
                  className="w-full bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary/95 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : showCheckoutForm ? (
              /* Checkout Form Panel */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 animate-in fade-in duration-200">
                <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Checkout Information
                </h3>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Full Name</label>
                  <input 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Email</label>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Shipping Address</label>
                  <input 
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Ocean Drive, Key West FL"
                    className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                    disabled={isProcessing}
                  />
                </div>

                <div className="border-t border-border pt-4 mt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Card Number</label>
                  <input 
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                    maxLength={19}
                    placeholder="4111 2222 3333 4444"
                    className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                    disabled={isProcessing}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Expiry Date</label>
                    <input 
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                      disabled={isProcessing}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">CVV</label>
                    <input 
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      maxLength={3}
                      placeholder="123"
                      className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-red-500 text-xs font-medium">{formError}</p>
                )}

                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/95 transition-colors cursor-pointer flex justify-center items-center gap-2"
                  >
                    {isProcessing ? 'Authorizing...' : `Pay $${total.toFixed(2)}`}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    disabled={isProcessing}
                    className="bg-secondary text-foreground font-semibold px-4 py-3 rounded-xl hover:bg-muted transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                </div>
              </form>
            ) : cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="font-serif text-lg font-medium text-muted-foreground mb-1">Your cart is empty</p>
                <p className="text-xs text-muted-foreground/80 max-w-[200px] mb-6">Add premium Korean Marine Collagen to start your health routine.</p>
                <button 
                  onClick={onClose}
                  className="bg-primary text-white text-sm font-bold py-2.5 px-6 rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              /* Itemized Cart List */
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-secondary/50 pb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 rounded-xl object-cover bg-secondary flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-sm text-foreground line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="text-muted-foreground/60 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.type && (
                          <span className="text-[10px] bg-green-50 text-green-800 font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider inline-block mt-0.5">
                            {item.type === 'subscription' 
                              ? `Subscribe (Every ${item.interval || '30 days'})` 
                              : 'One-time purchase'}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-end">
                        {/* Quantity manipulators */}
                        <div className="flex items-center gap-3 border border-border rounded-lg px-2.5 py-1 bg-white">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-bold text-sm text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Billing Details */}
          {!checkoutSuccess && !showCheckoutForm && cartItems.length > 0 && (
            <div className="border-t border-border p-6 bg-secondary/10 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-border/80 pt-2 text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowCheckoutForm(true)}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/95 transition-all shadow-lg shadow-primary/10 cursor-pointer flex justify-center items-center gap-2"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
