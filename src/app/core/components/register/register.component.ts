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
         
        },
        error => {
          console.error(error);

        }
      );
  }
}
