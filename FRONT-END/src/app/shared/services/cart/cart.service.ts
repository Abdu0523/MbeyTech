import { Injectable } from '@angular/core';
import { OrderDetail } from './../../interfaces/order-detail';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _refreshrequired = new Subject<void>();
  get RequiredRefresh() {
    return this._refreshrequired;
  }

  constructor() { }

  addToCart(orderDetail: OrderDetail): void {
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as OrderDetail[];
    let existingItem = cartItems.find(item => item.product[0]._id === orderDetail.product[0]._id);
    if (existingItem) {
      existingItem.quantity += orderDetail.quantity;
    } else {
      cartItems.push(orderDetail);
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.RequiredRefresh.next();
  }

  removeFromCart(productId: string): Observable<any> {
    return new Observable(subscriber => {
      let cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as OrderDetail[];
      let updatedCart = cartItems.filter(item => item.product[0]._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      subscriber.next({ message: 'Product removed from cart successfully' });
      subscriber.complete();
      this.RequiredRefresh.next();
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as OrderDetail[];
    let orderDetail = cartItems.find(item => item.product[0]._id === productId);
    if (orderDetail) {
      orderDetail.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      this.RequiredRefresh.next();
    }
  }

  getCart(): OrderDetail[] {
    return JSON.parse(localStorage.getItem('cart') || '[]') as OrderDetail[];
  }

  clearCart(): Observable<any> {
    return new Observable(subscriber => {
      localStorage.removeItem('cart');
      subscriber.next({ message: 'Cart cleared successfully' });
      subscriber.complete();
      this.RequiredRefresh.next();
    });
  }

  isProductInCart(productId: string): boolean {
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as OrderDetail[];
    return cartItems.some(item => item.product[0]._id === productId);
  }
}
