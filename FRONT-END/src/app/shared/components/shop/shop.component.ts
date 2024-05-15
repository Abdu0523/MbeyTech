import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { Products } from '../../../admin/components/product/shared/models/products';
import { CategoryService } from '../../services/category/category.service';
import { ServiceProductService } from '../../../admin/components/product/shared/services/service-product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  public products : Products[] = [];
  public categories : Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ServiceProductService, 
  ){}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(){
    this.productService.getAllProducts().subscribe(
      (products : Products[]) => {
        this.products = products
      },
      (error)=> {
        console.error(
          'Une erreur est survenue lors du chargement des produits :',
          error
        )
      }
    );
  }

  loadCategories(){
    this.categoryService.getAllCategories().subscribe(
      (categories : Category[]) => {
        this.categories = categories
      },
      (error) => {
        console.error(
          'Une erreur est survenue lors du chargement des categories :',
          error
        )
      }
    )
  }

  

  
  
 }
