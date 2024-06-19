import { Component, Input } from '@angular/core';
import { Products } from '../../shared/models/products';
import { ServiceProductService } from '../../shared/services/service-product.service';
import { AuthService } from '../../../../../core/services/auth.service';
declare var $ : any;

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  @Input() products: Products[] = [];
  confirmProductId!: string ;

  constructor(private productService: ServiceProductService, private authService : AuthService) { }

  ngOnInit(): void {
    //this.loadProducts();
    this.loadUserProducts();
  }

  loadUserProducts(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.productService.getproductByUser(userId).subscribe(products => {
        this.products = products;
      });
    } else {
      console.error('Utilisateur non connecté');
    }
  }

  /*
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }
  */

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadUserProducts();
    });
  }


  confirmDelete(productId: string): void {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      this.deleteProduct(productId);
    }
  }
  
/*
  openDeleteConfirmationModal(product: Products): void {
    this.confirmProductId = product._id;
    $('#deleteConfirmationModal').modal('show');
  }
*/
 

}
