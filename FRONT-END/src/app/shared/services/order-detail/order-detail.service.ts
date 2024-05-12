import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { OrderDetail } from '../../interfaces/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiUrl = 'http://localhost:3000/api/order-details';

  constructor(private http: HttpClient) { }

  addOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(`${this.apiUrl}`, orderDetail).pipe(
      catchError((error) => {
        console.error('Error from addOrderDetail : ', error);
        return of();
      })
    );;
  }
}
