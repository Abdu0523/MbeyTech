import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { User } from '../../../../../shared/interfaces/user';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/persons';
  public refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/getAll`)
     .pipe(
      catchError(this.handleError)
    );
  }

  getbyIdUsers(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`)
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

  updateUser(user: any, id: number): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError(this.handleError)
    );
  }
  // updateUser(id: number, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
  //     catchError(this.handleError)
  //   );
  // }

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
