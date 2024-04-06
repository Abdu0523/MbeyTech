import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemoinClientComponent } from './temoin-client.component';

describe('TemoinClientComponent', () => {
  let component: TemoinClientComponent;
  let fixture: ComponentFixture<TemoinClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemoinClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemoinClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
