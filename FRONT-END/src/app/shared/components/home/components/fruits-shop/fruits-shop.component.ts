import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../interfaces/category';
import { CategoryService } from '../../../../services/category/category.service';
import { ServiceProductService } from '../../../../../admin/components/product/shared/services/service-product.service';
import { Product } from '../../../../../admin/components/product/shared/models/products';
import { PanierService } from '../../../../services/panier/panier.service';

@Component({
  selector: 'app-fruits-shop',
  templateUrl: './fruits-shop.component.html',
  styleUrl: './fruits-shop.component.css',
})
export class FruitsShopComponent implements OnInit {
  public categories!: Category[];
  public productsByCategory!: Product[];
  public products!: Product[];
  public category!: Category;
  public product!: Product;

  constructor(
    private categoryService: CategoryService,
    private productService: ServiceProductService,
    private panierService:  PanierService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }
  
  isProductInCart(productId: string): boolean {
    return this.panierService.isProductInCart(productId);
 }
 removeFromCart(productId:string){
  this.panierService.removeFromCart(productId)

    }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors du chargement des catégories :',
          error
        );
      }
    );
  }
  addToPanier(product:Product){
this.panierService.addToCart(product)

  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors du chargement des produits :',
          error
        );
      }
    );
  }

  getProductsByCategory(id: any) {
    this.productService.getProductsByCategory(id).subscribe(
      (productsByCategory: Product[]) => {
        this.productsByCategory = productsByCategory;
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors du chargement des produits par categorie :',
          error
        );
      }
    );
  }
  getProducts() {
    return this.productService.getAllProducts().subscribe({
      next: (productsByCategory: Product[]) => {
        this.productsByCategory = productsByCategory;
      },
      error: (error) => {
        console.error(
          'Une erreur est survenue lors du chargement des produits par categorie :',
          error
        );
      },
      complete: () => {
        console.log('Chargement des produits par categorie terminé');
      }
    });
  }

  getCategoryById(id: string) {
    this.categoryService.getCategoryById(id).subscribe(
      (category: Category) => {
        this.category = category;
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors de la récupération de la categorie :',
          error
        );
      }
    );
  }
}
