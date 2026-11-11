import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cod } from './cod';

describe('Cod', () => {
  let component: Cod;
  let fixture: ComponentFixture<Cod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cod],
    }).compileComponents();

    fixture = TestBed.createComponent(Cod);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate COD metrics correctly', () => {
    expect(component.riderSummaries.length).toBe(6);
    expect(component.totalPendingCod).toBeGreaterThan(0);
    expect(component.totalSettledToday).toBeGreaterThan(0);
    expect(component.ridersWithCashCount).toBe(4);
  });

  it('should switch tabs between riders and history', () => {
    expect(component.activeTab).toBe('riders');
    component.setActiveTab('history');
    expect(component.activeTab).toBe('history');
    component.setActiveTab('riders');
    expect(component.activeTab).toBe('riders');
  });

  it('should filter riders by search and status', () => {
    expect(component.filteredRiders).toHaveLength(6);

    component.searchTerm = 'Kasun';
    expect(component.filteredRiders).toHaveLength(1);
    expect(component.filteredRiders[0].riderId).toBe('RDR-101');

    component.searchTerm = '';
    component.setStatusFilter('Settled');
    expect(component.filteredRiders).toHaveLength(2);

    component.setStatusFilter('Pending');
    expect(component.filteredRiders).toHaveLength(4);
  });

  it('should filter transactions by search in history tab', () => {
    component.setActiveTab('history');
    expect(component.filteredTransactions).toHaveLength(4);

    component.searchTerm = 'Kasun';
    expect(component.filteredTransactions).toHaveLength(1);
    expect(component.filteredTransactions[0].id).toBe('COD-TX-2040');
  });

  it('should record a cash settlement for a rider via modal', () => {
    const target = component.riderSummaries[0]; // Charith Jayasinghe: 6400
    const initialPending = component.totalPendingCod;
    const initialTxCount = component.transactions.length;

    component.openSettleModal(target);
    expect(component.isSettleModalOpen).toBe(true);
    expect(component.settleDraft).toBeTruthy();

    if (component.settleDraft) {
      component.settleDraft.amountToSettle = 4000;
    }

    component.saveSettlement();

    expect(component.isSettleModalOpen).toBe(false);
    expect(component.riderSummaries[0].totalCollected).toBe(2400);
    expect(component.riderSummaries[0].status).toBe('Pending');
    expect(component.totalPendingCod).toBe(initialPending - 4000);
    expect(component.transactions.length).toBe(initialTxCount + 1);
  });

  it('should perform quick full settlement upon confirmation', () => {
    const target = component.riderSummaries[1]; // Kasun Madushanka: 4250
    component.requestQuickSettle(target);
    expect(component.riderToQuickSettle).toBe(target);

    component.confirmQuickSettle();
    expect(component.riderSummaries[1].totalCollected).toBe(0);
    expect(component.riderSummaries[1].status).toBe('Settled');
    expect(component.riderToQuickSettle).toBeNull();
  });
});

