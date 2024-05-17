import { Component, OnInit } from '@angular/core';
import { ServiceProductService } from '../../../../../admin/components/product/shared/services/service-product.service';
import { Product } from '../../../../../admin/components/product/shared/models/products';

@Component({
  selector: 'app-vesitable-shop',
  templateUrl: './vesitable-shop.component.html',
  styleUrl: './vesitable-shop.component.css',
})
export class VesitableShopComponent implements OnInit {
  products: Product[] = [];

  responsiveOptions: any[] | undefined;

  constructor(private productService: ServiceProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }
}
