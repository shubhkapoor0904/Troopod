export interface Review {
  name: string;
  title: string;
  text: string;
  rating: number;
  verified: boolean;
  date: string;
}

export interface Product {
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type?: 'subscription' | 'onetime';
  interval?: string;
}
