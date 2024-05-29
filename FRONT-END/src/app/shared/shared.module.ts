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
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HeroComponent } from './components/home/components/hero/hero.component';
import { FeatursSectionComponent } from './components/home/components/featurs-section/featurs-section.component';
import { FruitsShopComponent } from './components/home/components/fruits-shop/fruits-shop.component';
import { FeatursComponent } from './components/home/components/featurs/featurs.component';
import { VesitableShopComponent } from './components/home/components/vesitable-shop/vesitable-shop.component';
import { BannerSectionComponent } from './components/home/components/banner-section/banner-section.component';
import { BestsalerProductComponent } from './components/home/components/bestsaler-product/bestsaler-product.component';
import { FactComponent } from './components/home/components/fact/fact.component';
import { TastimonialComponent } from './components/home/components/tastimonial/tastimonial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { ChampclComponent } from './components/champcl/champcl.component';



const sharedRoutes: Routes = [
  {
    path: '',
    component: SharedWrapperComponent,
    children: [
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
        path: 'champ',
        component: ChampclComponent,
      },
      {
        path: 'shop-detail/:id',
        component: ShopDetailComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
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
    CheckoutComponent,
    HeroComponent,
    FeatursSectionComponent,
    FruitsShopComponent,
    FeatursComponent,
    VesitableShopComponent,
    BannerSectionComponent,
    BestsalerProductComponent,
    FactComponent,
    TastimonialComponent,
    ChampclComponent
  ],
  imports: [CommonModule, RouterModule.forChild(sharedRoutes), CarouselModule, ButtonModule, TagModule,FormsModule,ReactiveFormsModule],
  exports: [SingleHeaderComponent,FooterComponent,NavbarComponent]
})
export class SharedModule {}
