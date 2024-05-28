import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../interfaces/category';
import { CategoryService } from '../../../../services/category/category.service';
import { ServiceProductService } from '../../../../../admin/components/product/shared/services/service-product.service';
import { Product } from '../../../../../admin/components/product/shared/models/products';
import { PanierService } from '../../../../services/panier/panier.service';
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
export class FruitsShopComponent  {
  public categories: Category[] = [];
  public productsByCategory: Product[] = [];
  public products: Product[] = [];
  public category!: Category;
  public product!: Product;
  public customerId: string = "663d3eca576baba30d52d489";
  public productIdToAdd!: string;
  public orderDetails: OrderDetail[] = []

  constructor(
    private categoryService: CategoryService,
    private productService: ServiceProductService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private panierService : PanierService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    this.panierService.RequiredRefresh.subscribe(()=>{
      this.loadCategories();
      this.loadProducts();
     })

  }

  isProductInCart(productId: string): boolean {
    return this.panierService.isProductInCart(productId);
 }
 removeFromCart(productId:string){
  this.panierService.removeFromCart(productId).subscribe({
    next: () => {
    },
    error: (error) => {
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

  toggleProductStatus(product: Product): void {
    product.status = !product.status; // Inverse le statut du produit
    // Appelez le service pour mettre à jour le produit dans la base de données
    this.productService.updateProduct(product._id, product).subscribe(
      () => {
        console.log(`Statut du produit "${product.name}" mis à jour.`);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut du produit :', error);
        // Rétablissez le statut original du produit en cas d'erreur
        product.status = !product.status;
      }
    );
  }
  
  
  
 
  

  addToCart(product: Products, customerId: string) {
    // const productAlreadyInCart = this.orderDetails.some(detail => detail.product.some(p => p._id === product._id));
    // console.log('productAlreadyInCart',productAlreadyInCart)
    // if (productAlreadyInCart) {
    //   alert('Ce produit est déjà dans votre panier.');
    //   return;
    // }
    this.orderService.getUnvalidatedOrdersForCustomer(customerId).subscribe(
      (order: Order) => {
        if (!order) {
          this.orderService
            .createOrder({ person: customerId })
            .subscribe(
              (newOrder: Order) => {
                console.log('newOrder : ', newOrder);
                const orderDetail: OrderDetail = {
                  order: [newOrder],
                  product: [product],
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
          this.getOrderDetailsForCart(order._id)
          const orderDetail: OrderDetail = {
            order: [order],
            product: [product],
            quantity: 1,
            unitPrice: 1,
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
    this.orderDetailService.getOrderDetailsForOrder(orderDetail.order[0]._id).subscribe({
      next: (orderDetails) => {
        this.orderDetails = orderDetails;
        console.log('detai first',this.orderDetails);
        const productAlreadyInCart = this.orderDetails.some(detail => detail.product.some(p => p._id === orderDetail.product[0]._id));;
    console.log('productAlreadyInCart',productAlreadyInCart)
    if (productAlreadyInCart) {
      alert('Ce produit est déjà dans votre panier.');
      return;
    }
    this.orderDetailService.addOrderDetail(orderDetail).subscribe(
      () => {
        console.log('Produit ajouté au panier avec succès.');
      },
      (error) => {
        console.error('Une erreur est survenue lors addOrderDetail :', error);
      }
    );
      },
      error: () => {
        console.error('Error fetching order details for cart.');
      },
    });

  }
  getOrderDetailsForCart(orderId: string = '') {
    this.orderDetailService.getOrderDetailsForOrder(orderId).subscribe({
      next: (orderDetails) => {
        this.orderDetails = orderDetails;
        console.log('detai first',this.orderDetails);
      },
      error: () => {
        console.error('Error fetching order details for cart.');
      },
    });
  }
}
