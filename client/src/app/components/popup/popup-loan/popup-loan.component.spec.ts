import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLoanComponent } from './popup-loan.component';

describe('PopupLoanComponent', () => {
  let component: PopupLoanComponent;
  let fixture: ComponentFixture<PopupLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
