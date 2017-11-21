import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProvidersComponent } from './providers/providers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { HistoryComponent } from './history/history.component';
import { AlertsComponent } from './alerts/alerts.component';
import {AlertService} from './alerts/alerts.service';
import { ProviderFormComponent } from './provider-form/provider-form.component';
import { ProviderService } from './provider.service';


@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    OrdersComponent,
    ProductsComponent,
    BudgetsComponent,
    HistoryComponent,
    AlertsComponent,
    ProviderFormComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    AlertService,
    ProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
