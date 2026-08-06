import { useState, useEffect } from 'react';
import { 
  Star, 
  Leaf, 
  Droplets,
  Award,
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import ProductHero from './components/ProductHero';
import Lightbox from './components/Lightbox';
import Reviews from './components/Reviews';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

// Static Data & Types
import { gallery, relatedProducts } from './data/productData';
import { Review } from './types';

export default function App() {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscription'>('subscription');
  const [cartCount, setCartCount] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const [quickAdding, setQuickAdding] = useState<number | null>(null);

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  // Reviews State
  const [addedRatings, setAddedRatings] = useState<number[]>([]);
  const [reviews, setReviews] = useState<Review[]>([
    { 
      name: "Sarah M.", 
      title: "Glowing Skin in 3 Weeks", 
      text: "I've tried so many collagen brands, but this one actually works. My skin looks more plump and my nails are finally growing without breaking.",
      rating: 5,
      verified: true,
      date: "2 weeks ago"
    },
    { 
      name: "Jessica T.", 
      title: "Dissolves Perfectly", 
      text: "I love that it's completely unflavored and dissolves instantly in my morning coffee. No clumps, no fishy taste. Just perfect!",
      rating: 5,
      verified: true,
      date: "3 weeks ago"
    },
    { 
      name: "Emily R.", 
      title: "Joint Pain Gone", 
      text: "Not only does my hair look fuller, but the nagging pain in my knees after running has significantly decreased. I'm a subscriber for life.",
      rating: 5,
      verified: true,
      date: "1 month ago"
    }
  ]);

  // Pricing constants
  const MSRP = 54.99;
  const onetimePrice = 44.99;
  const subPrice = 35.99;
  const currentPrice = purchaseType === 'subscription' ? subPrice : onetimePrice;
  const currentTotal = (currentPrice * quantity).toFixed(2);

  // Scroll listener for Sticky Cart
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCart(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleAddToCart = () => {
    setIsAdding(true);
    setCartCount(prev => prev + quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 600);
  };

  const handleQuickAdd = (index: number) => {
    setQuickAdding(index);
    setCartCount(prev => prev + 1);
    setTimeout(() => setQuickAdding(null), 600);
  };

  const handleSubmitReview = (name: string, title: string, text: string, rating: number) => {
    const newReview: Review = {
      name,
      title,
      text,
      rating,
      verified: true,
      date: 'Just now'
    };
    setReviews(prev => [newReview, ...prev]);
    setAddedRatings(prev => [...prev, rating]);
  };

  // Math totals calculation
  const baseCounts = {
    5: 1170,
    4: 90,
    3: 20,
    2: 4,
    1: 0
  };

  const currentCounts = { ...baseCounts };
  addedRatings.forEach(r => {
    if (r >= 1 && r <= 5) {
      currentCounts[r as 1 | 2 | 3 | 4 | 5]++;
    }
  });

  const totalReviews = 1284 + addedRatings.length;
  const totalRatingSum = (1170 * 5 + 90 * 4 + 20 * 3 + 4 * 2) + addedRatings.reduce((sum, r) => sum + r, 0);
  const averageRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(1) : '0.0';

  const getPercent = (stars: 1 | 2 | 3 | 4 | 5) => {
    return totalReviews > 0 ? Math.round((currentCounts[stars] / totalReviews) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white pb-20 md:pb-0">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-xs font-medium tracking-wide uppercase">
        Free Shipping on all orders over $50. Plus, get a free gift!
      </div>

      {/* Navigation */}
      <Navbar cartCount={cartCount} />

      <main>
        {/* Product Hero Section */}
        <ProductHero 
          averageRating={averageRating}
          totalReviews={totalReviews}
          purchaseType={purchaseType}
          setPurchaseType={setPurchaseType}
          quantity={quantity}
          setQuantity={setQuantity}
          isAdding={isAdding}
          onAddToCart={handleAddToCart}
          onOpenLightbox={(index) => {
            setLightboxImageIndex(index);
            setIsLightboxOpen(true);
          }}
        />

        {/* Certifications Badges */}
        <section className="bg-secondary/50 border-y border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-foreground">100% Pure</span>
                  <span className="text-xs text-muted-foreground hidden md:block">No fillers or additives</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-foreground">High Absorption</span>
                  <span className="text-xs text-muted-foreground hidden md:block">Hydrolyzed peptides</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-foreground">Wild Caught</span>
                  <span className="text-xs text-muted-foreground hidden md:block">Sustainably sourced</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-foreground">Non-GMO</span>
                  <span className="text-xs text-muted-foreground hidden md:block">Third-party tested</span>
                </div>
              </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary mb-4">The Wellbeing Difference</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Not all collagen is created equal. See why our Korean Marine Collagen stands above the rest.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-border font-bold text-lg text-foreground w-1/3">Feature</th>
                  <th className="p-4 border-b-2 border-primary bg-primary/5 font-bold text-lg text-primary w-1/3 rounded-t-xl text-center">Wellbeing Marine</th>
                  <th className="p-4 border-b-2 border-border font-bold text-lg text-muted-foreground w-1/3 text-center">Standard Bovine</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium text-foreground">Bioavailability</td>
                  <td className="p-4 bg-primary/5 text-center font-bold text-primary">High (1.5x better)</td>
                  <td className="p-4 text-center text-muted-foreground">Medium</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium text-foreground">Source</td>
                  <td className="p-4 bg-primary/5 text-center font-bold text-primary">Wild-Caught Deep Sea</td>
                  <td className="p-4 text-center text-muted-foreground">Farm Raised Cattle</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-medium text-foreground">Taste & Odor</td>
                  <td className="p-4 bg-primary/5 text-center font-bold text-primary">Completely Unflavored</td>
                  <td className="p-4 text-center text-muted-foreground">Often Chalky</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground">Collagen Types</td>
                  <td className="p-4 bg-primary/5 text-center font-bold text-primary rounded-b-xl">Type 1 & 3</td>
                  <td className="p-4 text-center text-muted-foreground">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Benefits Section - Full Width Callout */}
        <section className="bg-primary text-primary-foreground py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-medium mb-12">Why Korean Marine Collagen?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">
                  <span className="font-serif text-2xl font-bold text-accent transition-transform duration-500 group-hover:scale-110">1.5x</span>
                </div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-accent">Better Absorption</h3>
                <p className="text-primary-foreground/80 leading-relaxed text-sm transition-opacity duration-300 group-hover:opacity-100">
                  Marine collagen is absorbed up to 1.5 times more efficiently than bovine or porcine collagen due to its smaller molecular weight.
                </p>
              </div>
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">
                  <Leaf className="w-8 h-8 text-accent transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-accent">Sustainably Sourced</h3>
                <p className="text-primary-foreground/80 leading-relaxed text-sm transition-opacity duration-300 group-hover:opacity-100">
                  Wild-caught from deep, pristine ocean waters. We use sustainable fishing practices that protect marine ecosystems.
                </p>
              </div>
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">
                  <Check className="w-8 h-8 text-accent transition-transform duration-500 group-hover:scale-125" />
                </div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-accent">Types 1 & 3 Collagen</h3>
                <p className="text-primary-foreground/80 leading-relaxed text-sm transition-opacity duration-300 group-hover:opacity-100">
                  Rich in the exact types of collagen that make up 90% of your body's collagen, specifically targeting hair, skin, and nails.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs accordion */}
        <FaqSection />

        {/* Dynamic Reviews Section */}
        <Reviews 
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
          getPercent={getPercent}
          onSubmitReview={handleSubmitReview}
        />

        {/* Related Products */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary">You Might Also Like</h2>
            <a href="#" className="hidden md:flex text-primary font-bold hover:underline underline-offset-4 items-center gap-2">
              Shop All <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square bg-secondary rounded-2xl overflow-hidden mb-4 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <button 
                    onClick={(e) => { e.preventDefault(); handleQuickAdd(i); }}
                    disabled={quickAdding === i}
                    className={`absolute bottom-4 left-4 right-4 font-bold py-3 rounded-xl transition-all shadow-lg cursor-pointer ${
                      quickAdding === i 
                        ? 'bg-green-600 text-white opacity-100 translate-y-0' 
                        : 'bg-white text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-gray-50'
                    }`}
                  >
                    {quickAdding === i ? 'Added!' : 'Quick Add'}
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-foreground">{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                  </div>
                  <span className="font-bold">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Add To Cart */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 transition-transform duration-300 transform ${showStickyCart ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-4 flex-1">
            <img src={gallery[0]} alt="Product thumbnail" className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <h4 className="font-bold text-sm text-foreground">Korean Marine Collagen Peptides</h4>
              <div className="text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline mb-0.5" /> {averageRating} ({totalReviews.toLocaleString()})
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <div className="flex flex-col text-right">
              <span className="font-bold text-lg leading-none">${currentTotal}</span>
              <span className="text-xs text-primary font-medium">{purchaseType === 'subscription' ? 'Subscribed (Save 35%)' : 'One-time'}</span>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`text-white px-6 md:px-10 rounded-xl font-bold py-3 transition-all flex justify-center items-center gap-2 cursor-pointer ${
                isAdding 
                  ? 'bg-green-600 shadow-lg shadow-green-600/20' 
                  : 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20'
              }`}
            >
              {isAdding ? <><Check className="w-5 h-5" /> Added</> : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox 
        isOpen={isLightboxOpen}
        imageIndex={lightboxImageIndex}
        gallery={gallery}
        onClose={() => setIsLightboxOpen(false)}
        onChangeIndex={(idx) => setLightboxImageIndex(idx)}
      />
    </div>
  );
}