import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  returnUrl: string = '/';
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
       (response) => {
        if (response.token) {
          const user = response.user;
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(user));
          if (user.userType === 'admin' || user.userType === 'agriculteur' || user.userType === 'bailleur') {
            this.router.navigate(['/admin/dashboard']);
          } else if (user.userType === 'acheteur') {
            this.router.navigateByUrl(this.returnUrl);
          }
        }
      },
       (error) => {
        if (!error.success) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
    });
  }

  clearError(){
    this.errorMessage = '';
  }
}
