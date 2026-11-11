import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Delivery } from './delivery';

describe('Delivery', () => {
  let component: Delivery;
  let fixture: ComponentFixture<Delivery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Delivery],
    }).compileComponents();

    fixture = TestBed.createComponent(Delivery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute delivery metrics correctly', () => {
    expect(component.maxOperatingRadius).toBe(15);
    expect(component.activeTiersCount).toBe(4);
    expect(component.activeZonesCount).toBe(4);
  });

  it('should switch navigation tabs', () => {
    expect(component.activeTab).toBe('pricing');
    component.setActiveTab('tiers');
    expect(component.activeTab).toBe('tiers');
    component.setActiveTab('operations');
    expect(component.activeTab).toBe('operations');
  });

  it('should toggle tier active status', () => {
    const tier = component.distanceTiers[0];
    expect(tier.isActive).toBe(true);

    component.toggleTierActive(tier);
    expect(tier.isActive).toBe(false);

    component.toggleTierActive(tier);
    expect(tier.isActive).toBe(true);
  });

  it('should toggle regional zone status', () => {
    const zone = component.deliveryZones[0];
    expect(zone.status).toBe('Active');

    component.toggleZoneStatus(zone);
    expect(zone.status).toBe('Inactive');

    component.toggleZoneStatus(zone);
    expect(zone.status).toBe('Active');
  });

  it('should edit distance tier and save changes', () => {
    const tier = component.distanceTiers[0];
    component.openEditTier(tier);
    expect(component.editingTier).toBeTruthy();

    if (component.editingTier) {
      component.editingTier.deliveryFee = 250;
    }

    component.saveTierEdit();
    expect(component.distanceTiers[0].deliveryFee).toBe(250);
    expect(component.editingTier).toBeNull();
  });

  it('should reset settings to default values upon confirmation', () => {
    component.config.baseFee = 400;
    component.config.enableRainSurge = true;

    component.openResetConfirm();
    expect(component.isResetConfirmOpen).toBe(true);

    component.confirmReset();
    expect(component.config.baseFee).toBe(200);
    expect(component.config.enableRainSurge).toBe(false);
    expect(component.isResetConfirmOpen).toBe(false);
  });
});

