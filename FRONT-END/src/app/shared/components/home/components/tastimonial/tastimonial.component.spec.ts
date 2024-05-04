import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TastimonialComponent } from './tastimonial.component';

describe('TastimonialComponent', () => {
  let component: TastimonialComponent;
  let fixture: ComponentFixture<TastimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TastimonialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TastimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
