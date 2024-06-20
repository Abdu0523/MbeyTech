import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './components/profil/profil.component';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { SharedWrapperComponent } from '../shared/components/shared-wrapper/shared-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authGuard } from '../core/guards/auth.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';

const portailRoutes: Routes = [
  {
    path: '',
    component:SharedWrapperComponent,
    children: [
      {
        path: 'profil',
        component: ProfilComponent,
        canActivate: [authGuard],
        data: { userType: ['acheteur'] },
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [authGuard],
        data: { userType: ['acheteur'] },
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProfilComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(portailRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PortailModule { }
