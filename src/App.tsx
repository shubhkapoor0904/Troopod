import { useState, useEffect } from 'react';
import { 
  Star, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck, 
  Leaf, 
  Droplets,
  Award,
  ShoppingBag,
  Menu,
  Check,
  Plus,
  Minus,
  Truck,
  Shield,
  Lock,
  ArrowRight
} from 'lucide-react';

interface Review {
  name: string;
  title: string;
  text: string;
  rating: number;
  verified: boolean;
  date: string;
}

const faqs = [
  { 
    q: "When will I see results?", 
    a: "Most customers notice improvements in skin hydration within 2-3 weeks, and stronger nails and hair within 4-6 weeks of consistent daily use." 
  },
  { 
    q: "Is this safe for pregnant or nursing women?", 
    a: "While our collagen is 100% natural, we always recommend consulting with your healthcare provider before starting any new supplement regimen during pregnancy or nursing." 
  },
  { 
    q: "How is marine collagen different from bovine?", 
    a: "Marine collagen is primarily Type 1 collagen, which is the most abundant type in the human body and specifically benefits skin, hair, and nails. It also has smaller peptides, making it up to 1.5x more bioavailable than bovine collagen." 
  },
  { 
    q: "Does it taste fishy?", 
    a: "Not at all! Our advanced hydrolysis process removes all odor and taste, making it virtually undetectable in your coffee, tea, or smoothies." 
  }
];

const relatedProducts = [
  {
    name: "Daily Probiotics",
    price: 29.99,
    rating: 4.8,
    reviews: 842,
    image: "https://images.unsplash.com/photo-1698943510859-e97dc93127e9?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Vitamin C + Zinc",
    price: 24.99,
    rating: 4.9,
    reviews: 1120,
    image: "https://images.unsplash.com/photo-1704650311298-4d6915d34c64?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Organic Ashwagandha",
    price: 22.99,
    rating: 4.7,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1664787020182-7c17ea808ae0?auto=format&fit=crop&q=80&w=400"
  }
];

