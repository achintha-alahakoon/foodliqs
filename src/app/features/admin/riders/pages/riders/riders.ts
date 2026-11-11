import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from '../../../../../shared/components/confirm-dialog/confirm-dialog';
import { Rider, RiderDutyStatus, RiderStatus, VehicleType } from '../../models/rider.model';

@Component({
  imports: [ConfirmDialog, FormsModule, DecimalPipe],
  selector: 'app-riders',
  styleUrl: './riders.scss',
  templateUrl: './riders.html',
})
export class Riders {
  searchTerm = '';
  dutyFilter = 'All';
  zoneFilter = 'All';
  statusFilter: 'All' | RiderStatus = 'All';
  riderDraft: Rider | null = null;
  isCreateMode = false;
  riderToDelete: Rider | null = null;
  toastMessage = '';

  readonly zonesList = [
    'Parakaduwa Town',
    'Avissawella Central',
    'Eheliyagoda Border',
    'Pannila Road',
  ];

  readonly vehicleTypes: VehicleType[] = [
    'Motorbike',
    'Scooter',
    'Three-Wheeler',
    'Bicycle',
  ];

  readonly dutyStatusList: RiderDutyStatus[] = [
    'Available',
    'On Delivery',
    'Offline',
  ];

  riders: Rider[] = [
    {
      id: 'RDR-101',
      name: 'Kasun Madushanka',
      phone: '+94 77 234 5678',
      vehicleType: 'Motorbike',
      vehicleNumber: 'WP BIZ-4821',
      zone: 'Parakaduwa Town',
      rating: 4.9,
      completedDeliveries: 342,
      codHolding: 4250,
      dutyStatus: 'On Delivery',
      status: 'Active',
      avatarTone: 'amber',
    },
    {
      id: 'RDR-102',
      name: 'Dinuka Bandara',
      phone: '+94 71 890 1234',
      vehicleType: 'Motorbike',
      vehicleNumber: 'WP BDF-9120',
      zone: 'Avissawella Central',
      rating: 4.8,
      completedDeliveries: 289,
      codHolding: 2800,
      dutyStatus: 'Available',
      status: 'Active',
      avatarTone: 'emerald',
    },
    {
      id: 'RDR-103',
      name: 'Nuwan Priyashantha',
      phone: '+94 76 443 2190',
      vehicleType: 'Scooter',
      vehicleNumber: 'WP BGE-3312',
      zone: 'Parakaduwa Town',
      rating: 4.7,
      completedDeliveries: 195,
      codHolding: 0,
      dutyStatus: 'Available',
      status: 'Active',
      avatarTone: 'blue',
    },
    {
      id: 'RDR-104',
      name: 'Charith Jayasinghe',
      phone: '+94 75 889 0012',
      vehicleType: 'Three-Wheeler',
      vehicleNumber: 'WP ABQ-7724',
      zone: 'Eheliyagoda Border',
      rating: 4.9,
      completedDeliveries: 512,
      codHolding: 6400,
      dutyStatus: 'On Delivery',
      status: 'Active',
      avatarTone: 'purple',
    },
    {
      id: 'RDR-105',
      name: 'Pradeep Kumara',
      phone: '+94 78 123 9988',
      vehicleType: 'Motorbike',
      vehicleNumber: 'WP BKY-5541',
      zone: 'Avissawella Central',
      rating: 4.6,
      completedDeliveries: 164,
      codHolding: 1350,
      dutyStatus: 'Available',
      status: 'Active',
      avatarTone: 'coral',
    },
    {
      id: 'RDR-106',
      name: 'Lahiru Senanayake',
      phone: '+94 72 334 1122',
      vehicleType: 'Bicycle',
      vehicleNumber: 'Eco-Express',
      zone: 'Parakaduwa Town',
      rating: 4.8,
      completedDeliveries: 98,
      codHolding: 0,
      dutyStatus: 'Offline',
      status: 'Inactive',
      avatarTone: 'teal',
    },
  ];

