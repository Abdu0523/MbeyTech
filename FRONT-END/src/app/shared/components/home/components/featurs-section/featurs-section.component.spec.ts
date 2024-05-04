import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatursSectionComponent } from './featurs-section.component';

describe('FeatursSectionComponent', () => {
  let component: FeatursSectionComponent;
  let fixture: ComponentFixture<FeatursSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatursSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatursSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
