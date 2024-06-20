import { Component } from '@angular/core';
import {
  Product,
  Products,
} from '../../../admin/components/product/shared/models/products';
import { Router } from '@angular/router';
import { PanierService } from '../../../shared/services/panier/panier.service';
import Swal from 'sweetalert2';
import { OrderService } from '../../../shared/services/order/order.service';
import { OrderDetailService } from '../../../shared/services/order-detail/order-detail.service';
import { Order } from '../../../shared/interfaces/order';
import { OrderDetail } from '../../../shared/interfaces/order-detail';
import { User } from '../../../shared/interfaces/user';
import { CartService } from '../../../shared/services/cart/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WavePaymentService } from '../../../shared/services/wave-payment/wave-payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  public products!: Product[];
  public quantity: number = 1;
  public totalPrice: number = 1;
  public livraison: number = 40000;
  public orderDetails: OrderDetail[] = [];
  public user!: User;
  public cart: any;
  checkoutForm: FormGroup;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private fb: FormBuilder,
    private wavePaymentService: WavePaymentService
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.checkoutForm = this.fb.group({
      nomComplet: [this.user.nomComplet, [Validators.required, Validators.minLength(2)]],
      adresse: [this.user.adresse, Validators.required],
      region: ['', Validators.required],
      ville: ['', Validators.required],
      mobile: [
        '+221'+this.user.phone,
        [
          Validators.required,
          Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$'),
        ],
      ],
      email: [this.user.email, [Validators.required, Validators.email]],
      notes: [''],
      paymentMethod: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getAllPanier();
    this.calculateTotal();
    this.cartService.RequiredRefresh.subscribe(() => {
      this.getAllPanier();
      this.calculateTotal();
    });
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  get formControls() {
    return this.checkoutForm.controls;
  }

  calculateTotal() {
    this.totalPrice = this.orderDetails.reduce((acc, orderDetail) => {
      return acc + orderDetail.quantity * orderDetail.unitPrice;
    }, 0);
  }
  getAllPanier() {
    this.orderDetails = this.cartService.getCart();
  }
  navigateToVcommande() {
    this.router.navigate(['/vcommande']);
    console.log('checkout tap');
  }
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.showAlert();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.alertError();
      },
    });
  }
  // removeFromCart(productId: string) {
  //   Swal.fire({
  //     title: 'Êtes-vous sûr ?',
  //     text: 'Vous ne pourrez pas revenir en arrière !',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Oui, supprimez-la !'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.cartService.removeFromCart(productId).subscribe({
  //         next: () => {
  //           this.showAlert()
  //         },
  //         error: (error) => {
  //          this.alertError()
  //         }
  //       });
  //     }
  //   });
  // }
  alertError() {
    Swal.fire({
      title: 'Oops!',
      text: 'Un problème s est produit lors de la suppression du produit.',
      icon: 'error',
    });
  }
  showAlert() {
    Swal.fire({
      title: 'Commande ajoute avec succès!',
      text: 'Vous avez cliqué sur le bouton pour explorer les autres produits',
      icon: 'success',
    });
  }
  alertSuccess() {
    Swal.fire({
      title: 'Supprimé !',
      text: 'Le produit a été retiré.',
      icon: 'success',
    });
  }

  validateCommande() {
    if (this.checkoutForm.valid) {
      const newOrder: Order = {
        person: [this.user]
      }
      this.orderService.createOrder(newOrder).subscribe(
        (newOrder: Order) => {
          console.log('newOrder : ', newOrder);
          this.cart.forEach((element: OrderDetail) => {
            const orderDetail: OrderDetail = {
              order: [newOrder],
              product: [element.product[0]],
              quantity: element.quantity,
              unitPrice: element.unitPrice,
            };
            this.addOrderDetail(orderDetail);
          });
          this.clearCart();
        },
        (error) => {
          console.error('Une erreur est survenue lors createOrder :', error);
        }
      );
      console.log('Form Submitted!', this.checkoutForm.value);
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  addOrderDetail(orderDetail: OrderDetail) {
    this.orderDetailService.addOrderDetail(orderDetail).subscribe(
      () => {
        console.log('Produit ajouté à la commande avec succès.');
      },
      (error) => {
        console.error('Une erreur est survenue lors addOrderDetail :', error);
      }
    );
  }

  getOrderDetailsForCart(orderId: string = '') {
    this.orderDetailService.getOrderDetailsForOrder(orderId).subscribe({
      next: (orderDetails) => {
        this.orderDetails = orderDetails;
        console.log('detai first', this.orderDetails);
      },
      error: () => {
        console.error('Error fetching order details for cart.');
      },
    });
  }

  getUnvalidatedOrdersForCustomer() {
    this.orderService
      .getUnvalidatedOrdersForCustomer(this.user._id)
      .subscribe((order: Order) => {
        this.getOrderDetailsForCart(order._id);
      });
  }

  deleteOrderDetail(orderId: string = '') {
    this.orderDetailService.deleteOrderDetail(orderId).subscribe({
      next: (orderDetails) => {
        this.orderDetails = orderDetails;
        console.log(this.orderDetails);
        this.getUnvalidatedOrdersForCustomer();
      },
      error: () => {
        console.error('Error deleting order details for cart.');
      },
    });
  }
}
