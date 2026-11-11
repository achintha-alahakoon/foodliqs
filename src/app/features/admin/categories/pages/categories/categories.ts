import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from '../../../../../shared/components/confirm-dialog/confirm-dialog';
import { Category, CategoryStatus } from '../../models/category.model';

@Component({
  imports: [ConfirmDialog, FormsModule, TitleCasePipe],
  selector: 'app-categories',
  styleUrl: './categories.scss',
  templateUrl: './categories.html',
})
export class Categories {
  searchTerm = '';
  statusFilter: 'All' | CategoryStatus = 'All';
  categoryDraft: Category | null = null;
  isCreateMode = false;
  categoryToDelete: Category | null = null;
  toastMessage = '';

  readonly availableIcons = [
    { label: 'Meal / Rice', value: 'bi-egg-fried' },
    { label: 'Flame / Kottu', value: 'bi-fire' },
    { label: 'Bakery / Pastry', value: 'bi-cake2' },
    { label: 'Drinks / Juices', value: 'bi-cup-straw' },
    { label: 'Fresh / Fruits', value: 'bi-apple' },
    { label: 'Desserts / Stars', value: 'bi-stars' },
    { label: 'Late Night', value: 'bi-moon-stars' },
    { label: 'Fast Food', value: 'bi-basket2' },
  ];

  readonly availableTones: Category['colorTone'][] = [
    'amber',
    'coral',
    'purple',
    'blue',
    'emerald',
    'rose',
    'teal',
  ];

  categories: Category[] = [
    {
      id: 'CAT-01',
      code: 'rice-curry',
      name: 'Rice & Curry',
      description: 'Traditional Sri Lankan rice packets, red & white rice combos, and daily curry pots',
      icon: 'bi-egg-fried',
      colorTone: 'amber',
      productCount: 46,
      shopCount: 14,
      displayOrder: 1,
      status: 'Active',
    },
    {
      id: 'CAT-02',
      code: 'kottu-roti',
      name: 'Kottu & Roti',
      description: 'Chicken, beef, egg & cheese kottu, parata, and hot godamba roti',
      icon: 'bi-fire',
      colorTone: 'coral',
      productCount: 32,
      shopCount: 11,
      displayOrder: 2,
      status: 'Active',
    },
    {
      id: 'CAT-03',
      code: 'short-eats-bakery',
      name: 'Short Eats & Bakery',
      description: 'Patties, fish buns, cutlets, pastries, sandwiches, and fresh bread',
      icon: 'bi-cake2',
      colorTone: 'purple',
      productCount: 28,
      shopCount: 9,
      displayOrder: 3,
      status: 'Active',
    },
    {
      id: 'CAT-04',
      code: 'beverages-juices',
      name: 'Beverages & Juices',
      description: 'Fresh tropical fruit juices, iced faluda, milkshakes, and soft drinks',
      icon: 'bi-cup-straw',
      colorTone: 'blue',
      productCount: 24,
      shopCount: 12,
      displayOrder: 4,
      status: 'Active',
    },
    {
      id: 'CAT-05',
      code: 'fruits-salads',
      name: 'Fresh Fruits & Salads',
      description: 'Seasonal local fruits, pre-cut fruit bowls, avocado, and vegetable salads',
      icon: 'bi-apple',
      colorTone: 'emerald',
      productCount: 16,
      shopCount: 6,
      displayOrder: 5,
      status: 'Active',
    },
    {
      id: 'CAT-06',
      code: 'desserts-sweets',
      name: 'Desserts & Sweets',
      description: 'Watalappam, caramel pudding, buffalo curd with treacle, and cakes',
      icon: 'bi-stars',
      colorTone: 'rose',
      productCount: 18,
      shopCount: 7,
      displayOrder: 6,
      status: 'Active',
    },
    {
      id: 'CAT-07',
      code: 'late-night',
      name: 'Late Night Specials',
      description: 'Midnight snacks, quick fried bites, and after-hours delivery packages',
      icon: 'bi-moon-stars',
      colorTone: 'teal',
      productCount: 12,
      shopCount: 5,
      displayOrder: 7,
      status: 'Inactive',
    },
  ];

  get totalProducts(): number {
    return this.categories.reduce((acc, cat) => acc + cat.productCount, 0);
  }

  get activeCount(): number {
    return this.categories.filter((c) => c.status === 'Active').length;
  }

  get topCategory(): Category | undefined {
    return [...this.categories].sort((a, b) => b.productCount - a.productCount)[0];
  }

  get filteredCategories(): Category[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.categories
      .filter((cat) => {
        const matchesStatus = this.statusFilter === 'All' || cat.status === this.statusFilter;
        const matchesQuery =
          !query ||
          [cat.id, cat.code, cat.name, cat.description].some((field) =>
            field.toLowerCase().includes(query)
          );
        return matchesStatus && matchesQuery;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  setStatusFilter(status: 'All' | CategoryStatus): void {
    this.statusFilter = status;
  }

  openCreateModal(): void {
    const nextOrder = this.categories.length + 1;
    const nextIdNum = this.categories.length + 1;
    const id = `CAT-${String(nextIdNum).padStart(2, '0')}`;

    this.isCreateMode = true;
    this.categoryDraft = {
      id,
      code: '',
      name: '',
      description: '',
      icon: 'bi-egg-fried',
      colorTone: 'amber',
      productCount: 0,
      shopCount: 0,
      displayOrder: nextOrder,
      status: 'Active',
    };
  }

  editCategory(category: Category): void {
    this.isCreateMode = false;
    this.categoryDraft = { ...category };
  }

  closeModal(): void {
    this.categoryDraft = null;
  }

  saveCategory(): void {
    if (!this.categoryDraft) return;

    // auto-generate code if left blank
    if (!this.categoryDraft.code.trim()) {
      this.categoryDraft.code = this.categoryDraft.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    if (this.isCreateMode) {
      this.categories = [...this.categories, this.categoryDraft];
      this.showToast(`Category "${this.categoryDraft.name}" created successfully.`);
    } else {
      const index = this.categories.findIndex((c) => c.id === this.categoryDraft?.id);
      if (index !== -1) {
        const updated = [...this.categories];
        updated[index] = this.categoryDraft;
        this.categories = updated;
        this.showToast(`Category "${this.categoryDraft.name}" updated successfully.`);
      }
    }

    this.categoryDraft = null;
  }

  toggleStatus(category: Category): void {
    const newStatus: CategoryStatus = category.status === 'Active' ? 'Inactive' : 'Active';
    const index = this.categories.findIndex((c) => c.id === category.id);
    if (index !== -1) {
      const updated = [...this.categories];
      updated[index] = { ...category, status: newStatus };
      this.categories = updated;
      this.showToast(`"${category.name}" set to ${newStatus}.`);
    }
  }

  requestDelete(category: Category): void {
    this.categoryToDelete = category;
  }

  confirmDelete(): void {
    if (!this.categoryToDelete) return;
    const name = this.categoryToDelete.name;
    this.categories = this.categories.filter((c) => c.id !== this.categoryToDelete?.id);
    this.categoryToDelete = null;
    this.showToast(`Category "${name}" removed.`);
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
