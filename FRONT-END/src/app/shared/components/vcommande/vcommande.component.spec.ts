import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcommandeComponent } from './vcommande.component';

describe('VcommandeComponent', () => {
  let component: VcommandeComponent;
  let fixture: ComponentFixture<VcommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VcommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
