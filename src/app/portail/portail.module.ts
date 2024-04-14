import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderClientComponent } from './shared/components/header/header.component';
import { NavbarClientComponent } from './shared/components/navbar/navbar.component';
import { ProfilComponent } from './components/profil/profil.component';
import { CartComponent } from './components/cart/cart.component';

const portailRoutes: Routes = [
  {
    path: '',
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
    HeaderClientComponent,
    NavbarClientComponent,
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(portailRoutes)
  ]
})
export class PortailModule { }
