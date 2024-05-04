import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesitableShopComponent } from './vesitable-shop.component';

describe('VesitableShopComponent', () => {
  let component: VesitableShopComponent;
  let fixture: ComponentFixture<VesitableShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VesitableShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VesitableShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
