import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialog } from './confirm-dialog';

describe('ConfirmDialog', () => {
  let component: ConfirmDialog;
  let fixture: ComponentFixture<ConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmed when the confirm action is clicked', () => {
    let confirmed = false;
    component.confirmed.subscribe(() => confirmed = true);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.btn-confirm').click();

    expect(confirmed).toBe(true);
  });
});
