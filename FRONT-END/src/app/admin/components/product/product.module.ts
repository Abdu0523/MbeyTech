import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ListProductComponent } from './components/list-product/list-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ProductComponent } from './product.component';
import { CategoryComponent } from '../category/category.component';
import { AddCategoryComponent } from '../category/components/modal/add-category/add-category.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    
    
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductModule { }
