import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProvidersComponent} from './providers/providers.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductsComponent} from './products/products.component';
import {BudgetsComponent} from './budgets/budgets.component';
import {HistoryComponent} from './history/history.component';
import {AlertsComponent} from './alerts/alerts.component';
import {OrderFilterPipe} from './orders/orders.pipe';
import {OrderItemComponent} from './orders/order-item/order-item.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {CartComponent} from './orders/cart/cart.component';
import {ValidationComponent} from './orders/validation/validation.component';
import {ProviderFormComponent} from './provider-form/provider-form.component';
import {TeamsComponent} from './teams/teams.component';

import {AlertService} from './alerts/alerts.service';
import {ProviderService} from './providers/provider.service';
import {ProductService} from './products/product.service';
import {OrderService} from './orders/order.service';
import {UserService} from "./users/user.service";
import {TeamsService} from "./teams/teams.service";
import { LoginComponent } from './auth/login.component';
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import { HomeComponent } from './home/home.component';
import {CookieXSRFStrategy, XSRFStrategy} from "@angular/http";
import {TokenInterceptor} from "./auth/token.interceptor";
import { OrderListComponent } from './orders/order-list/order-list.component';


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
    OrderFilterPipe,
    OrderItemComponent,
    OrderDetailComponent,
    TeamsComponent,
    LoginComponent,
    HomeComponent,
    OrderListComponent
  ],
  entryComponents: [ProviderFormComponent],
  imports: [
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertService,
    ProviderService,
    ProductService,
    OrderService,
    UserService,
    TeamsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    /*{
        provide: XSRFStrategy,
        useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
