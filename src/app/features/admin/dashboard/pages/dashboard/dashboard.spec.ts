import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the summary metrics and recent orders', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.metric-card')).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('.order-row')).toHaveLength(5);
    expect(fixture.nativeElement.querySelector('.orders-chart')).toBeTruthy();
  });
});
