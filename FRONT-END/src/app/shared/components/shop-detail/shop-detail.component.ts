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
  public product!: Products;
  public categories: Category[] = [];
  public relatedProducts: Products[] = [];
  public productsByCategory: Products[] = [];

  constructor(
    private productService: ServiceProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId: any = params.get('id');
      if (productId) {
        this.getProductDetails(productId);
      }
    });
    this.loadCategories();
  }

  getProductDetails(id: string) {
    this.productService.getProductById(id).subscribe(
      (product: Products) => {
        this.product = product;
        if (this.product.category.length > 0) {
          this.getProductsByCategory(this.product.category[0]._id);
        }
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération du produit :', error);
      }
    );
  }

  getProductsByCategory(id: any) {
    this.productService.getProductsByCategory(id).subscribe(
      (productsByCategory: Products[]) => {
        this.productsByCategory =  productsByCategory.filter(product => product._id !== this.product._id);
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors du chargement des produits par categorie :',
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

  


