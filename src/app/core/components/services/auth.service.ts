import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = ''; 

  constructor(private http: HttpClient) { }

  login(phoneNumber: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { phoneNumber, password });
  }
}
