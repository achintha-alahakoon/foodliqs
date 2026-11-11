export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';
export type ProductStatus = 'Active' | 'Inactive';

export interface Product {
  id: string;
  name: string;
  category: string;
  shopName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  stockStatus: StockStatus;
  status: ProductStatus;
  description: string;
  thumbnailClass: string;
}

