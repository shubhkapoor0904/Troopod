import { Product } from '../types';

export const faqs = [
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

export const relatedProducts: Product[] = [
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

export const gallery = [
  "https://images.unsplash.com/photo-1704650311263-4563a029bd9e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1704650311298-4d6915d34c64?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1698943510859-e97dc93127e9?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1701859081873-faa81cdb8213?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1664787020182-7c17ea808ae0?auto=format&fit=crop&q=80&w=1200"
];
