import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from '../../../../../shared/components/confirm-dialog/confirm-dialog';

type ShopStatus = 'Active' | 'Inactive';

interface Shop {
  id: string;
  name: string;
  rating: number;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
  categories: string[];
  status: ShopStatus;
  thumbnail: string;
}

@Component({
  imports: [ConfirmDialog, FormsModule],
  selector: 'app-shops',
  styleUrl: './shops.scss',
  templateUrl: './shops.html',
})
export class Shops {
  searchTerm = '';
  statusFilter: 'All' | ShopStatus = 'All';
  editDraft: Shop | null = null;
  shopToDelete: Shop | null = null;
  readonly coverageRadius = '15.0 km';

  shops: Shop[] = [
    {
      id: 'SH-101', name: 'Parakaduwa Grand Restaurant', rating: 4.8,
      phone: '+94 77 123 4567', address: 'Main Street, Parakaduwa', latitude: '6.8456', longitude: '80.3124',
      categories: ['Rice & Curry', 'Short Eats', 'Beverages'], status: 'Active', thumbnail: 'restaurant',
    },
    {
      id: 'SH-102', name: 'Avissawella Fresh Bakers', rating: 4.6,
      phone: '+94 71 987 6543', address: 'No. 42, Avissawella Road, Parakaduwa', latitude: '6.8490', longitude: '80.3080',
      categories: ['Bakery & Pastry', 'Beverages'], status: 'Active', thumbnail: 'bakery',
    },
    {
      id: 'SH-103', name: 'Green Spot Fruitland & Juices', rating: 4.9,
      phone: '+94 76 555 4321', address: 'Near Clock Tower, Parakaduwa', latitude: '6.8421', longitude: '80.3155',
      categories: ['Fresh Fruits', 'Beverages'], status: 'Active', thumbnail: 'fresh',
    },
    {
      id: 'SH-104', name: 'Samanala Night Food Hub', rating: 4.8,
      phone: '+94 75 333 8899', address: 'Station Road, Eheliyagoda Border', latitude: '6.8520', longitude: '80.3201',
      categories: ['Kottu & Fried Rice', 'Short Eats'], status: 'Inactive', thumbnail: 'night',
    },
  ];

  get activeCount(): number {
    return this.shops.filter((shop) => shop.status === 'Active').length;
  }

  get filteredShops(): Shop[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.shops.filter((shop) => {
      const matchesStatus = this.statusFilter === 'All' || shop.status === this.statusFilter;
      const matchesQuery = !query || [shop.id, shop.name, shop.address].some((value) => value.toLowerCase().includes(query));
      return matchesStatus && matchesQuery;
    });
  }

  setStatusFilter(status: 'All' | ShopStatus): void {
    this.statusFilter = status;
  }

  editShop(shop: Shop): void {
    this.editDraft = { ...shop, categories: [...shop.categories] };
  }

  saveShop(): void {
    if (!this.editDraft) return;
    const index = this.shops.findIndex((shop) => shop.id === this.editDraft?.id);
    if (index !== -1) this.shops[index] = this.editDraft;
    this.editDraft = null;
  }

  requestDelete(shop: Shop): void {
    this.shopToDelete = shop;
  }

  confirmDelete(): void {
    if (!this.shopToDelete) return;
    this.shops = this.shops.filter((shop) => shop.id !== this.shopToDelete?.id);
    this.shopToDelete = null;
  }
}
