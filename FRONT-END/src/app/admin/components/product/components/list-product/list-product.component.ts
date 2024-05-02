import { Component, Input } from '@angular/core';
import { Products } from '../../shared/models/products';
import { ServiceProductService } from '../../shared/services/service-product.service';
declare var $ : any;

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  @Input() products: Products[] = [];
  //products: Products[] = [];

  constructor(private productService: ServiceProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }

}
