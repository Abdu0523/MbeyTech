import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../components/product/product.component';
import { AddCategoryComponent } from '../components/category/components/modal/add-category/add-category.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { ListProductComponent } from '../components/product/components/list-product/list-product.component';
import { AddProductComponent } from '../components/product/components/add-product/add-product.component';
import { UpdateProductComponent } from '../components/product/components/update-product/update-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from '../components/category/category.component';
import { UpdateCategoryComponent } from '../components/category/components/modal/update-category/update-category.component';
import { DeleteCategoryComponent } from '../components/category/components/modal/delete-category/delete-category.component';



@NgModule({
  declarations: [
    ProductComponent,
    AddCategoryComponent,
    OrdersComponent,
    ListProductComponent,
    AddProductComponent,
    UpdateProductComponent,
    CategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
   
  ]
})
export class SharedModule {  }
