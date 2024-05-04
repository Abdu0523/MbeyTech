import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsalerProductComponent } from './bestsaler-product.component';

describe('BestsalerProductComponent', () => {
  let component: BestsalerProductComponent;
  let fixture: ComponentFixture<BestsalerProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestsalerProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestsalerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
