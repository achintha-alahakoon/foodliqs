import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from '../../../../../shared/components/confirm-dialog/confirm-dialog';
import { Product, ProductStatus, StockStatus } from '../../models/product.model';

@Component({
  imports: [ConfirmDialog, FormsModule, DecimalPipe],
  selector: 'app-products',
  styleUrl: './products.scss',
  templateUrl: './products.html',
})
export class Products {
  searchTerm = '';
  categoryFilter = 'All';
  stockFilter = 'All';
  statusFilter: 'All' | ProductStatus = 'All';
  productDraft: Product | null = null;
  isCreateMode = false;
  productToDelete: Product | null = null;
  toastMessage = '';

  readonly categoriesList = [
    'Rice & Curry',
    'Kottu & Roti',
    'Short Eats & Bakery',
    'Beverages & Juices',
    'Fresh Fruits & Salads',
    'Desserts & Sweets',
    'Late Night Specials',
  ];

  readonly shopsList = [
    'Parakaduwa Grand Restaurant',
    'Avissawella Fresh Bakers',
    'Green Spot Fruitland & Juices',
    'Samanala Night Food Hub',
  ];

  readonly stockStatusOptions: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];

  products: Product[] = [
    {
      id: 'PRD-101',
      name: 'Chicken Cheese Kottu (Full)',
      category: 'Kottu & Roti',
      shopName: 'Samanala Night Food Hub',
      price: 1150,
      originalPrice: 1250,
      rating: 4.8,
      stockStatus: 'In Stock',
      status: 'Active',
      description: 'Shredded godamba roti stir-fried with tender chicken, rich cheese sauce, vegetables, and aromatic spices',
      thumbnailClass: 'kottu',
    },
    {
      id: 'PRD-102',
      name: 'Special Sri Lankan Lamprais',
      category: 'Rice & Curry',
      shopName: 'Parakaduwa Grand Restaurant',
      price: 980,
      rating: 4.9,
      stockStatus: 'In Stock',
      status: 'Active',
      description: 'Ghee rice baked in banana leaf with mixed meat curry, frikkadel meatballs, blachan, and brinjal moju',
      thumbnailClass: 'lamprais',
    },
    {
      id: 'PRD-103',
      name: 'Seafood Mixed Fried Rice',
      category: 'Rice & Curry',
      shopName: 'Parakaduwa Grand Restaurant',
      price: 1280,
      rating: 4.7,
      stockStatus: 'In Stock',
      status: 'Active',
      description: 'Wok-tossed basmati rice with fresh prawns, cuttlefish, eggs, chili paste, and sweet chili sauce',
      thumbnailClass: 'rice',
    },
    {
      id: 'PRD-104',
      name: 'Short Eats Party Box (12 pcs)',
      category: 'Short Eats & Bakery',
      shopName: 'Avissawella Fresh Bakers',
      price: 850,
      rating: 4.6,
      stockStatus: 'In Stock',
      status: 'Active',
      description: 'Assorted fish patties, vegetable cutlets, chicken rolls, and savory egg buns with dipping sauce',
      thumbnailClass: 'bakery',
    },
    {
      id: 'PRD-105',
      name: 'Fresh Avocado & Honey Juice',
      category: 'Beverages & Juices',
      shopName: 'Green Spot Fruitland & Juices',
      price: 380,
      rating: 4.9,
      stockStatus: 'In Stock',
      status: 'Active',
      description: 'Thick, creamy local butter avocado blended with fresh milk, bee honey, and crushed ice',
      thumbnailClass: 'juice',
    },
    {
      id: 'PRD-106',
      name: 'Traditional Watalappam Tub',
      category: 'Desserts & Sweets',
      shopName: 'Parakaduwa Grand Restaurant',
      price: 420,
      rating: 4.8,
      stockStatus: 'In Stock',
      status: 'Active',
      description: 'Steamed jaggery and coconut custard dessert infused with cardamom, nutmeg, and crunchy cashew nuts',
      thumbnailClass: 'dessert',
    },
    {
      id: 'PRD-107',
      name: 'Tropical Cut Fruit Salad Bowl',
      category: 'Fresh Fruits & Salads',
      shopName: 'Green Spot Fruitland & Juices',
      price: 480,
      rating: 4.5,
      stockStatus: 'In Stock',
      status: 'Active',
      description: 'Fresh papaya, pineapple, watermelon, passion fruit, and banana dressed with lime zest',
      thumbnailClass: 'fruit',
    },
    {
      id: 'PRD-108',
      name: 'Spicy Beef Roast Kottu',
      category: 'Kottu & Roti',
      shopName: 'Samanala Night Food Hub',
      price: 1050,
      rating: 4.6,
      stockStatus: 'Low Stock',
      status: 'Active',
      description: 'Slow-cooked devilled beef pieces chopped with godamba roti, leeks, onions, and spicy brown gravy',
      thumbnailClass: 'kottu',
    },
    {
      id: 'PRD-109',
      name: 'Iced Faluda Royale',
      category: 'Beverages & Juices',
      shopName: 'Green Spot Fruitland & Juices',
      price: 420,
      rating: 4.7,
      stockStatus: 'Out of Stock',
      status: 'Inactive',
      description: 'Chilled rose syrup milk drink with basil seeds (kasakasa), vermicelli, and vanilla ice cream',
      thumbnailClass: 'juice',
    },
  ];

  get activeCount(): number {
    return this.products.filter((p) => p.status === 'Active').length;
  }

  get stockAlertCount(): number {
    return this.products.filter((p) => p.stockStatus === 'Low Stock' || p.stockStatus === 'Out of Stock').length;
  }

  get averagePrice(): number {
    if (!this.products.length) return 0;
    const total = this.products.reduce((acc, p) => acc + p.price, 0);
    return Math.round(total / this.products.length);
  }

  get filteredProducts(): Product[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.products.filter((prod) => {
      const matchesSearch =
        !query ||
        [prod.id, prod.name, prod.category, prod.shopName, prod.description].some((f) =>
          f.toLowerCase().includes(query)
        );
      const matchesCategory = this.categoryFilter === 'All' || prod.category === this.categoryFilter;
      const matchesStock = this.stockFilter === 'All' || prod.stockStatus === this.stockFilter;
      const matchesStatus = this.statusFilter === 'All' || prod.status === this.statusFilter;

      return matchesSearch && matchesCategory && matchesStock && matchesStatus;
    });
  }

  setCategoryFilter(category: string): void {
    this.categoryFilter = category;
  }

  setStockFilter(stock: string): void {
    this.stockFilter = stock;
  }

  setStatusFilter(status: 'All' | ProductStatus): void {
    this.statusFilter = status;
  }

  openCreateModal(): void {
    const nextNum = this.products.length + 101;
    this.isCreateMode = true;
    this.productDraft = {
      id: `PRD-${nextNum}`,
      name: '',
      category: this.categoriesList[0],
      shopName: this.shopsList[0],
      price: 500,
      rating: 5.0,
      stockStatus: 'In Stock',
      status: 'Active',
      description: '',
      thumbnailClass: 'rice',
    };
  }

  editProduct(product: Product): void {
    this.isCreateMode = false;
    this.productDraft = { ...product };
  }

  closeModal(): void {
    this.productDraft = null;
  }

  saveProduct(): void {
    if (!this.productDraft) return;

    if (this.isCreateMode) {
      this.products = [...this.products, this.productDraft];
      this.showToast(`Product "${this.productDraft.name}" added successfully.`);
    } else {
      const idx = this.products.findIndex((p) => p.id === this.productDraft?.id);
      if (idx !== -1) {
        const updated = [...this.products];
        updated[idx] = this.productDraft;
        this.products = updated;
        this.showToast(`Product "${this.productDraft.name}" updated successfully.`);
      }
    }

    this.productDraft = null;
  }

  toggleStatus(product: Product): void {
    const newStatus: ProductStatus = product.status === 'Active' ? 'Inactive' : 'Active';
    const idx = this.products.findIndex((p) => p.id === product.id);
    if (idx !== -1) {
      const updated = [...this.products];
      updated[idx] = { ...product, status: newStatus };
      this.products = updated;
      this.showToast(`"${product.name}" set to ${newStatus}.`);
    }
  }

  requestDelete(product: Product): void {
    this.productToDelete = product;
  }

  confirmDelete(): void {
    if (!this.productToDelete) return;
    const name = this.productToDelete.name;
    this.products = this.products.filter((p) => p.id !== this.productToDelete?.id);
    this.productToDelete = null;
    this.showToast(`Product "${name}" deleted.`);
  }

  resetAllFilters(): void {
    this.searchTerm = '';
    this.categoryFilter = 'All';
    this.stockFilter = 'All';
    this.statusFilter = 'All';
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => {
      if (this.toastMessage === message) {
        this.toastMessage = '';
      }
    }, 3500);
  }
}
