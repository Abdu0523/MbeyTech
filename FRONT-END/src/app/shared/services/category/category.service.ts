import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';
import { catchError, Observable, of, tap } from 'rxjs';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'http://localhost:3000/api/';
  enpdoint = 'categories';
  serviceEndpoint = 'services';
  url = this.apiUrl + this.enpdoint;
  serviceUrl = this.apiUrl + this.serviceEndpoint;

  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url).pipe(
      tap((categories) => console.log('all category : ', categories)),
      catchError((error) => {
        console.error('Error from get all categories :', error);
        return of([]);
      })
    );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.url}/${id}`).pipe(
      tap((category) => console.log('category : ', category)),
      catchError((error) => {
        console.error('Error from get category by id : ', error);
        return of();
      })
    );
  }

  getCategoryByName(nom: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.url}/categoryByName/${nom}`).pipe(
      tap((category) => console.log('category : ', category)),
      catchError((error) => {
        console.error('Error from get category by name : ', error);
        return of();
      })
    );
  }

  addCategory(nom: string, image: File): Observable<Category> {
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('image', image);

    return this.httpClient.post<Category>(this.url, formData).pipe(
      tap(
        (category) => console.log('category added : ', category),
        catchError((error) => {
          console.error('Error from add category : ', error);
          return of();
        })
      )
    );
  }

  updateCategory(_id: string,nom: string, image: File): Observable<Category> {
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('image', image);
    console.log('category updated form:', formData);
    return this.httpClient.put<Category>(`${this.url}/${_id}`, formData).pipe(
      tap((result) => console.log('category form',result)),
      catchError((error) => {
        console.error('Error from update category : ', error);
        return of();
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete<Category>(`${this.url}/${id}`).pipe(
      tap((result) => console.log(result)),
      catchError((error) => {
        console.error('Error from update category : ', error);
        return of();
      })
    );
  }

  
}
