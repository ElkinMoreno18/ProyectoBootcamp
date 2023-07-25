import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupplierComponentComponent } from './supplier-component/supplier-component.component';
import { SupplierServiceService } from './services/supplier-service.service';
import { CustomerComponentComponent } from './customer-component/customer-component.component';
import { CustomerServiceService } from './services/customer-service.service';
import { ServiceComponentComponent } from './service-component/service-component.component';
import { ServiceServiceService } from './services/service-service.service';
import { OrderComponentComponent } from './order-component/order-component.component';
import { OrderServiceService } from './services/order-service.service';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ProductServiceService } from './product-component/product-service.service';
import { CategoryComponentComponent } from './category-component/category-component.component';
import { CategoryServiceService } from './services/category-service.service';
import { DiscountComponentComponent } from './discount-component/discount-component.component';
import { DiscountServiceService } from './services/discount-service.service';
import { BrandComponentComponent } from './brand-component/brand-component.component';
import { BrandServiceService } from './services/brand-service.service';
import { LoginComponentComponent } from './login-component/login-component.component';
import { LoginServiceService } from './services/login-service.service';
import { AdministratorComponentComponent } from './administrator-component/administrator-component.component';
import { AdministratorServiceService } from './services/administrator-service.service';
import { MainComponentComponent } from './main-component/main-component.component';
import { CityServiceService } from './services/city-service.service';
import { PaymentMethodServiceService } from './services/payment-method-service.service';
import { CustomModalCompoComponent } from './custom-modal-compo/custom-modal-compo.component';


@NgModule({
  declarations: [
    AppComponent,
    SupplierComponentComponent,
    CustomerComponentComponent,
    ServiceComponentComponent,
    OrderComponentComponent,
    ProductComponentComponent,
    CategoryComponentComponent,
    DiscountComponentComponent,
    BrandComponentComponent,
    LoginComponentComponent,
    AdministratorComponentComponent,
    MainComponentComponent,
    CustomModalCompoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],

  providers: [
    SupplierServiceService,
    CustomerServiceService,
    OrderServiceService,
    ServiceServiceService,
    CategoryServiceService,
    BrandServiceService,
    ProductServiceService,
    DiscountServiceService,
    LoginServiceService,
    AdministratorServiceService,
    CityServiceService,
    PaymentMethodServiceService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
