import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Products } from './products';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products],
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate metrics correctly', () => {
    expect(component.products.length).toBe(9);
    expect(component.activeCount).toBe(8);
    expect(component.stockAlertCount).toBe(2);
    expect(component.averagePrice).toBeGreaterThan(0);
  });

  it('should filter products by search, category, and stock', () => {
    expect(component.filteredProducts).toHaveLength(9);

    component.searchTerm = 'kottu';
    expect(component.filteredProducts).toHaveLength(2);

    component.searchTerm = '';
    component.setCategoryFilter('Beverages & Juices');
    expect(component.filteredProducts).toHaveLength(2);

    component.setStockFilter('Out of Stock');
    expect(component.filteredProducts).toHaveLength(1);
    expect(component.filteredProducts[0].name).toBe('Iced Faluda Royale');
  });

  it('should toggle product active status', () => {
    const item = component.products[0];
    expect(item.status).toBe('Active');

    component.toggleStatus(item);
    expect(component.products[0].status).toBe('Inactive');

    component.toggleStatus(component.products[0]);
    expect(component.products[0].status).toBe('Active');
  });

  it('should add a new product', () => {
    const initialLen = component.products.length;
    component.openCreateModal();
    expect(component.productDraft).toBeTruthy();
    expect(component.isCreateMode).toBe(true);

    if (component.productDraft) {
      component.productDraft.name = 'Egg Fried Rice';
      component.productDraft.price = 750;
    }

    component.saveProduct();
    expect(component.products.length).toBe(initialLen + 1);
    expect(component.products[initialLen].name).toBe('Egg Fried Rice');
  });

  it('should edit an existing product', () => {
    const item = component.products[0];
    component.editProduct(item);
    expect(component.isCreateMode).toBe(false);

    if (component.productDraft) {
      component.productDraft.price = 1350;
    }

    component.saveProduct();
    expect(component.products[0].price).toBe(1350);
  });

  it('should delete a product upon confirmation', () => {
    const item = component.products[0];
    component.requestDelete(item);
    expect(component.productToDelete).toBe(item);

    component.confirmDelete();
    expect(component.products.some((p) => p.id === item.id)).toBe(false);
    expect(component.productToDelete).toBeNull();
  });
});

