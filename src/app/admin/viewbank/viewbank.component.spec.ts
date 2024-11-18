import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBanksComponent } from './viewbank.component';

describe('ViewbankComponent', () => {
  let component: ViewBanksComponent;
  let fixture: ComponentFixture<ViewBanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBanksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
