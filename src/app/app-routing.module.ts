import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: '',
  loadChildren:  () => import('./shared/shared.module').then(m => m.SharedModule) 
},
{
  path: 'portail',
  loadChildren:  () => import('./portail/portail.module').then(m => m.PortailModule) 
},
{
  path: 'admin',
  loadChildren:  () => import('./admin/admin.module').then(m => m.AdminModule) 
},
{
  path: '',
  loadChildren:  () => import('./core/core.module').then(m => m.CoreModule) 
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
