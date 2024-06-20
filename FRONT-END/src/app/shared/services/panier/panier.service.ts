import { Injectable } from '@angular/core';
import { Product } from '../../../admin/components/product/shared/models/products';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private _refreshrequired = new Subject<void>();
  get RequiredRefresh() {
    return this._refreshrequired;
  }

  constructor() { }
  addToCart(product: Product): void {
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.RequiredRefresh.next()
  }
  removeFromCart(productId: string): Observable<any> {
    return new Observable(subscriber => {
      let cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
      let updatedCart = cartItems.filter(item => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      subscriber.next({ message: 'Product removed from cart successfully' });
      subscriber.complete();
      this.RequiredRefresh.next();
    });
  }
  isProductInCart(productId: string): boolean {
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
     return cartItems.some(item => item._id === productId);
  }

  getCart(): Product[] {
    return JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
  }

  clearCart(): Observable<any> {
    return new Observable(subscriber => {
      localStorage.removeItem('cart');
      subscriber.next({ message: 'Product removed from cart successfully' });
      subscriber.complete();
      this.RequiredRefresh.next();
    });

  }

  updateQuantity(productId: string, quantity: number): void {
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    let product = cartItems.find(item => item._id === productId);
    if (product) {
      product.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      this.RequiredRefresh.next();
    }
  }
}
