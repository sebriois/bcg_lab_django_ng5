import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {PaginationModule} from 'ngx-bootstrap/pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProvidersComponent } from './providers/providers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { HistoryComponent } from './history/history.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertService } from './alerts/alerts.service';
import { ProviderFormComponent } from './provider-form/provider-form.component';
import { ProviderService } from './provider.service';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { CartComponent } from './orders/cart/cart.component';
import { ValidationComponent } from './orders/validation/validation.component';
import { StatusFilterPipe } from './orders/orders.pipe';
import { OrderItemComponent } from './orders/order-item/order-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    OrdersComponent,
    ProductsComponent,
    BudgetsComponent,
    HistoryComponent,
    AlertsComponent,
    ProviderFormComponent,
    CartComponent,
    ValidationComponent,
    StatusFilterPipe,
    OrderItemComponent,
    OrderDetailComponent
  ],
  imports: [
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    AlertService,
    ProviderService,
    ProductService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
