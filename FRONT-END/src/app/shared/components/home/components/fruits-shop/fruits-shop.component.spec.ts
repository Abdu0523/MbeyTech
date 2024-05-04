import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitsShopComponent } from './fruits-shop.component';

describe('FruitsShopComponent', () => {
  let component: FruitsShopComponent;
  let fixture: ComponentFixture<FruitsShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FruitsShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FruitsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
