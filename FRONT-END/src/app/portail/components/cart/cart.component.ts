import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from '../../../shared/services/panier/panier.service';
import { Product } from '../../../admin/components/product/shared/models/products';
import Swal from 'sweetalert2';
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
  public products!: Product[];
  public quantity: number = 1;
  public totalPrice: number = 1;
  public livraison:number = 40000;


  constructor(
    private router: Router,
    private panierService: PanierService,
  
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {}
  ngOnInit() {
   this.getAllPanier()
   this.calculateTotal()
   this.getUnvalidatedOrdersForCustomer();
   this.panierService.RequiredRefresh.subscribe(()=>{
    this.getAllPanier()
    this.calculateTotal()
   })

  }
  orderDetails: OrderDetail[] = [];
  public customId: string = '663d3eca576baba30d52d489';

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
    console.log("checkout tap")
}
incrementQuantity(product: Product) {
  product.quantity = Math.max(product.quantity + 1, 1);
  this.calculateTotal()
}
decrementQuantity(product: Product) {
  product.quantity = Math.max(product.quantity - 1, 1);
  this.calculateTotal()
}
calculateTotal() {
  this.totalPrice = this.products.reduce((acc, product) => {
    return acc + (product.quantity * product.price);
  }, 0);
}
getAllPanier(){
  this.products = this.panierService.getCart();
  this.quantity = 1
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
      this.panierService.removeFromCart(productId).subscribe({
        next: () => {
          this.alertSuccess()
        },
        error: (error) => {
         this.alertError()
        }
      });
    }
  });
}
alertError(){
  Swal.fire({
    title: 'Oops!',
    text: 'Un problème s est produit lors de la suppression du produit.',
    icon: 'error'
  });
}
showAlert() {
  Swal.fire({
    title: "produits mise à jour avec succès !",
    text: "Vous avez cliqué sur le bouton !",
    icon: "success"
  });
}
alertSuccess(){
  Swal.fire({
    title: 'Supprimé !',
    text: 'Le produit a été retiré.',
    icon: 'success'
  });
}


  getUnvalidatedOrdersForCustomer() {
    this.orderService
      .getUnvalidatedOrdersForCustomer(this.customId)
      .subscribe((order: Order) => {
        this.getOrderDetailsForCart(order._id);
      });
  }

  getOrderDetailsForCart(orderId: string = '') {
    this.orderDetailService.getOrderDetailsForOrder(orderId).subscribe({
      next: (orderDetails) => {
        this.orderDetails = orderDetails;
        console.log(this.orderDetails);
      },
      error: () => {
        console.error('Error fetching order details for cart.');
      },
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
