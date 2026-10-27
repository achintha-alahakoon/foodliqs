import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shops } from './shops';

describe('Shops', () => {
  let component: Shops;
  let fixture: ComponentFixture<Shops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shops],
    }).compileComponents();

    fixture = TestBed.createComponent(Shops);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter shops by status and search text', () => {
    expect(component.filteredShops).toHaveLength(4);

    component.setStatusFilter('Active');
    expect(component.filteredShops).toHaveLength(3);

    component.searchTerm = 'Avissawella';
    expect(component.filteredShops.map((shop) => shop.id)).toEqual(['SH-102']);
  });
});
