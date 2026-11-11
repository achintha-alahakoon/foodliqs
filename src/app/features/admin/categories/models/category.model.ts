export type CategoryStatus = 'Active' | 'Inactive';

export interface Category {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  colorTone: 'amber' | 'emerald' | 'blue' | 'coral' | 'purple' | 'rose' | 'teal';
  productCount: number;
  shopCount: number;
  displayOrder: number;
  status: CategoryStatus;
}

