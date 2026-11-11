import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from '../../../../../shared/components/confirm-dialog/confirm-dialog';
import { CodTransaction, RiderCodSummary, SettlementStatus } from '../../models/cod-settlement.model';

@Component({
  imports: [ConfirmDialog, FormsModule, DecimalPipe],
  selector: 'app-cod',
  styleUrl: './cod.scss',
  templateUrl: './cod.html',
})
export class Cod {
  activeTab: 'riders' | 'history' = 'riders';
  searchTerm = '';
  statusFilter: 'All' | SettlementStatus = 'All';
  toastMessage = '';

  // Settle modal draft
  isSettleModalOpen = false;
  settleDraft: {
    riderId: string;
    riderName: string;
    outstandingAmount: number;
    amountToSettle: number;
    paymentMethod: 'Cash Handover' | 'Bank Deposit' | 'Hub Safe';
    referenceNo: string;
    notes: string;
  } | null = null;

  // Confirm dialog state
  riderToQuickSettle: RiderCodSummary | null = null;

  riderSummaries: RiderCodSummary[] = [
    {
      riderId: 'RDR-104',
      riderName: 'Charith Jayasinghe',
      phone: '+94 75 889 0012',
      zone: 'Eheliyagoda Border',
      ordersDelivered: 5,
      totalCollected: 6400,
      lastSettlementTime: 'Yesterday, 8:45 PM',
      status: 'Pending',
      avatarTone: 'purple',
    },
    {
      riderId: 'RDR-101',
      riderName: 'Kasun Madushanka',
      phone: '+94 77 234 5678',
      zone: 'Parakaduwa Town',
      ordersDelivered: 4,
      totalCollected: 4250,
      lastSettlementTime: 'Today, 11:30 AM',
      status: 'Pending',
      avatarTone: 'amber',
    },
    {
      riderId: 'RDR-102',
      riderName: 'Dinuka Bandara',
      phone: '+94 71 890 1234',
      zone: 'Avissawella Central',
      ordersDelivered: 3,
      totalCollected: 2800,
      lastSettlementTime: 'Today, 10:15 AM',
      status: 'Pending',
      avatarTone: 'emerald',
    },
    {
      riderId: 'RDR-105',
      riderName: 'Pradeep Kumara',
      phone: '+94 78 123 9988',
      zone: 'Avissawella Central',
      ordersDelivered: 2,
      totalCollected: 1350,
      lastSettlementTime: 'Today, 9:00 AM',
      status: 'Pending',
      avatarTone: 'coral',
    },
    {
      riderId: 'RDR-103',
      riderName: 'Nuwan Priyashantha',
      phone: '+94 76 443 2190',
      zone: 'Parakaduwa Town',
      ordersDelivered: 3,
      totalCollected: 0,
      lastSettlementTime: 'Today, 1:20 PM',
      status: 'Settled',
      avatarTone: 'blue',
    },
    {
      riderId: 'RDR-106',
      riderName: 'Lahiru Senanayake',
      phone: '+94 72 334 1122',
      zone: 'Parakaduwa Town',
      ordersDelivered: 0,
      totalCollected: 0,
      lastSettlementTime: '10 Nov 2026',
      status: 'Settled',
      avatarTone: 'teal',
    },
  ];

  transactions: CodTransaction[] = [
    {
      id: 'COD-TX-2041',
      riderId: 'RDR-103',
      riderName: 'Nuwan Priyashantha',
      amount: 3250,
      date: 'Today, 1:20 PM',
      paymentMethod: 'Cash Handover',
      referenceNo: 'REC-PK-8841',
      verifiedBy: 'Parakaduwa Hub Cashier',
      status: 'Settled',
      notes: 'Full afternoon shift collection handover',
    },
    {
      id: 'COD-TX-2040',
      riderId: 'RDR-101',
      riderName: 'Kasun Madushanka',
      amount: 4500,
      date: 'Today, 11:30 AM',
      paymentMethod: 'Cash Handover',
      referenceNo: 'REC-PK-8839',
      verifiedBy: 'Parakaduwa Hub Cashier',
      status: 'Settled',
      notes: 'Morning orders cash reconciliation',
    },
    {
      id: 'COD-TX-2039',
      riderId: 'RDR-102',
      riderName: 'Dinuka Bandara',
      amount: 5900,
      date: 'Today, 10:15 AM',
      paymentMethod: 'Hub Safe',
      referenceNo: 'SAF-AV-104',
      verifiedBy: 'Avissawella Hub Supervisor',
      status: 'Settled',
      notes: 'Morning batch deposited into hub vault',
    },
    {
      id: 'COD-TX-2038',
      riderId: 'RDR-104',
      riderName: 'Charith Jayasinghe',
      amount: 4800,
      date: 'Yesterday, 8:45 PM',
      paymentMethod: 'Cash Handover',
      referenceNo: 'REC-EH-3021',
      verifiedBy: 'Eheliyagoda Supervisor',
      status: 'Settled',
      notes: 'Evening delivery settlement',
    },
  ];

