import { Component } from '@angular/core';
import { Product } from '../../../admin/components/product/shared/models/products';
import { Router } from '@angular/router';
import { PanierService } from '../../services/panier/panier.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
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
   this.panierService.RequiredRefresh.subscribe(()=>{
    this.getAllPanier()
    this.calculateTotal()
   })
  }
 
  calculateTotal() {
    this.totalPrice = this.products.reduce((acc, product) => {
      return acc + (product.quantity * product.price);
    }, 0);
  }
  getAllPanier(){
    this.products = this.panierService.getCart();
  }

}
