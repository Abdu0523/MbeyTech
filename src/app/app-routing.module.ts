import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './component/accueil/accueil.component';
import { AboutComponent } from './component/about/about.component';
import { BlogComponent } from './component/blog/blog.component';
import { BlogSingleComponent } from './component/blog-single/blog-single.component';
import { ContactComponent } from './component/contact/contact.component';
import { ShopComponent } from './component/shop/shop.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { SingleProductComponent } from './component/single-product/single-product.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';

@NgModule({
  imports: [RouterModule.forRoot([

      {path: 'accueil', component: AccueilComponent },
      {path: '', redirectTo: 'accueil', pathMatch: 'full' },
      {path: 'about', component: AboutComponent },
      {path: 'blog', component: BlogComponent },
      {path: 'blog-single', component: BlogSingleComponent },
      {path: 'contact', component: ContactComponent },
      {path: 'shop', component: ShopComponent },
      {path: 'wishlist', component: WishlistComponent},
      {path: 'single-product', component: SingleProductComponent},
      {path: 'cart', component: CartComponent},
      {path: 'checkout', component: CheckoutComponent},

      {path: '**', redirectTo: 'accueil', pathMatch: 'full'}

      

    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
