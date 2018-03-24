import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFilterFormComponent } from './budget-filter-form.component';

describe('BudgetFilterFormComponent', () => {
  let component: BudgetFilterFormComponent;
  let fixture: ComponentFixture<BudgetFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
