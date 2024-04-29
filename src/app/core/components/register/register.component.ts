import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    username: '',
    phone: '',
    userType: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.http.post<any>('http://localhost:3000/register', this.formData)
      .subscribe(
        response => {
          console.log(response);
          // Rediriger l'utilisateur vers une autre page après l'inscription réussie
        },
        error => {
          console.error(error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
  }
}
