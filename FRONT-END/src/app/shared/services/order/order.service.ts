import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    const formData = new FormData();
    formData.append('order', order.person);
    return this.http.post<Order>(this.apiUrl, order).pipe(
      catchError((error) => {
        console.error('Error from createOrder : ', error);
        return of();
      })
    );
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error from getOrderForCustomer : ', error);
        return of([]);
      })
    );
  }

  getOrderForCustomer(customerId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${customerId}`).pipe(
      catchError((error) => {
        console.error('Error from getOrderForCustomer : ', error);
        return of();
      })
    );
  }

  getUnvalidatedOrdersForCustomer(customerId: string): Observable<Order> {
    return this.http
      .get<Order>(`${this.apiUrl}/unvalidated/${customerId}`)
      .pipe(
        catchError((error) => {
          console.error('Error from getUnvalidatedOrdersForCustomer : ', error);
          return of();
        })
      );
  }

  updateOrder(orderId: string, orderData: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, orderData);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${orderId}`);
  }
}
