import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugetlinesComponent } from './budgetlines.component';

describe('BugetlinesComponent', () => {
  let component: BugetlinesComponent;
  let fixture: ComponentFixture<BugetlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugetlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugetlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
