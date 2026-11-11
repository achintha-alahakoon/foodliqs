import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from '../../../../../shared/components/confirm-dialog/confirm-dialog';
import {
  DeliverySettingsConfig,
  DeliveryZone,
  DistanceTier,
} from '../../models/delivery-settings.model';

@Component({
  imports: [ConfirmDialog, FormsModule, DecimalPipe],
  selector: 'app-delivery-settings',
  styleUrl: './delivery.scss',
  templateUrl: './delivery.html',
})
export class Delivery {
  activeTab: 'pricing' | 'tiers' | 'operations' = 'pricing';
  toastMessage = '';
  isResetConfirmOpen = false;

  // Selected tier for editing modal
  editingTier: DistanceTier | null = null;

  config: DeliverySettingsConfig = {
    baseFee: 200,
    baseDistanceKm: 3,
    perKmRate: 50,
    freeDeliveryThreshold: 3500,
    enableFreeDelivery: true,
    minOrderAmount: 450,
    servicePackingFee: 50,
    openingTime: '07:00',
    closingTime: '23:00',
    enableRainSurge: false,
    rainSurgeFee: 75,
    enableLateNightSurge: true,
    lateNightSurgeFee: 100,
    maxCodOrderLimit: 10000,
    maxRiderCodHolding: 15000,
  };

  distanceTiers: DistanceTier[] = [
    {
      id: 'TIER-1',
      name: 'Local Inner Zone',
      minDistance: 0,
      maxDistance: 3,
      deliveryFee: 200,
      estimatedTimeMin: 20,
      estimatedTimeMax: 30,
      isActive: true,
    },
    {
      id: 'TIER-2',
      name: 'Mid-Town Radius',
      minDistance: 3,
      maxDistance: 7,
      deliveryFee: 350,
      estimatedTimeMin: 30,
      estimatedTimeMax: 45,
      isActive: true,
    },
    {
      id: 'TIER-3',
      name: 'Outer Area Corridor',
      minDistance: 7,
      maxDistance: 12,
      deliveryFee: 500,
      estimatedTimeMin: 45,
      estimatedTimeMax: 60,
      isActive: true,
    },
    {
      id: 'TIER-4',
      name: 'Extended Boundary',
      minDistance: 12,
      maxDistance: 15,
      deliveryFee: 650,
      estimatedTimeMin: 55,
      estimatedTimeMax: 75,
      isActive: true,
    },
  ];

  deliveryZones: DeliveryZone[] = [
    {
      id: 'ZONE-01',
      name: 'Parakaduwa Town Hub',
      hubCenter: 'Main Clock Tower, Parakaduwa',
      radiusKm: 5.0,
      status: 'Active',
      assignedRiders: 4,
    },
    {
      id: 'ZONE-02',
      name: 'Avissawella Central',
      hubCenter: 'Avissawella Bus Stand Junction',
      radiusKm: 7.0,
      status: 'Active',
      assignedRiders: 2,
    },
    {
      id: 'ZONE-03',
      name: 'Eheliyagoda Border',
      hubCenter: 'Eheliyagoda Border Post',
      radiusKm: 6.0,
      status: 'Active',
      assignedRiders: 2,
    },
    {
      id: 'ZONE-04',
      name: 'Pannila Rural Corridor',
      hubCenter: 'Pannila Junction Post',
      radiusKm: 4.5,
      status: 'Active',
      assignedRiders: 1,
    },
  ];

  get maxOperatingRadius(): number {
    return Math.max(...this.distanceTiers.map((t) => t.maxDistance));
  }

  get activeTiersCount(): number {
    return this.distanceTiers.filter((t) => t.isActive).length;
  }

  get activeZonesCount(): number {
    return this.deliveryZones.filter((z) => z.status === 'Active').length;
  }

  setActiveTab(tab: 'pricing' | 'tiers' | 'operations'): void {
    this.activeTab = tab;
  }

  saveAllSettings(): void {
    this.showToast('Delivery configuration saved and published live.');
  }

  toggleTierActive(tier: DistanceTier): void {
    tier.isActive = !tier.isActive;
    this.showToast(`Tier "${tier.name}" ${tier.isActive ? 'enabled' : 'disabled'}.`);
  }

  toggleZoneStatus(zone: DeliveryZone): void {
    zone.status = zone.status === 'Active' ? 'Inactive' : 'Active';
    this.showToast(`Zone "${zone.name}" set to ${zone.status}.`);
  }

  openEditTier(tier: DistanceTier): void {
    this.editingTier = { ...tier };
  }

  closeEditTier(): void {
    this.editingTier = null;
  }

  saveTierEdit(): void {
    if (!this.editingTier) return;
    const idx = this.distanceTiers.findIndex((t) => t.id === this.editingTier?.id);
    if (idx !== -1) {
      this.distanceTiers[idx] = this.editingTier;
      this.showToast(`Updated tier "${this.editingTier.name}".`);
    }
    this.editingTier = null;
  }

  openResetConfirm(): void {
    this.isResetConfirmOpen = true;
  }

  confirmReset(): void {
    this.config = {
      baseFee: 200,
      baseDistanceKm: 3,
      perKmRate: 50,
      freeDeliveryThreshold: 3500,
      enableFreeDelivery: true,
      minOrderAmount: 450,
      servicePackingFee: 50,
      openingTime: '07:00',
      closingTime: '23:00',
      enableRainSurge: false,
      rainSurgeFee: 75,
      enableLateNightSurge: true,
      lateNightSurgeFee: 100,
      maxCodOrderLimit: 10000,
      maxRiderCodHolding: 15000,
    };
    this.isResetConfirmOpen = false;
    this.showToast('Reset delivery settings to default values.');
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

