import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampactionComponent } from './champaction.component';

describe('ChampactionComponent', () => {
  let component: ChampactionComponent;
  let fixture: ComponentFixture<ChampactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChampactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChampactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
