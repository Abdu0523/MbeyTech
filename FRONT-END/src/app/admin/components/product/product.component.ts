import { Component, OnInit } from '@angular/core';
import { ServiceProductService } from './shared/services/service-product.service';
import { Products } from './shared/models/products';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  public products: Products[] = []; 

  constructor(private productService: ServiceProductService, private authService : AuthService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.productService.getproductByUser(userId).subscribe(products => {
        this.products = products;
      });
    } else {
      console.error('Utilisateur non connecté');
    }
  }

  onProductAdded(): void {
    this.loadProducts(); // Mettre à jour la liste des produits après l'ajout
  }
}