import { useState } from 'react';
import { Star, ChevronRight, Check, Minus, Plus, Truck, Shield, Lock, ChevronLeft } from 'lucide-react';
import { gallery } from '../data/productData';

interface ProductHeroProps {
  averageRating: string;
  totalReviews: number;
  purchaseType: 'onetime' | 'subscription';
  setPurchaseType: (type: 'onetime' | 'subscription') => void;
  quantity: number;
  setQuantity: (q: number) => void;
  isAdding: boolean;
  onAddToCart: (interval?: string) => void;
  onOpenLightbox: (index: number) => void;
}

export default function ProductHero({
  averageRating,
  totalReviews,
  purchaseType,
  setPurchaseType,
  quantity,
  setQuantity,
  isAdding,
  onAddToCart,
  onOpenLightbox,
}: ProductHeroProps) {
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [subscriptionInterval, setSubscriptionInterval] = useState('30 days');

  // Touch swipe states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveGalleryImage(prev => (prev + 1) % gallery.length);
    } else if (isRightSwipe) {
      setActiveGalleryImage(prev => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  const MSRP = 54.99;
  const onetimePrice = 44.99;
  const subPrice = 35.99;
  
  const currentPrice = purchaseType === 'subscription' ? subPrice : onetimePrice;
  const currentTotal = (currentPrice * quantity).toFixed(2);
  const savings = purchaseType === 'subscription' ? ((MSRP - subPrice) / MSRP * 100).toFixed(0) : ((MSRP - onetimePrice) / MSRP * 100).toFixed(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Image Gallery */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 self-start">
          <div 
            className="aspect-square bg-secondary rounded-2xl overflow-hidden relative group cursor-zoom-in"
            onClick={() => onOpenLightbox(activeGalleryImage)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img 
              src={gallery[activeGalleryImage]} 
              alt="Korean Marine Collagen Peptides product view" 
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 select-none"
              draggable="false"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Best Seller</span>
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Save {savings}%</span>
            </div>

            {/* Left Nav Arrow */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveGalleryImage(prev => (prev - 1 + gallery.length) % gallery.length);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-primary rounded-full shadow-md transition-all cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Arrow */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveGalleryImage(prev => (prev + 1) % gallery.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-primary rounded-full shadow-md transition-all cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Click to Zoom premium overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-end justify-center pb-6">
              <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                Click to View Gallery
              </span>
            </div>
          </div>

          {/* Dots Indicator for Mobile */}
          <div className="flex justify-center gap-1.5 md:hidden">
            {gallery.map((_, i) => (
              <span 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeGalleryImage ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`}
              />
            ))}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory hide-scrollbar">
            {gallery.map((src, i) => (
              <button 
                key={i} 
                onClick={() => setActiveGalleryImage(i)}
                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 snap-start snap-always ${i === activeGalleryImage ? 'border-primary' : 'border-transparent opacity-70'} hover:opacity-100 transition-all`}
              >
                <img src={src} alt={`Gallery thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <nav className="flex items-center text-sm text-muted-foreground mb-4">
            <a href="#" className="hover:text-foreground">Home</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href="#" className="hover:text-foreground">Supplements</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium">Marine Collagen</span>
          </nav>

          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-primary mb-3 leading-tight">
            Korean Marine Collagen Peptides
          </h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <a href="#reviews" className="text-sm font-medium underline underline-offset-4 hover:text-primary transition-colors">
              {averageRating}/5 ({totalReviews.toLocaleString()} Reviews)
            </a>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-bold text-3xl text-foreground">${currentPrice.toFixed(2)}</span>
            <span className="text-lg line-through text-muted-foreground">${MSRP.toFixed(2)}</span>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
              You Save ${(MSRP - currentPrice).toFixed(2)}
            </span>
          </div>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Premium 100% pure marine collagen sourced from the deep, pristine waters of Korea. Formulated for maximum absorption to promote radiant skin, healthy hair, and stronger nails.
          </p>

          {/* Purchase Options */}
          <div className="bg-secondary/30 border border-border rounded-2xl p-1 mb-8">
            <div 
              className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${purchaseType === 'subscription' ? 'bg-white border-primary shadow-sm' : 'border-transparent hover:bg-white/50'}`}
              onClick={() => setPurchaseType('subscription')}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 w-5 h-5 rounded-full border flex flex-shrink-0 items-center justify-center ${purchaseType === 'subscription' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                    {purchaseType === 'subscription' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-foreground block">Subscribe & Save 35%</span>
                    <span className="text-sm text-muted-foreground block mt-1">Delivery every {subscriptionInterval}. Skip or cancel anytime.</span>
                    
                    {/* Interval selector */}
                    {purchaseType === 'subscription' && (
                      <div className="mt-3 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs font-semibold text-foreground/80">Frequency:</span>
                        <select 
                          value={subscriptionInterval}
                          onChange={(e) => setSubscriptionInterval(e.target.value)}
                          className="bg-secondary border border-border text-foreground text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-sans"
                        >
                          <option value="30 days">Every 30 days (Recommended)</option>
                          <option value="45 days">Every 45 days</option>
                          <option value="60 days">Every 60 days</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg text-primary block">${subPrice.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground line-through">${MSRP.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 rounded-xl cursor-pointer border-2 transition-all mt-1 ${purchaseType === 'onetime' ? 'bg-white border-primary shadow-sm' : 'border-transparent hover:bg-white/50'}`}
              onClick={() => setPurchaseType('onetime')}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${purchaseType === 'onetime' ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                    {purchaseType === 'onetime' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="font-medium text-foreground">One-time purchase</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-lg block">${onetimePrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center justify-between border border-border rounded-xl px-4 py-3 w-32 bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button 
              onClick={() => onAddToCart(purchaseType === 'subscription' ? subscriptionInterval : undefined)}
              disabled={isAdding}
              className={`flex-1 text-white rounded-xl font-bold py-3 transition-all shadow-lg flex justify-center items-center gap-2 cursor-pointer ${
                isAdding 
                  ? 'bg-green-600 shadow-green-600/20' 
                  : 'bg-primary hover:bg-primary/90 shadow-primary/20'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-5 h-5" /> Added to Cart
                </>
              ) : (
                `Add to Cart — $${currentTotal}`
              )}
            </button>
          </div>

          {/* Trust & Shipping Info */}
          <div className="flex flex-col gap-3 py-6 border-y border-border mb-8">
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Truck className="w-5 h-5 text-primary opacity-80" />
              <span><strong>Free 2-Day Shipping</strong> on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Shield className="w-5 h-5 text-primary opacity-80" />
              <span><strong>30-Day Money-Back Guarantee.</strong> No questions asked.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Lock className="w-5 h-5 text-primary opacity-80" />
              <span><strong>Secure Checkout.</strong> SSL Encrypted payment.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
