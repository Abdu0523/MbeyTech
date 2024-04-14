import { Component } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { createProduct, createProducts } from '../../../shared/data/product.generator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  public productCache!: Product[];
  public products!: Product[];
  public product: Product = createProduct();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.products = createProducts(100);
    this.productCache = this.products;
  }
}
