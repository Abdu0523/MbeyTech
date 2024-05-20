import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../interfaces/category';
import { CategoryService } from '../../../../services/category/category.service';
import { ServiceProductService } from '../../../../../admin/components/product/shared/services/service-product.service';
import { Product } from '../../../../../admin/components/product/shared/models/products';
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
export class FruitsShopComponent implements OnInit {
  public categories: Category[] = [];
  public productsByCategory: Product[] = [];
  public products: Product[] = [];
  public category!: Category;
  public product!: Product;
  public customerId: string = "663d3eca576baba30d52d489";
 

  constructor(
    private categoryService: CategoryService,
    private productService: ServiceProductService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
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
        console.log('products : ', this.products);
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

  getCategoryById(id: string) {
    this.categoryService.getCategoryById(id).subscribe(
      (category: Category) => {
        this.category = category;
        return category;
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors de la récupération de la categorie :',
          error
        );
      }
    );
  }


  addToCart(productId: string, customerId: string) {
    // Vérifier si une commande existe pour le client
    this.orderService.getUnvalidatedOrdersForCustomer(customerId).subscribe(
      (order: Order) => {
        console.log('====================================');
        console.log(order);
        console.log('====================================');
        if (!order) {
          // Si aucune commande n'existe, créer une nouvelle commande
          this.orderService
            .createOrder({ person: customerId })
            .subscribe(
              (newOrder: Order) => {
                console.log('newOrder : ', newOrder);
                // Ajouter le produit au panier avec l'ID de la nouvelle commande
                const orderDetail: OrderDetail = {
                  order: newOrder._id,
                  product: productId,
                  quantity: 1,
                  unitPrice: 1,
                };
                this.addOrderDetail(orderDetail);
              },
              (error) => {
                console.error(
                  'Une erreur est survenue lors createOrder :',
                  error
                );
              }
            );
        } else {
          // Si une commande existe, ajouter simplement le produit au panier avec l'ID de la commande existante
          
          const orderDetail: OrderDetail = {
            order: order._id,
            product: productId,
            quantity: 0,
            unitPrice: 0,
            status: '',
          };
          this.addOrderDetail(orderDetail);
        }
      },
      (error) => {
        console.error('Une erreur est survenue lors addToCart :', error);
      }
    );
  }

  addOrderDetail(orderDetail: OrderDetail) {
    this.orderDetailService.addOrderDetail(orderDetail).subscribe(
      () => {
        console.log('Produit ajouté au panier avec succès.');
      },
      (error) => {
        console.error('Une erreur est survenue lors addOrderDetail :', error);
      }
    );
  }
}
