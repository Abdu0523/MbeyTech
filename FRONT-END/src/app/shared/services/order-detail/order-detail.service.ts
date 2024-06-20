import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { OrderDetail } from '../../interfaces/order-detail';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  private apiUrl = 'http://localhost:3000/api/order-details';

  constructor(private http: HttpClient) {}

  addOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(`${this.apiUrl}`, orderDetail).pipe(
      catchError((error) => {
        console.error('Error from addOrderDetail : ', error);
        return of();
      })
    );
  }

  getOrderDetailsForOrder(orderId?: string): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(
      `${this.apiUrl}/order/${orderId}`
    );
  }

  getOrderDetailsForOrderAndUser(orderId?: string, userId?: string): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(
      `${this.apiUrl}/order/${orderId}/${userId}`
    );
  }

  updateOrderDetail(
    orderDetailId: string,
    orderDetailData: Partial<OrderDetail>
  ): Observable<OrderDetail> {
    return this.http.put<OrderDetail>(
      `${this.apiUrl}/${orderDetailId}`,
      orderDetailData
    );
  }

  deleteOrderDetail(orderDetailId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${orderDetailId}`
    );
  }
}