  get totalPendingCod(): number {
    return this.riderSummaries.reduce((acc, r) => acc + r.totalCollected, 0);
  }

  get totalSettledToday(): number {
    return this.transactions.reduce((acc, t) => acc + t.amount, 0);
  }

  get ridersWithCashCount(): number {
    return this.riderSummaries.filter((r) => r.totalCollected > 0).length;
  }

  get filteredRiders(): RiderCodSummary[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.riderSummaries.filter((rider) => {
      const matchesSearch =
        !query ||
        [rider.riderId, rider.riderName, rider.phone, rider.zone].some((f) =>
          f.toLowerCase().includes(query)
        );
      const matchesStatus = this.statusFilter === 'All' || rider.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  get filteredTransactions(): CodTransaction[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.transactions.filter((tx) => {
      const matchesSearch =
        !query ||
        [tx.id, tx.riderId, tx.riderName, tx.referenceNo, tx.verifiedBy].some((f) =>
          f.toLowerCase().includes(query)
        );
      const matchesStatus = this.statusFilter === 'All' || tx.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  setActiveTab(tab: 'riders' | 'history'): void {
    this.activeTab = tab;
  }

  setStatusFilter(status: 'All' | SettlementStatus): void {
    this.statusFilter = status;
  }

  openSettleModal(rider?: RiderCodSummary): void {
    const target = rider ?? this.riderSummaries.find((r) => r.totalCollected > 0) ?? this.riderSummaries[0];
    const nextTxNum = this.transactions.length + 2042;

    this.settleDraft = {
      riderId: target.riderId,
      riderName: target.riderName,
      outstandingAmount: target.totalCollected,
      amountToSettle: target.totalCollected,
      paymentMethod: 'Cash Handover',
      referenceNo: `REC-PK-${nextTxNum}`,
      notes: '',
    };
    this.isSettleModalOpen = true;
  }

  closeSettleModal(): void {
    this.isSettleModalOpen = false;
    this.settleDraft = null;
  }

  saveSettlement(): void {
    if (!this.settleDraft) return;

    const { riderId, riderName, amountToSettle, paymentMethod, referenceNo, notes } = this.settleDraft;
    const riderIdx = this.riderSummaries.findIndex((r) => r.riderId === riderId);

    if (riderIdx !== -1) {
      const rider = this.riderSummaries[riderIdx];
      const remaining = Math.max(0, rider.totalCollected - amountToSettle);
      const newStatus: SettlementStatus = remaining === 0 ? 'Settled' : 'Pending';

      const updatedRiders = [...this.riderSummaries];
      updatedRiders[riderIdx] = {
        ...rider,
        totalCollected: remaining,
        status: newStatus,
        lastSettlementTime: 'Just now',
      };
      this.riderSummaries = updatedRiders;

      // Add transaction record
      const newTx: CodTransaction = {
        id: `COD-TX-${this.transactions.length + 2042}`,
        riderId,
        riderName,
        amount: amountToSettle,
        date: 'Today, Just now',
        paymentMethod,
        referenceNo: referenceNo || `REC-PK-${Date.now().toString().slice(-4)}`,
        verifiedBy: 'Hub Admin',
        status: 'Settled',
        notes: notes || 'Cash handover verified',
      };
      this.transactions = [newTx, ...this.transactions];

      this.showToast(`Settled Rs. ${amountToSettle.toLocaleString()}/- for ${riderName}.`);
    }

    this.closeSettleModal();
  }

  requestQuickSettle(rider: RiderCodSummary): void {
    this.riderToQuickSettle = rider;
  }

  confirmQuickSettle(): void {
    if (!this.riderToQuickSettle) return;
    const rider = this.riderToQuickSettle;
    const settledAmount = rider.totalCollected;

    const riderIdx = this.riderSummaries.findIndex((r) => r.riderId === rider.riderId);
    if (riderIdx !== -1) {
      const updatedRiders = [...this.riderSummaries];
      updatedRiders[riderIdx] = {
        ...rider,
        totalCollected: 0,
        status: 'Settled',
        lastSettlementTime: 'Just now',
      };
      this.riderSummaries = updatedRiders;

      const newTx: CodTransaction = {
        id: `COD-TX-${this.transactions.length + 2042}`,
        riderId: rider.riderId,
        riderName: rider.riderName,
        amount: settledAmount,
        date: 'Today, Just now',
        paymentMethod: 'Cash Handover',
        referenceNo: `REC-QS-${Date.now().toString().slice(-4)}`,
        verifiedBy: 'Hub Admin',
        status: 'Settled',
        notes: 'Full one-click COD reconciliation',
      };
      this.transactions = [newTx, ...this.transactions];

      this.showToast(`Fully settled Rs. ${settledAmount.toLocaleString()}/- for ${rider.riderName}.`);
    }

    this.riderToQuickSettle = null;
  }

  resetAllFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'All';
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

