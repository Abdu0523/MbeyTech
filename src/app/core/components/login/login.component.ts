import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  errorMessage: undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const phoneNumber = this.loginForm.value.phoneNumber;
    const password = this.loginForm.value.password;

    this.authService.login(phoneNumber, password).subscribe(
      () => {
        // Rediriger l'utilisateur vers une autre page après la connexion réussie
      },
      (error: any) => {
        this.errorMessage = error.message;
      }
    );
  }
}
