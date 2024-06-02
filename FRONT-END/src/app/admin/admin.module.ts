import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CategoryComponent } from './components/category/category.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { UsersComponent } from './components/users/users.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminWrapperComponent } from './components/admin-wrapper/admin-wrapper.component';
import { AddCategoryComponent } from './components/category/components/modal/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/category/components/modal/update-category/update-category.component';
import { DeleteCategoryComponent } from './components/category/components/modal/delete-category/delete-category.component';
import { RolesComponent } from './components/roles/roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './components/product/components/add-product/add-product.component';
import { ListProductComponent } from './components/product/components/list-product/list-product.component';
import { UpdateProductComponent } from './components/product/components/update-product/update-product.component';
import { ChampComponent } from './components/champ/champ.component';
import { UpdatUserComponent } from './components/users/components/updat-user/updat-user.component';
import { AddUserComponent } from './components/users/components/add-user/add-user.component';
import { DetailUserComponent } from './components/users/components/detail-user/detail-user.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ItemUserComponent } from './components/users/components/item-user/item-user.component';
import { ChampactionComponent } from './components/champ/champaction/champaction.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminWrapperComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'champs',
        component: ChampComponent,
      },
      {
        path: 'champcls/:id',
        component: ChampactionComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    NavbarComponent,
    CategoryComponent,
    SidebarComponent,
    PreloaderComponent,
    FooterComponent,
    ProductComponent,
    UsersComponent,
    OrdersComponent,
    DashboardComponent,
    AdminWrapperComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    RolesComponent,
    AddProductComponent,
    ListProductComponent,
    UpdateProductComponent,
    ChampComponent,
    AddUserComponent,
    UpdatUserComponent,
    DetailUserComponent,
    ItemUserComponent,
    ChampactionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule
  ],
})
export class AdminModule {}
