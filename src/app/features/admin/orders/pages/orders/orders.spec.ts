import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Orders } from './orders';

describe('Orders', () => {
  let component: Orders;
  let fixture: ComponentFixture<Orders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orders],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Orders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter orders by status tab and search query', () => {
    expect(component.filteredOrders).toHaveLength(5);

    component.setActiveTab('delivered');
    expect(component.filteredOrders.map((order) => order.id)).toEqual(['#10048', '#10044']);

    component.setActiveTab('all');
    component.searchTerm = 'Sanduni';
    expect(component.filteredOrders.map((order) => order.id)).toEqual(['#10047']);
  });
});
