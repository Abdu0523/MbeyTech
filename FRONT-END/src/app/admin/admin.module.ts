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

import { RolesComponent } from './components/roles/roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ],
  },
];

@NgModule({
  declarations: [
    NavbarComponent,
   
    SidebarComponent,
    PreloaderComponent,
    FooterComponent,
    UsersComponent,
   
    DashboardComponent,
    AdminWrapperComponent,
   
    
    RolesComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
