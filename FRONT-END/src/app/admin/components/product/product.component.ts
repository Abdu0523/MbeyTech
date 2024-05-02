import { Component, OnInit } from '@angular/core';
import { ServiceProductService } from './shared/services/service-product.service';
import { Products } from './shared/models/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  public products: Products[] = []; 

  constructor(private productService: ServiceProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => this.products = products);
  }

  onProductAdded(): void {
    this.loadProducts(); // Mettre à jour la liste des produits après l'ajout
  }
}
