import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type OrderGroup = 'all' | 'pending' | 'confirmed' | 'outgoing' | 'delivered';

interface OrderRecord {
  id: string;
  customer: string;
  total: string;
  status: string;
  group: Exclude<OrderGroup, 'all'>;
  tone: 'pending' | 'confirmed' | 'outgoing' | 'delivered';
}

@Component({
  imports: [FormsModule],
  selector: 'app-orders',
  styleUrl: './orders.scss',
  templateUrl: './orders.html',
})
export class Orders {
  activeTab: OrderGroup = 'all';
  statusFilter: OrderGroup = 'all';
  searchTerm = '';
  filterMenuOpen = false;
  actionMenuFor: string | null = null;
  selectedOrder: OrderRecord | null = null;
  copyMessage = '';

  readonly tabs: { label: string; group: OrderGroup; count: number }[] = [
    { label: 'All', group: 'all', count: 48 },
    { label: 'Pending', group: 'pending', count: 6 },
    { label: 'Confirmed', group: 'confirmed', count: 12 },
    { label: 'Out for Delivery', group: 'outgoing', count: 8 },
    { label: 'Delivered', group: 'delivered', count: 22 },
  ];

  readonly orders: OrderRecord[] = [
    { id: '#10048', customer: 'Nimal Perera', total: 'Rs. 960/-', status: 'Delivered', group: 'delivered', tone: 'delivered' },
    { id: '#10047', customer: 'Sanduni Silva', total: 'Rs. 820/-', status: 'Out for Delivery', group: 'outgoing', tone: 'outgoing' },
    { id: '#10046', customer: 'Kasun Fernando', total: 'Rs. 1,250/-', status: 'Confirmed', group: 'confirmed', tone: 'confirmed' },
    { id: '#10045', customer: 'Tharushi Madhushani', total: 'Rs. 680/-', status: 'Preparing', group: 'pending', tone: 'pending' },
    { id: '#10044', customer: 'Dulani Rathnayake', total: 'Rs. 1,120/-', status: 'Delivered', group: 'delivered', tone: 'delivered' },
  ];

  get filteredOrders(): OrderRecord[] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.orders.filter((order) => {
      const matchesSearch = !query || order.id.toLowerCase().includes(query) || order.customer.toLowerCase().includes(query);
      const matchesTab = this.activeTab === 'all' || order.group === this.activeTab;
      const matchesFilter = this.statusFilter === 'all' || order.group === this.statusFilter;
      return matchesSearch && matchesTab && matchesFilter;
    });
  }

  setActiveTab(group: OrderGroup): void {
    this.activeTab = group;
    this.actionMenuFor = null;
  }

  updateSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.actionMenuFor = null;
  }

  resetFilters(): void {
    this.statusFilter = 'all';
    this.searchTerm = '';
    this.filterMenuOpen = false;
  }

  toggleActions(orderId: string): void {
    this.actionMenuFor = this.actionMenuFor === orderId ? null : orderId;
  }

  showDetails(order: OrderRecord): void {
    this.selectedOrder = order;
    this.actionMenuFor = null;
  }

  closeDetails(): void {
    this.selectedOrder = null;
  }

  async copyOrderId(orderId: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(orderId);
      this.copyMessage = `Copied ${orderId}`;
    } catch {
      this.copyMessage = 'Clipboard access is unavailable.';
    }
    this.actionMenuFor = null;
  }
}
