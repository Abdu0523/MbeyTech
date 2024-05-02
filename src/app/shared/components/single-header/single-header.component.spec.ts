import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHeaderComponent } from './single-header.component';

describe('SingleHeaderComponent', () => {
  let component: SingleHeaderComponent;
  let fixture: ComponentFixture<SingleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
