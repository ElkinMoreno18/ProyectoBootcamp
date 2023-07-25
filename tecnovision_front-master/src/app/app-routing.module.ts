import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestrictRouteService as restrict } from './restrict-route.service';
import { CustomerComponentComponent } from './customer-component/customer-component.component';
import { SupplierComponentComponent } from './supplier-component/supplier-component.component';
import { OrderComponentComponent } from './order-component/order-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { CategoryComponentComponent } from './category-component/category-component.component';
import { BrandComponentComponent } from './brand-component/brand-component.component';
import { DiscountComponentComponent } from './discount-component/discount-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { AdministratorComponentComponent } from './administrator-component/administrator-component.component';
import { ServiceComponentComponent } from './service-component/service-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  {
    path: 'customer',
    children: [{ path: ':operation', component: CustomerComponentComponent, canActivate: [restrict] }]
  },
  {
    path: 'main', component: MainComponentComponent, canActivate: [restrict], children: [
      {
        path: 'supplier',
        children: [
          { path: ':operation', component: SupplierComponentComponent, canActivate: [restrict] },
          { path: ':operation/:id', component: SupplierComponentComponent, canActivate: [restrict] },
        ],
      },
      {
        path: 'product',
        children: [
          { path: ':operation', component: ProductComponentComponent, canActivate: [restrict] },
          { path: ':operation/:id', component: ProductComponentComponent, canActivate: [restrict] },
        ],
      },
      {
        path: 'customer',
        children: [
          { path: ':operation', component: CustomerComponentComponent, canActivate: [restrict] },
          { path: ':operation/:id', component: CustomerComponentComponent, canActivate: [restrict] },
        ],
      },
      {
        path: 'order',
        children: [
          { path: ':operation', component: OrderComponentComponent, canActivate: [restrict] },
          { path: ':operation/:id', component: OrderComponentComponent, canActivate: [restrict] },
        ]
      },
      {
        path: 'category',
        children: [
          { path: ':operation', component: CategoryComponentComponent, canActivate: [restrict] },
          { path: ':operation/:id', component: CategoryComponentComponent, canActivate: [restrict] },
        ],
      },
      {
        path: 'brand',
        children: [
          { path: ':operation', component: BrandComponentComponent, canActivate: [restrict] },
          { path: ':operation/:id', component: BrandComponentComponent, canActivate: [restrict] },
        ],
      },
      {
        path: 'discount',
        children: [
          { path: ':operation', component: DiscountComponentComponent, canActivate: [restrict] },
          { path: ':operation/:id', component: DiscountComponentComponent, canActivate: [restrict] },
        ],
      },
      {
        path: 'administrator',
        children: [
          { path: ':operation', component: AdministratorComponentComponent, canActivate: [restrict] },
          { path: ':operation/:id', component: AdministratorComponentComponent, canActivate: [restrict] },
        ],
      },
      {
        path: 'service',
        children: [
          { path: ':operation', component: ServiceComponentComponent, canActivate: [restrict] },
          { path: ':operation/:id', component: ServiceComponentComponent, canActivate: [restrict] },
        ],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
