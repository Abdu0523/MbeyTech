import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../interfaces/category';
import { CategoryService } from '../../../../services/category/category.service';
import { ServiceProductService } from '../../../../../admin/components/product/shared/services/service-product.service';
import { Product } from '../../../../../admin/components/product/shared/models/products';
import { CartService } from '../../../../services/cart/cart.service';
import { Products } from '../../../../../admin/components/product/shared/models/products';
import { OrderDetail } from '../../../../interfaces/order-detail';
import { Order } from '../../../../interfaces/order';
import { OrderDetailService } from '../../../../services/order-detail/order-detail.service';
import { OrderService } from '../../../../services/order/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fruits-shop',
  templateUrl: './fruits-shop.component.html',
  styleUrl: './fruits-shop.component.css',
})
export class FruitsShopComponent {
  public categories: Category[] = [];
  public productsByCategory: Product[] = [];
  public products: Product[] = [];
  public category!: Category;
  public product!: Product;
  public productIdToAdd!: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ServiceProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    this.cartService.RequiredRefresh.subscribe(() => {
      this.loadCategories();
      this.loadProducts();
    });
  }

  isProductInCart(productId: string): boolean {
    return this.cartService.isProductInCart(productId);
  }
  
  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {},
      error: (error) => {},
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
  addToPanier(product: Product) {
    const orderDetail: OrderDetail = {
      product: [product],
      quantity: 1,
      unitPrice: product.price,
      status: '',
    };
    this.cartService.addToCart(orderDetail);
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
      },
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

  toggleProductStatus(product: Product): void {
    product.status = !product.status; // Inverse le statut du produit
    // Appelez le service pour mettre à jour le produit dans la base de données
    this.productService.updateProduct(product._id, product).subscribe(
      () => {
        console.log(`Statut du produit "${product.name}" mis à jour.`);
      },
      (error) => {
        console.error(
          'Erreur lors de la mise à jour du statut du produit :',
          error
        );
        // Rétablissez le statut original du produit en cas d'erreur
        product.status = !product.status;
      }
    );
  }


}
