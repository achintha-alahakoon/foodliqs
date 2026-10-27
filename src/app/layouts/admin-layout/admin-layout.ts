import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  imports: [ConfirmDialog, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  private readonly router = inject(Router);
  @ViewChild('logoutButton') private logoutButton?: ElementRef<HTMLButtonElement>;

  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;
  isLogoutDialogOpen = false;

  readonly today = new Date();
  readonly todayIso = [
    this.today.getFullYear(),
    String(this.today.getMonth() + 1).padStart(2, '0'),
    String(this.today.getDate()).padStart(2, '0'),
  ].join('-');
  readonly todayLabel = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(this.today);

  get pageTitle(): string {
    const segment = this.router.url.split(/[?#]/)[0].split('/').filter(Boolean).pop() ?? 'dashboard';
    return segment.replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  get sidebarExpanded(): boolean {
    if (typeof window === 'undefined') return !this.isSidebarCollapsed;
    return window.matchMedia('(max-width: 767px)').matches
      ? this.isMobileSidebarOpen
      : !this.isSidebarCollapsed;
  }

  get sidebarInert(): boolean {
    return typeof window !== 'undefined'
      && window.matchMedia('(max-width: 767px)').matches
      && !this.isMobileSidebarOpen;
  }

  toggleSidebar(): void {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
      return;
    }

    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }

  openLogoutDialog(): void {
    this.isLogoutDialogOpen = true;
  }

  cancelLogout(): void {
    this.isLogoutDialogOpen = false;
    queueMicrotask(() => this.logoutButton?.nativeElement.focus());
  }

  confirmLogout(): void {
    this.isLogoutDialogOpen = false;
    this.isMobileSidebarOpen = false;
    void this.router.navigateByUrl('/login');
  }

  @HostListener('document:keydown.escape')
  closeSidebarOnEscape(): void {
    this.closeMobileSidebar();
  }
}
