import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl: string = 'http://localhost:3000/api/persons/login';

  constructor(private http: HttpClient) {}

  /*
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.loginUrl, { email, password })
      .pipe(catchError(this.handleError));
  }
  */

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.loginUrl, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('userId', response.user._id); // Stocker l'ID utilisateur
          localStorage.setItem('token', response.token);
        }),
        catchError(this.handleError)
      );
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = "Une erreur inconnue s'est produite";
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      console.log(error)
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    errorMessage = `Erreur: ${error.error.message}`;
    return throwError(errorMessage);
  }
}
