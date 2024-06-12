import { Component } from '@angular/core';
import { Order } from '../../../shared/interfaces/order';
import { OrderService } from '../../../shared/services/order/order.service';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: Order[] = [];
  order!: Order;
  // ordersUser: Order[] = [];
  user!: User;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user.userType === 'admin') {
      this.getAllOrders();
    } else {
      this.getOrderForUser();
    }
    console.log('orders : ',this.orders);
  }

  getAllOrders() {
    this.orderService
      .getAllOrders()
      .subscribe((orders) => (this.orders = orders));
  }

  getOrderId(order: Order) {
    this.order = order;
  }

  getOrderForUser() {
    this.orderService
      .getOrdersByUser(this.user._id)
      .subscribe((orders) => (this.orders = orders));
  }
}
