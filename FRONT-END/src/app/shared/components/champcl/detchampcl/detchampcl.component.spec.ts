import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetchampclComponent } from './detchampcl.component';

describe('DetchampclComponent', () => {
  let component: DetchampclComponent;
  let fixture: ComponentFixture<DetchampclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetchampclComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetchampclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
