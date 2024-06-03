import { Component } from '@angular/core';
import { Order } from '../../../shared/interfaces/order';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {
    
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllOrders();
    console.log(this.orders);
  }

  getAllOrders(){
    this.orderService.getAllOrders()
      .subscribe(orders => this.orders = orders);
  }
}
