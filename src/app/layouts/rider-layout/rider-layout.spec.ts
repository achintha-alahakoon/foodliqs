import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiderLayout } from './rider-layout';

describe('RiderLayout', () => {
  let component: RiderLayout;
  let fixture: ComponentFixture<RiderLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(RiderLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