  get onDutyCount(): number {
    return this.riders.filter((r) => r.dutyStatus === 'Available' || r.dutyStatus === 'On Delivery').length;
  }

  get onDeliveryCount(): number {
    return this.riders.filter((r) => r.dutyStatus === 'On Delivery').length;
  }

  get totalCodHolding(): number {
    return this.riders.reduce((acc, r) => acc + r.codHolding, 0);
  }

  get filteredRiders(): Rider[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.riders.filter((rider) => {
      const matchesSearch =
        !query ||
        [rider.id, rider.name, rider.phone, rider.vehicleNumber, rider.zone].some((f) =>
          f.toLowerCase().includes(query)
        );
      const matchesDuty = this.dutyFilter === 'All' || rider.dutyStatus === this.dutyFilter;
      const matchesZone = this.zoneFilter === 'All' || rider.zone === this.zoneFilter;
      const matchesStatus = this.statusFilter === 'All' || rider.status === this.statusFilter;

      return matchesSearch && matchesDuty && matchesZone && matchesStatus;
    });
  }

  setDutyFilter(duty: string): void {
    this.dutyFilter = duty;
  }

  setZoneFilter(zone: string): void {
    this.zoneFilter = zone;
  }

  setStatusFilter(status: 'All' | RiderStatus): void {
    this.statusFilter = status;
  }

  openCreateModal(): void {
    const nextIdNum = this.riders.length + 101;
    this.isCreateMode = true;
    this.riderDraft = {
      id: `RDR-${nextIdNum}`,
      name: '',
      phone: '+94 ',
      vehicleType: 'Motorbike',
      vehicleNumber: 'WP ',
      zone: this.zonesList[0],
      rating: 5.0,
      completedDeliveries: 0,
      codHolding: 0,
      dutyStatus: 'Available',
      status: 'Active',
      avatarTone: 'emerald',
    };
  }

  editRider(rider: Rider): void {
    this.isCreateMode = false;
    this.riderDraft = { ...rider };
  }

  closeModal(): void {
    this.riderDraft = null;
  }

  saveRider(): void {
    if (!this.riderDraft) return;

    if (this.isCreateMode) {
      this.riders = [...this.riders, this.riderDraft];
      this.showToast(`Rider "${this.riderDraft.name}" added to fleet.`);
    } else {
      const idx = this.riders.findIndex((r) => r.id === this.riderDraft?.id);
      if (idx !== -1) {
        const updated = [...this.riders];
        updated[idx] = this.riderDraft;
        this.riders = updated;
        this.showToast(`Rider "${this.riderDraft.name}" updated successfully.`);
      }
    }

    this.riderDraft = null;
  }

  toggleStatus(rider: Rider): void {
    const newStatus: RiderStatus = rider.status === 'Active' ? 'Inactive' : 'Active';
    const idx = this.riders.findIndex((r) => r.id === rider.id);
    if (idx !== -1) {
      const updated = [...this.riders];
      updated[idx] = { ...rider, status: newStatus };
      this.riders = updated;
      this.showToast(`"${rider.name}" set to ${newStatus}.`);
    }
  }

  requestDelete(rider: Rider): void {
    this.riderToDelete = rider;
  }

  confirmDelete(): void {
    if (!this.riderToDelete) return;
    const name = this.riderToDelete.name;
    this.riders = this.riders.filter((r) => r.id !== this.riderToDelete?.id);
    this.riderToDelete = null;
    this.showToast(`Rider "${name}" removed from fleet.`);
  }

  resetAllFilters(): void {
    this.searchTerm = '';
    this.dutyFilter = 'All';
    this.zoneFilter = 'All';
    this.statusFilter = 'All';
  }

  getVehicleIcon(type: VehicleType): string {
    switch (type) {
      case 'Motorbike':
        return 'bi-bicycle';
      case 'Scooter':
        return 'bi-speedometer2';
      case 'Three-Wheeler':
        return 'bi-truck';
      case 'Bicycle':
        return 'bi-bicycle';
      default:
        return 'bi-bicycle';
    }
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

