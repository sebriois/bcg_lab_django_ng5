import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityFormComponent } from './product-quantity-form.component';

describe('ProductQuantityFormComponent', () => {
  let component: ProductQuantityFormComponent;
  let fixture: ComponentFixture<ProductQuantityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQuantityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQuantityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
