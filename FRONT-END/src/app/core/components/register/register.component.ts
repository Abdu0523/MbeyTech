import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../admin/components/users/shared/services/users.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  addUserForm: FormGroup;
  errorMessage!: string;
  returnUrl: string = '/';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addUserForm = this.formBuilder.group({
      nomComplet: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const newUser = this.addUserForm.value;
      this.userService.addUser(newUser).subscribe(
        (response) => {
          if (response.token) {
            const user = response.user;
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(user));
            if (
              user.userType === 'admin' ||
              user.userType === 'agriculteur' ||
              user.userType === 'bailleur'
            ) {
              this.router.navigate(['/admin/dashboard']);
            } else if (user.userType === 'acheteur') {
              this.router.navigate(['/portail/cart']);
            }
          }
        },
        (error) => {
          if (!error.success) {
            this.errorMessage =error.message;
          }
        }
      );
    }
  }
}
