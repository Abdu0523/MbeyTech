import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetail } from '../../../shared/interfaces/order-detail';
import Swal from 'sweetalert2';
import { OrderDetailService } from '../../../shared/services/order-detail/order-detail.service';
import { OrderService } from '../../../shared/services/order/order.service';
import { Order } from '../../../shared/interfaces/order';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public orderDetails!: OrderDetail[];
  public totalPrice: number = 1;
  public livraison: number = 40000;
  public customId: string = '663d3eca576baba30d52d489';
  public cart: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit() {
    this.getAllPanier();
    this.calculateTotal();
    this.cartService.cartItems$.subscribe(() => {
      this.getAllPanier();
      this.calculateTotal();
    });
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('cart:', this.cart);
  }

  navigateToCheckout() {
    this.router.navigate(['/portail/checkout']);
  }

  incrementQuantity(orderDetail: OrderDetail) {
    orderDetail.quantity = Math.max(orderDetail.quantity + 1, 1);
    this.cartService.updateQuantity(orderDetail.product[0]._id, orderDetail.quantity);
    this.calculateTotal();
  }

  decrementQuantity(orderDetail: OrderDetail) {
    orderDetail.quantity = Math.max(orderDetail.quantity - 1, 1);
    this.cartService.updateQuantity(orderDetail.product[0]._id, orderDetail.quantity);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.orderDetails.reduce((acc, orderDetail) => {
      return acc + (orderDetail.quantity * orderDetail.unitPrice);
    }, 0);
  }

  getAllPanier() {
    this.orderDetails = this.cartService.getCart();
  }

  removeFromCart(productId: string) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-la !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(productId);
      }
    });
  }

  alertError() {
    Swal.fire({
      title: 'Oops!',
      text: 'Un problème s\'est produit lors de la suppression du produit.',
      icon: 'error'
    });
  }

  alertSuccess() {
    Swal.fire({
      title: 'Supprimé !',
      text: 'Le produit a été retiré.',
      icon: 'success'
    });
  }
}
