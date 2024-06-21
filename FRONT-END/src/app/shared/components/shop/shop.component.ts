import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category/category.service';
import { PanierService } from '../../services/panier/panier.service';
import { ServiceProductService } from '../../../admin/components/product/shared/services/service-product.service';
import { Product } from '../../../admin/components/product/shared/models/products';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public categories!: Category[];
  public category!: Category;

  public products!: Product[];
  public paginatedProducts!: Product[];

  // Pagination variables
  public currentPage: number = 1;
  public itemsPerPage: number = 6;
  public totalItems: number = 0;

  constructor(
    private categoryService: CategoryService,
    private panierService: PanierService,
    private productService: ServiceProductService,
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    this.getProducts();
    this.panierService.RequiredRefresh.subscribe(() => {
      this.loadCategories();
      this.loadProducts();
      this.getProducts();
    });
  }

  addToPanier(product: Product) {
    this.panierService.addToCart(product);
  }

  getProducts() {
    return this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.totalItems = products.length;
        this.paginateProducts();
      },
      error: (error) => {
        console.error('Une erreur est survenue lors du chargement des produits par categorie :', error);
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
        console.error('Une erreur est survenue lors du chargement des catégories :', error);
      }
    );
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.totalItems = products.length;
        this.paginateProducts();
      },
      (error) => {
        console.error('Une erreur est survenue lors du chargement des produits :', error);
      }
    );
  }

  getCategoryById(id: string) {
    this.categoryService.getCategoryById(id).subscribe(
      (category: Category) => {
        this.category = category;
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération de la categorie :', error);
      }
    );
  }

  getCategoryNameById(cat: Category) {
    this.categoryService.getCategoryById(cat._id).subscribe(
      (category: Category) => {
        return category.nom;
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération de la categorie :', error);
      }
    );
  }

  isProductInCart(productId: string): boolean {
    return this.panierService.isProductInCart(productId);
  }

  removeFromCart(productId: string) {
    this.panierService.removeFromCart(productId).subscribe({
      next: () => {},
      error: (error) => {}
    });
  }

  // Pagination methods
  paginateProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
    console.log(`Paginating products: startIndex=${startIndex}, endIndex=${endIndex}, paginatedProducts=`, this.paginatedProducts);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage = page;
    this.paginateProducts();
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.paginateProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProducts();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
