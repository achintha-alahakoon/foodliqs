export type SettlementStatus = 'Pending' | 'Settled' | 'Discrepancy';

export interface RiderCodSummary {
  riderId: string;
  riderName: string;
  phone: string;
  zone: string;
  ordersDelivered: number;
  totalCollected: number;
  lastSettlementTime: string;
  status: SettlementStatus;
  avatarTone: 'amber' | 'emerald' | 'blue' | 'purple' | 'coral' | 'teal';
}

export interface CodTransaction {
  id: string;
  riderId: string;
  riderName: string;
  amount: number;
  date: string;
  paymentMethod: 'Cash Handover' | 'Bank Deposit' | 'Hub Safe';
  referenceNo: string;
  verifiedBy: string;
  status: SettlementStatus;
  notes?: string;
}

