import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDetail } from './../../interfaces/order-detail';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<OrderDetail[]>(this.getCartFromLocalStorage());
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  private getCartFromLocalStorage(): OrderDetail[] {
    return JSON.parse(localStorage.getItem('cart') || '[]') as OrderDetail[];
  }

  private saveCartToLocalStorage(cartItems: OrderDetail[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  addToCart(orderDetail: OrderDetail): void {
    let cartItems = this.getCartFromLocalStorage();
    let existingItem = cartItems.find(item => item.product[0]._id === orderDetail.product[0]._id);
    if (existingItem) {
      existingItem.quantity += orderDetail.quantity;
    } else {
      cartItems.push(orderDetail);
    }
    this.saveCartToLocalStorage(cartItems);
    this.cartItemsSubject.next(cartItems); // Met à jour le BehaviorSubject
  }

  removeFromCart(productId: string): void {
    let cartItems = this.getCartFromLocalStorage();
    let updatedCart = cartItems.filter(item => item.product[0]._id !== productId);
    this.saveCartToLocalStorage(updatedCart);
    this.cartItemsSubject.next(updatedCart);
  }

  updateQuantity(productId: string, quantity: number): void {
    let cartItems = this.getCartFromLocalStorage();
    let orderDetail = cartItems.find(item => item.product[0]._id === productId);
    if (orderDetail) {
      orderDetail.quantity = quantity;
      this.saveCartToLocalStorage(cartItems);
      this.cartItemsSubject.next(cartItems); // Met à jour le BehaviorSubject
    }
  }

  getCart(): OrderDetail[] {
    return this.getCartFromLocalStorage();
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartItemsSubject.next([]); // Met à jour le BehaviorSubject avec un tableau vide
  }

  isProductInCart(productId: string): boolean {
    let cartItems = this.getCartFromLocalStorage();
    return cartItems.some(item => item.product[0]._id === productId);
  }
}
