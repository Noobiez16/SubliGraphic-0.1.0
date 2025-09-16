export type Theme = 'ios' | 'android' | 'desktop';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
  customDesignUrl?: string; // <-- ADDED THIS LINE
}