import { Component, OnInit } from '@angular/core';
import { ServiceProductService } from '../../../admin/components/product/shared/services/service-product.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../admin/components/product/shared/models/products';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css'
})
export class ShopDetailComponent implements OnInit {

  product: Products | undefined;
  categories: Category[] = [];
  products: Products[]= []; 
  selectedCategoryId: string = ""; // Stocker l'ID de la catégorie sélectionnée
  public relatedProducts: Products[] = [];
  
 
  constructor (private productService : ServiceProductService,
     private route : ActivatedRoute,
     private categoryService: CategoryService,
      ){
    
  }



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      console.log("l''id du produit :", productId);
      if (productId) {
        this.productService.getProductById(productId).subscribe(
          (product: Products) => {
            this.product = product;
          },
          (error) => {
            console.error('Une erreur est survenue lors du chargement du produit :', error);
          }
        );
      }
    })

    this.loadCategories();
  };

  loadProduct(productId: string) {
    this.productService.getProductById(productId).subscribe(
      (product: Products) => {
        this.product = product;
        this.loadRelatedProducts(product.category);
      },
      (error) => {
        console.error('Une erreur est survenue lors du chargement du produit :', error);
      }
    );
  }

  loadRelatedProducts(categoryId: string) {
    this.productService.getProductsByCategory(categoryId).subscribe(
      (relatedProducts: Products[]) => {
        this.relatedProducts = relatedProducts.filter(relatedProduct => relatedProduct._id !== this.product!._id);
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors du chargement des produits similaires :',
          error
        );
      }
    );
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Une erreur est survenue lors du chargement des catégories :', error);
      }
    );
  }

}

  


