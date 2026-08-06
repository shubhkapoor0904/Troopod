import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-white border-t border-border pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-primary mb-6">WELLBEING</h2>
          <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
            We believe in the power of pure, potent, and proven natural ingredients to elevate your daily health routines.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="bg-secondary px-4 py-2 rounded-xl text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground" 
              required
            />
            <button 
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
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
  );
}
