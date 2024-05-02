import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedWrapperComponent } from './components/shared-wrapper/shared-wrapper.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { SingleHeaderComponent } from './components/single-header/single-header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const sharedRoutes: Routes = [
  {
    path: '',
    component: SharedWrapperComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'shop-detail',
        component: ShopDetailComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    ShopComponent,
    ContactComponent,
    SharedWrapperComponent,
    FooterComponent,
    NavbarComponent,
    CartComponent,
    ShopDetailComponent,
    SingleHeaderComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(sharedRoutes)],
})
export class SharedModule {}
