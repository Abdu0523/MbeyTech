import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedWrapperComponent } from './components/shared-wrapper/shared-wrapper.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { SingleHeaderComponent } from './components/single-header/single-header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PartnerComponent } from './components/home/components/partner/partner.component';
import { NewsletterComponent } from './components/home/components/newsletter/newsletter.component';
import { TestimonyComponent } from './components/home/components/testimony/testimony.component';
import { ProductsComponent } from './components/home/components/products/products.component';
import { SliderComponent } from './components/home/components/slider/slider.component';
import { ServicesComponent } from './components/home/components/services/services.component';
import { CategoryComponent } from './components/home/components/category/category.component';
import { HeaderComponent } from './components/header/header.component';

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
    ShopDetailComponent,
    SingleHeaderComponent,
    NotFoundComponent,
    PartnerComponent,
    NewsletterComponent,
    TestimonyComponent,
    ProductsComponent,
    SliderComponent,
    ServicesComponent,
    CategoryComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(sharedRoutes)],
})
export class SharedModule {}
