import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule], // Importer ReactiveFormsModule pour les tests de formulaire
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with username and password fields', () => {
    expect(component.loginForm.get('phoneNumber')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should require phoneNumber and password', () => {
    const form = component.loginForm;
    form.setValue({ phoneNumber: '', password: '' });
    expect(form.valid).toBeFalsy();

    form.setValue({ phoneNumber: '123456789', password: '' });
    expect(form.valid).toBeFalsy();

    form.setValue({ phoneNumber: '', password: 'password' });
    expect(form.valid).toBeFalsy();

    form.setValue({ phoneNumber: '123456789', password: 'password' });
    expect(form.valid).toBeTruthy();
  });

  // Vous pouvez ajouter d'autres tests selon vos besoins
});
