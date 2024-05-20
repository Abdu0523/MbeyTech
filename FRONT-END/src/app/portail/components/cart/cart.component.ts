import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailService } from '../../../shared/services/order-detail/order-detail.service';
import { OrderService } from '../../../shared/services/order/order.service';
import { OrderDetail } from '../../../shared/interfaces/order-detail';
import { Order } from '../../../shared/interfaces/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  orderDetails: OrderDetail[] = [];
  public customId: string = "663d3eca576baba30d52d489";

  constructor(
    private router: Router,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUnvalidatedOrdersForCustomer();
  }
  navigateToCheckout() {
    this.router.navigate(['/checkout']);
    console.log('checkout tap');
  }

  getUnvalidatedOrdersForCustomer() {
    this.orderService
      .getUnvalidatedOrdersForCustomer(this.customId)
      .subscribe((order: Order) => {
        this.getOrderDetailsForCart(order._id);
      });
  }

  getOrderDetailsForCart(orderId: string = '') {
    // Vous devrez passer l'ID de la commande du panier du client à cette méthode
    // const orderId = 'ID_de_la_commande_du_panier_du_client';

    this.orderDetailService.getOrderDetailsForOrder(orderId).subscribe({
      next: (orderDetails) => {
        this.orderDetails = orderDetails;
      },
      error: () => {
        console.error('Error fetching order details for cart.');
      },
    });
  }
}
