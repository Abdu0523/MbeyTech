import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from '../../../shared/services/panier/panier.service';
import { Product } from '../../../admin/components/product/shared/models/products';

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
    private panierService: PanierService
  ) {}
  ngOnInit() {
   this.getAllPanier()
   this.calculateTotal()

  }
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


}
