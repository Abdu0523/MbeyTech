import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/home/slider/slider.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderClientComponent } from './shared/components/header/header.component';
import { NavbarClientComponent } from './shared/components/navbar/navbar.component';

const clientRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    HeaderClientComponent,
    NavbarClientComponent,
    SliderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(clientRoutes)
  ]
})
export class ClientModule { }
