import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { AfficheProduitComponent } from './component/accueil/affiche-produit/affiche-produit.component';
import { CategoryComponent } from './component/accueil/category/category.component';

import { TemoinClientComponent } from './component/accueil/temoin-client/temoin-client.component';
import { PartenerNewsletterComponent } from './component/accueil/partener-newsletter/partener-newsletter.component';
import { FooterComponent } from './component/footer/footer.component';
import { AboutComponent } from './component/about/about.component';
import { FormsModule } from '@angular/forms';
import { BlogComponent } from './component/blog/blog.component';
import { BlogSingleComponent } from './component/blog-single/blog-single.component';
import { ContactComponent } from './component/contact/contact.component';
import { ShopComponent } from './component/shop/shop.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { SingleProductComponent } from './component/single-product/single-product.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CategoryComponent,
    AfficheProduitComponent,
    TemoinClientComponent,
    PartenerNewsletterComponent,
    FooterComponent,
    AboutComponent,
    BlogComponent,
    BlogSingleComponent,
    ContactComponent,
    ShopComponent,
    WishlistComponent,
    SingleProductComponent,
    CartComponent,
    CheckoutComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
