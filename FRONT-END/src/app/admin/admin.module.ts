import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AdminWrapperComponent } from './components/admin-wrapper/admin-wrapper.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/category/components/modal/add-category/add-category.component';
import { DeleteCategoryComponent } from './components/category/components/modal/delete-category/delete-category.component';
import { UpdateCategoryComponent } from './components/category/components/modal/update-category/update-category.component';
import { ChampComponent } from './components/champ/champ.component';
import { ChampactionComponent } from './components/champ/champaction/champaction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderDetailsComponent } from './components/orders/components/order-details/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddProductComponent } from './components/product/components/add-product/add-product.component';
import { ListProductComponent } from './components/product/components/list-product/list-product.component';
import { UpdateProductComponent } from './components/product/components/update-product/update-product.component';
import { ProductComponent } from './components/product/product.component';
import { RolesComponent } from './components/roles/roles.component';
import { AddUserComponent } from './components/users/components/add-user/add-user.component';
import { DetailUserComponent } from './components/users/components/detail-user/detail-user.component';
import { ItemUserComponent } from './components/users/components/item-user/item-user.component';
import { UpdatUserComponent } from './components/users/components/updat-user/updat-user.component';
import { UsersComponent } from './components/users/users.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { authGuard } from '../core/guards/auth.guard';
import {DataTablesModule} from 'angular-datatables';
import { OrderActionsComponent } from './components/orders/components/orders-actions/order-actions/order-actions.component'

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminWrapperComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        data: { userType: ['admin', 'agriculteur', 'bailleur'] },
      },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [authGuard],
        data: { userType: ['admin', 'agriculteur'] },
      },
      {
        path: 'product',
        component: ProductComponent,
        canActivate: [authGuard],
        data: { userType: ['admin', 'agriculteur'] },
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard],
        data: { userType: ['admin'] },
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [authGuard],
        data: { userType: ['admin'] },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [authGuard],
        data: { userType: ['admin', 'agriculteur'] },
      },
      {
        path: 'champs',
        component: ChampComponent,
        canActivate: [authGuard],
        data: { userType: ['admin', 'bailleur'] },
      },
      {
        path: 'champcls/:id',
        component: ChampactionComponent,
        canActivate: [authGuard],
        data: { userType: ['admin', 'bailleur'] },
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
    ChampactionComponent,
    OrderDetailsComponent,
    OrderActionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DataTablesModule
  ],
})
export class AdminModule {}
