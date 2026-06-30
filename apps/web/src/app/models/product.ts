export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
