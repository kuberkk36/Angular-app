import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path:'dashboard',
    loadChildren:() => import('../app/dashboard/dashboard.module').then(module=>module.DashboardModule)
  },
  {
    path:'home',
    loadChildren:() =>import('../app/home/home.module').then(module=>module.HomeModule)
  },
  {
    path:'product',
    loadChildren:() => import('../app/add-product/add-product.module').then(module=>module.AddProductModule)
  },
  {
    path:'orders',
    loadChildren:() => import('../app/order/order.module').then(module =>module.OrderModule)
  },
  {
    path:'view-orders',
    loadChildren:() => import('../app/view-order/view-order.module').then(module =>module.ViewOrderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
