import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Riders } from './riders';

describe('Riders', () => {
  let component: Riders;
  let fixture: ComponentFixture<Riders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Riders],
    }).compileComponents();

    fixture = TestBed.createComponent(Riders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate fleet metrics correctly', () => {
    expect(component.riders.length).toBe(6);
    expect(component.onDutyCount).toBe(5);
    expect(component.onDeliveryCount).toBe(2);
    expect(component.totalCodHolding).toBeGreaterThan(0);
  });

  it('should filter riders by search query', () => {
    expect(component.filteredRiders).toHaveLength(6);

    component.searchTerm = 'Kasun';
    expect(component.filteredRiders).toHaveLength(1);
    expect(component.filteredRiders[0].id).toBe('RDR-101');

    component.searchTerm = 'WP BKY-5541';
    expect(component.filteredRiders).toHaveLength(1);
    expect(component.filteredRiders[0].name).toBe('Pradeep Kumara');
  });

  it('should filter riders by duty, zone, and status', () => {
    component.setDutyFilter('On Delivery');
    expect(component.filteredRiders).toHaveLength(2);

    component.setDutyFilter('All');
    component.setZoneFilter('Parakaduwa Town');
    expect(component.filteredRiders).toHaveLength(3);

    component.setStatusFilter('Inactive');
    expect(component.filteredRiders).toHaveLength(1);
    expect(component.filteredRiders[0].name).toBe('Lahiru Senanayake');
  });

  it('should toggle rider status between active and inactive', () => {
    const rider = component.riders[0];
    expect(rider.status).toBe('Active');

    component.toggleStatus(rider);
    expect(component.riders[0].status).toBe('Inactive');

    component.toggleStatus(component.riders[0]);
    expect(component.riders[0].status).toBe('Active');
  });

  it('should add a new rider to the fleet', () => {
    const initialLen = component.riders.length;
    component.openCreateModal();
    expect(component.riderDraft).toBeTruthy();
    expect(component.isCreateMode).toBe(true);

    if (component.riderDraft) {
      component.riderDraft.name = 'Sunil Shantha';
      component.riderDraft.phone = '+94 77 999 1111';
      component.riderDraft.vehicleNumber = 'WP CAT-1122';
    }

    component.saveRider();
    expect(component.riders.length).toBe(initialLen + 1);
    expect(component.riders[initialLen].name).toBe('Sunil Shantha');
  });

  it('should edit an existing rider', () => {
    const target = component.riders[0];
    component.editRider(target);
    expect(component.isCreateMode).toBe(false);

    if (component.riderDraft) {
      component.riderDraft.zone = 'Avissawella Central';
    }

    component.saveRider();
    expect(component.riders[0].zone).toBe('Avissawella Central');
  });

  it('should delete a rider upon confirmation', () => {
    const target = component.riders[0];
    component.requestDelete(target);
    expect(component.riderToDelete).toBe(target);

    component.confirmDelete();
    expect(component.riders.some((r) => r.id === target.id)).toBe(false);
    expect(component.riderToDelete).toBeNull();
  });

  it('should return vehicle icons correctly', () => {
    expect(component.getVehicleIcon('Motorbike')).toBe('bi-bicycle');
    expect(component.getVehicleIcon('Three-Wheeler')).toBe('bi-truck');
  });
});

