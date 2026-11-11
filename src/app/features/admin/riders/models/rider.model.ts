export type RiderDutyStatus = 'Available' | 'On Delivery' | 'Offline';
export type RiderStatus = 'Active' | 'Inactive';
export type VehicleType = 'Motorbike' | 'Scooter' | 'Three-Wheeler' | 'Bicycle';

export interface Rider {
  id: string;
  name: string;
  phone: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  zone: string;
  rating: number;
  completedDeliveries: number;
  codHolding: number;
  dutyStatus: RiderDutyStatus;
  status: RiderStatus;
  avatarTone: 'amber' | 'emerald' | 'blue' | 'purple' | 'coral' | 'teal';
}