export default function App() {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscription'>('subscription');
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'how-to'>('description');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [quickAdding, setQuickAdding] = useState<number | null>(null);

  // States for interactive reviews
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [formError, setFormError] = useState('');
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

  const handleQuickAdd = (index: number) => {
    setQuickAdding(index);
    setCartCount(prev => prev + 1);
    setTimeout(() => setQuickAdding(null), 600);
  };

  const gallery = [
    "https://images.unsplash.com/photo-1704650311263-4563a029bd9e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1704650311298-4d6915d34c64?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1698943510859-e97dc93127e9?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1701859081873-faa81cdb8213?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1664787020182-7c17ea808ae0?auto=format&fit=crop&q=80&w=1200"
  ];

  const MSRP = 54.99;
  const onetimePrice = 44.99;
  const subPrice = 35.99;
  
  const currentPrice = purchaseType === 'subscription' ? subPrice : onetimePrice;
  const currentTotal = (currentPrice * quantity).toFixed(2);
  const savings = purchaseType === 'subscription' ? ((MSRP - subPrice) / MSRP * 100).toFixed(0) : ((MSRP - onetimePrice) / MSRP * 100).toFixed(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky cart when scrolled past the main add to cart button (approx 800px)
      setShowStickyCart(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);
    setCartCount(prev => prev + quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 600);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewTitle.trim() || !newReviewText.trim()) {
      setFormError('Please fill out all fields.');
      return;
    }
    
    const newReview: Review = {
      name: newReviewName.trim(),
      title: newReviewTitle.trim(),
      text: newReviewText.trim(),
      rating: newReviewRating,
      verified: true,
      date: 'Just now'
    };

    setReviews(prev => [newReview, ...prev]);
    setAddedRatings(prev => [...prev, newReviewRating]);

    // Reset form
    setNewReviewName('');
    setNewReviewTitle('');
    setNewReviewText('');
    setNewReviewRating(5);
    setFormError('');
    setReviewSubmitted(true);
    setShowReviewForm(false);

    // Clear success message after 4 seconds
    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white pb-20 md:pb-0">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-xs font-medium tracking-wide uppercase">
        Free Shipping on all orders over $50. Plus, get a free gift!
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="p-2 -ml-2 mr-2 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <a href="#" className="font-serif text-2xl font-bold tracking-tight text-primary">
                WELLBEING
              </a>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Shop All</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Best Sellers</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Our Story</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Journal</a>
            </div>

            <div className="flex items-center">
              <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Product Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Image Gallery */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-24 self-start">
              <div className="aspect-square bg-secondary rounded-2xl overflow-hidden relative group">
                <img 
                  src={gallery[activeGalleryImage]} 
                  alt="Korean Marine Collagen Peptides product view" 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Best Seller</span>
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Save {savings}%</span>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
                {gallery.map((src, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveGalleryImage(i)}
                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 snap-start ${i === activeGalleryImage ? 'border-primary' : 'border-transparent opacity-70'} hover:opacity-100 transition-all`}
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
                  You Save ${ (MSRP - currentPrice).toFixed(2) }
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
                      <div>
                        <span className="font-bold text-foreground block">Subscribe & Save 35%</span>
                        <span className="text-sm text-muted-foreground block mt-1">Delivery every 30 days. Skip or cancel anytime.</span>
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
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`flex-1 text-white rounded-xl font-bold py-3 transition-all shadow-lg flex justify-center items-center gap-2 ${
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

              {/* Accordion Tabs */}
              <div>
                <div className="flex border-b border-border overflow-x-auto hide-scrollbar">
                  <button 
                    onClick={() => setActiveTab('description')}
                    className={`pb-4 px-1 mr-8 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                  >
                    Description
                  </button>
                  <button 
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-4 px-1 mr-8 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'ingredients' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                  >
                    Ingredients
                  </button>
                  <button 
                    onClick={() => setActiveTab('how-to')}
                    className={`pb-4 px-1 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'how-to' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                  >
                    How to Use
                  </button>
                </div>
                
                <div className="py-6 text-muted-foreground text-sm leading-relaxed">
                  {activeTab === 'description' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <p className="mb-4">
                        Unlock your natural glow with our Korean Marine Collagen Peptides. Sourced from deep-sea, wild-caught fish off the coast of South Korea, this premium Type 1 & 3 collagen is hydrolyzed for superior bioavailability. 
                      </p>
                      <ul className="space-y-2 list-disc pl-4">
                        <li>Promotes skin elasticity and hydration</li>
                        <li>Supports stronger hair and nails</li>
                        <li>Helps maintain joint health and mobility</li>
                        <li>Unflavored and easily dissolves in hot or cold liquids</li>
                      </ul>
                    </div>
                  )}
                  {activeTab === 'ingredients' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <p className="mb-4"><strong>Active Ingredient:</strong> Hydrolyzed Marine Collagen Peptides (from wild-caught white fish). 10g per serving.</p>
                      <p className="mb-4"><strong>Other Ingredients:</strong> None. Zero fillers, binders, or artificial flavors.</p>
                      <div className="bg-secondary p-4 rounded-xl mt-4">
                        <p className="text-xs font-medium uppercase tracking-wider mb-2 text-foreground">Allergen Warning</p>
                        <p className="text-xs">Contains: Fish. Manufactured in a facility that also processes tree nuts, milk, and soy. Always consult your physician before starting new supplements.</p>
                      </div>
                    </div>
                  )}
                  {activeTab === 'how-to' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <p className="mb-4">Mix one scoop (10g) into 8oz of your favorite beverage. Our unflavored formula is virtually tasteless and dissolves instantly.</p>
                      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                        <div className="bg-secondary p-4 rounded-xl">
                          <span className="block text-xl mb-2">☕️</span>
                          <span className="text-xs font-bold">Coffee</span>
                        </div>
                        <div className="bg-secondary p-4 rounded-xl">
                          <span className="block text-xl mb-2">🥤</span>
                          <span className="text-xs font-bold">Smoothie</span>
                        </div>
                        <div className="bg-secondary p-4 rounded-xl">
                          <span className="block text-xl mb-2">🥣</span>
                          <span className="text-xs font-bold">Oatmeal</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

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

        {/* FAQs */}
        <section className="py-20 px-4 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden bg-white">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-foreground pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 text-muted-foreground text-sm leading-relaxed transition-all overflow-hidden ${openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real Results / Testimonials */}
        <section id="reviews" className="py-20 px-4 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
              <div className="md:w-1/3 text-center md:text-left">
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary mb-4">Real Results</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-2xl">{averageRating}</span>
                </div>
                <p className="text-muted-foreground text-sm">Based on {totalReviews.toLocaleString()} verified reviews</p>
                {!showReviewForm && !reviewSubmitted ? (
                  <button 
                    onClick={() => setShowReviewForm(true)}
                    className="mt-6 border-2 border-primary text-primary font-bold px-6 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    Write a Review
                  </button>
                ) : reviewSubmitted ? (
                  <div className="mt-6 text-green-600 font-bold flex items-center justify-center md:justify-start gap-2 animate-in fade-in">
                    <Check className="w-5 h-5" /> Review submitted!
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="mt-6 text-left bg-white p-6 rounded-2xl border border-border shadow-sm animate-in fade-in slide-in-from-top-4">
                    <div className="mb-4">
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-foreground">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(null)}
                            className="focus:outline-none cursor-pointer transition-transform active:scale-95"
                          >
                            <Star 
                              className={`w-6 h-6 transition-colors ${
                                star <= (hoveredRating !== null ? hoveredRating : newReviewRating)
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'text-muted-foreground/30 hover:text-amber-400'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Name</label>
                      <input 
                        type="text"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                        placeholder="Your Name (e.g. Jane D.)"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Title</label>
                      <input 
                        type="text"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                        placeholder="Headline (e.g. Life changing!)"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Review</label>
                      <textarea 
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        className="w-full border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none" 
                        rows={3} 
                        placeholder="What did you think of the product?"
                      />
                    </div>

                    {formError && (
                      <p className="text-red-500 text-xs font-medium mb-3">{formError}</p>
                    )}

                    <div className="flex gap-2">
                      <button 
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                      >
                        Submit
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setShowReviewForm(false);
                          setFormError('');
                          setNewReviewName('');
                          setNewReviewTitle('');
                          setNewReviewText('');
                          setNewReviewRating(5);
                        }} 
                        className="text-muted-foreground px-4 py-2 text-sm font-medium hover:text-foreground transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
              
              <div className="md:w-2/3 w-full">
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const percent = getPercent(stars as 1 | 2 | 3 | 4 | 5);
                    return (
                      <div key={stars} className="flex items-center gap-4 text-sm">
                        <span className="w-12 flex items-center gap-1 font-medium">{stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" /></span>
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="w-10 text-right text-muted-foreground">{percent}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.slice(0, 3).map((review, i) => (
                <div key={`${review.name}-${review.date}-${i}`} className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 flex flex-col justify-between animate-slide-in-fade">
                  <div>
                    <div className="flex mb-4 gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`h-4 w-4 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/20'}`} 
                        />
                      ))}
                    </div>
                    <h4 className="font-bold text-lg mb-2">{review.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{review.text}"</p>
                  </div>
                  <div className="flex justify-between items-center mt-auto border-t border-secondary pt-4">
                    <p className="font-medium text-sm text-primary flex items-center gap-2">
                      {review.name} 
                      {review.verified && (
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Verified Buyer</span>
                      )}
                    </p>
                    {review.date && (
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button className="text-primary font-bold hover:underline underline-offset-4 flex items-center justify-center gap-2 mx-auto">
                Load More Reviews <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

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
                    className={`absolute bottom-4 left-4 right-4 font-bold py-3 rounded-xl transition-all shadow-lg ${
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
      <footer className="bg-white border-t border-border pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-primary mb-6">WELLBEING</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
              We believe in the power of pure, potent, and proven natural ingredients to elevate your daily health routines.
            </p>
            <div className="flex gap-4">
              <input type="email" placeholder="Enter your email" className="bg-secondary px-4 py-2 rounded-xl text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Collagen</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vitamins</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bundles</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Wholesale</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-border text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2024 Wellbeing Nutrition. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

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
              className={`text-white px-6 md:px-10 rounded-xl font-bold py-3 transition-all flex justify-center items-center gap-2 ${
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
    </div>
  );
}