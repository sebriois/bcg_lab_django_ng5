import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ToastrModule} from "ngx-toastr";
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
import {LoginComponent} from './auth/login.component';
import {HomeComponent} from './home/home.component';
import {OrderListComponent} from './orders/order-list/order-list.component';
import {BudgetListComponent} from './budget-list/budget-list.component';
import {BudgetDetailComponent} from './budget-detail/budget-detail.component';
import {BudgetFilterFormComponent} from './budget-filter-form/budget-filter-form.component';
import { ProductQuantityFormComponent } from './product-quantity-form/product-quantity-form.component';

import {OutageService} from "./services/outage.service";
import {AlertService} from './alerts/alerts.service';
import {ProviderService} from './services/provider.service';
import {ProductService} from './services/product.service';
import {OrderService} from './services/order.service';
import {UserService} from './services/user.service';
import {TeamsService} from './services/teams.service';
import {AuthService} from './services/auth.service';
import {BudgetService} from './services/budgets.service';

import {AuthGuard} from './auth/auth.guard';
import {TokenInterceptor} from './auth/token.interceptor';
import {GroupByPipe} from './pipes/group-by.pipe';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { OutageComponent } from './outage/outage.component';
import { MenuComponent } from './menu/menu.component';

registerLocaleData(localeFr);

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
    GroupByPipe,
    OrderItemComponent,
    OrderDetailComponent,
    TeamsComponent,
    LoginComponent,
    HomeComponent,
    OrderListComponent,
    BudgetFilterFormComponent,
    BudgetListComponent,
    BudgetDetailComponent,
    ProductQuantityFormComponent,
    OutageComponent,
    MenuComponent,
  ],
  entryComponents: [
    ProviderFormComponent,
    ProductQuantityFormComponent
  ],
  imports: [
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    OutageService,
    AuthService,
    AuthGuard,
    AlertService,
    ProviderService,
    ProductService,
    BudgetService,
    OrderService,
    UserService,
    TeamsService,
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
