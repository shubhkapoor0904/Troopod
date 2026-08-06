import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              className="p-2 -ml-2 mr-2 md:hidden focus:outline-none cursor-pointer text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
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
            <button 
              onClick={onCartClick}
              className="p-2 hover:bg-muted rounded-full transition-colors relative cursor-pointer text-foreground"
            >
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

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-background p-6 shadow-xl flex flex-col justify-between animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <a href="#" className="font-serif text-xl font-bold tracking-tight text-primary">
                  WELLBEING
                </a>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full bg-secondary text-foreground hover:bg-muted cursor-pointer"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium hover:text-primary transition-colors border-b border-secondary pb-2">Shop All</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium hover:text-primary transition-colors border-b border-secondary pb-2">Best Sellers</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium hover:text-primary transition-colors border-b border-secondary pb-2">Our Story</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium hover:text-primary transition-colors border-b border-secondary pb-2">Journal</a>
              </div>
            </div>
            <div className="text-xs text-muted-foreground pt-4 border-t border-secondary">
              © 2024 Wellbeing Nutrition.
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
