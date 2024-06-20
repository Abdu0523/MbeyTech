import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAll`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  archiveProduct(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/archive/${id}`, {});
  }

  
  unarchiveProduct(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/unarchive/${id}`, {});
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${categoryId}`).pipe(
      tap((products) => console.log("getProductsByCategory : ",products)),
      catchError((error) => {
        console.error('Error from getProductsByCategory :', error);
        return of([]);
      })
    );
  }

  getproductByUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`).pipe( 
      tap((products) => console.log("getProductByUser : ", products)),
      catchError((error) => {
        console.error('Error from getProductsByCategory :', error);
        return of([]);
      })
    )
  }

}
