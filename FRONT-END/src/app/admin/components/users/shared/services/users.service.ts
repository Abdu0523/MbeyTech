import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/persons';


  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/getAll`)
     .pipe(
      catchError(this.handleError)
    );
  }
  
  addUser(body: any): Observable <Users> {
    return this.http.post<Users>(`${this.apiUrl}/create`, body)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
