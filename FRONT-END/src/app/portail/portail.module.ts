import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './components/profil/profil.component';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { SharedWrapperComponent } from '../shared/components/shared-wrapper/shared-wrapper.component';

const portailRoutes: Routes = [
  {
    path: '',
    component:SharedWrapperComponent,
    children: [
      {
        path: 'profil',
        component: ProfilComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProfilComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(portailRoutes),
    SharedModule
  ]
})
export class PortailModule { }
