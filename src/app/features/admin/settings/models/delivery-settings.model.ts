export interface DistanceTier {
  id: string;
  name: string;
  minDistance: number;
  maxDistance: number;
  deliveryFee: number;
  estimatedTimeMin: number;
  estimatedTimeMax: number;
  isActive: boolean;
}

export interface DeliveryZone {
  id: string;
  name: string;
  hubCenter: string;
  radiusKm: number;
  status: 'Active' | 'Inactive';
  assignedRiders: number;
}

export interface DeliverySettingsConfig {
  baseFee: number;
  baseDistanceKm: number;
  perKmRate: number;
  freeDeliveryThreshold: number;
  enableFreeDelivery: boolean;
  minOrderAmount: number;
  servicePackingFee: number;
  openingTime: string;
  closingTime: string;
  enableRainSurge: boolean;
  rainSurgeFee: number;
  enableLateNightSurge: boolean;
  lateNightSurgeFee: number;
  maxCodOrderLimit: number;
  maxRiderCodHolding: number;
}

