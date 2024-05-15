import { Component } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category/category.service';
import { PanierService } from '../../services/panier/panier.service';
import { ServiceProductService } from '../../../admin/components/product/shared/services/service-product.service';
import { Product } from '../../../admin/components/product/shared/models/products';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  public categories!: Category[];
  public categories2!: Category[];
  public category!: Category;


  public products!: Product[];
  public productsByCategory!: Product[];

  constructor(
    private categoryService: CategoryService,
    private panierService:  PanierService,
    private productService: ServiceProductService,
  ) {}
  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    this.getProducts()

  }
  addToPanier(product:Product){
    this.panierService.addToCart(product)
      }

  getProducts() {
    return this.productService.getAllProducts().subscribe({
      next: (productsByCategory: Product[]) => {
        this.productsByCategory = productsByCategory;
        console.log("fall34", this.productsByCategory[0])
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

  getCategoryNameById(cat: Category) {
    this.categoryService.getCategoryById(cat._id).subscribe(
      (category: Category) => {
        return category.nom
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors de la récupération de la categorie :',
          error
        );
      }
    );
  }
  isProductInCart(productId: string): boolean {
    console.log("test--",this.panierService.isProductInCart(productId) )
    return this.panierService.isProductInCart(productId);
  }
  removeFromCart(productId:string){
    this.panierService.removeFromCart(productId)

      }
}
