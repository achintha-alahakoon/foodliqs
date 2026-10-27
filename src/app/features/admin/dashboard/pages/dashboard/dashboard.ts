import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Chart as ChartInstance } from 'chart.js';

@Component({
  imports: [RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private ordersChart?: ChartInstance;
  private isDestroyed = false;

  @ViewChild('ordersChart') private ordersChartCanvas?: ElementRef<HTMLCanvasElement>;

  readonly metrics = [
    { label: 'Total Orders', value: '48', change: '12%', icon: 'bi-bag-check', trend: 'up' },
    { label: 'Total Sales', value: 'Rs. 21,450', change: '18%', icon: 'bi-currency-rupee', trend: 'up' },
    { label: 'Pending Orders', value: '6', change: '—', icon: 'bi-hourglass-split', trend: 'neutral' },
    { label: 'Completed', value: '42', change: '14%', icon: 'bi-check2-circle', trend: 'up' },
  ];

  readonly recentOrders = [
    { id: '#10048', time: '11:32 AM', status: 'Delivered', tone: 'delivered', amount: 'Rs. 960' },
    { id: '#10047', time: '11:06 AM', status: 'Out for Delivery', tone: 'outgoing', amount: 'Rs. 820' },
    { id: '#10046', time: '10:42 AM', status: 'Confirmed', tone: 'confirmed', amount: 'Rs. 1,250' },
    { id: '#10045', time: '10:20 AM', status: 'Preparing', tone: 'preparing', amount: 'Rs. 680' },
    { id: '#10044', time: '09:58 AM', status: 'Delivered', tone: 'delivered', amount: 'Rs. 1,120' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    void this.initializeChart();
  }

  private async initializeChart(): Promise<void> {
    const canvas = this.ordersChartCanvas?.nativeElement;
    const context = canvas?.getContext('2d');
    if (!context) return;

    const { default: Chart } = await import('chart.js/auto');
    if (this.isDestroyed) return;

    const areaFill = context.createLinearGradient(0, 0, 0, 260);
    areaFill.addColorStop(0, 'rgba(67, 134, 221, 0.24)');
    areaFill.addColorStop(1, 'rgba(67, 134, 221, 0.02)');

    const labels = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

    this.ordersChart = new Chart(context, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Orders',
          data: [6, 13, 26, 27, 35, 45, 35, 39, 36, 47, 54, 49, 58],
          borderColor: '#4386dd',
          backgroundColor: areaFill,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: '#4386dd',
          fill: true,
          tension: 0.18,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { intersect: false, mode: 'index' },
        },
        scales: {
          x: {
            grid: { color: '#edf0f3' },
            border: { display: false },
            ticks: {
              autoSkip: false,
              color: '#768292',
              callback: (_value, index) => index % 3 === 0 ? labels[index] : '',
            },
          },
          y: {
            min: 0,
            max: 60,
            ticks: { stepSize: 20, color: '#768292' },
            grid: { color: '#edf0f3' },
            border: { display: false },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.ordersChart?.destroy();
  }
}
