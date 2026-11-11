import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Categories } from './categories';

describe('Categories', () => {
  let component: Categories;
  let fixture: ComponentFixture<Categories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categories],
    }).compileComponents();

    fixture = TestBed.createComponent(Categories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute metrics correctly', () => {
    expect(component.categories.length).toBe(7);
    expect(component.activeCount).toBe(6);
    expect(component.totalProducts).toBeGreaterThan(0);
    expect(component.topCategory?.name).toBe('Rice & Curry');
  });

  it('should filter categories by status and search text', () => {
    expect(component.filteredCategories).toHaveLength(7);

    component.setStatusFilter('Active');
    expect(component.filteredCategories).toHaveLength(6);

    component.setStatusFilter('Inactive');
    expect(component.filteredCategories).toHaveLength(1);
    expect(component.filteredCategories[0].id).toBe('CAT-07');

    component.setStatusFilter('All');
    component.searchTerm = 'kottu';
    expect(component.filteredCategories).toHaveLength(1);
    expect(component.filteredCategories[0].name).toBe('Kottu & Roti');
  });

  it('should toggle category status', () => {
    const target = component.categories[0];
    expect(target.status).toBe('Active');

    component.toggleStatus(target);
    expect(component.categories[0].status).toBe('Inactive');

    component.toggleStatus(component.categories[0]);
    expect(component.categories[0].status).toBe('Active');
  });

  it('should add a new category', () => {
    const initialLength = component.categories.length;
    component.openCreateModal();
    expect(component.categoryDraft).toBeTruthy();
    expect(component.isCreateMode).toBe(true);

    if (component.categoryDraft) {
      component.categoryDraft.name = 'Juice Bar';
      component.categoryDraft.code = 'juice-bar';
    }

    component.saveCategory();
    expect(component.categories.length).toBe(initialLength + 1);
    expect(component.categories[initialLength].name).toBe('Juice Bar');
  });

  it('should edit an existing category', () => {
    const target = component.categories[0];
    component.editCategory(target);
    expect(component.isCreateMode).toBe(false);

    if (component.categoryDraft) {
      component.categoryDraft.name = 'Premium Rice & Curry';
    }

    component.saveCategory();
    expect(component.categories[0].name).toBe('Premium Rice & Curry');
  });

  it('should delete a category after confirmation', () => {
    const target = component.categories[0];
    component.requestDelete(target);
    expect(component.categoryToDelete).toBe(target);

    component.confirmDelete();
    expect(component.categories.some((c) => c.id === target.id)).toBe(false);
    expect(component.categoryToDelete).toBeNull();
  });
});

