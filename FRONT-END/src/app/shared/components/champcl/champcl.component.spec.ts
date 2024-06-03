import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampclComponent } from './champcl.component';

describe('ChampclComponent', () => {
  let component: ChampclComponent;
  let fixture: ComponentFixture<ChampclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChampclComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChampclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
