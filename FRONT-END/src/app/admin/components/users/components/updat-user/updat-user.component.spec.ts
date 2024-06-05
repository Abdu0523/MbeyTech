import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatUserComponent } from './updat-user.component';

describe('UpdatUserComponent', () => {
  let component: UpdatUserComponent;
  let fixture: ComponentFixture<UpdatUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
