import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProvidersComponent} from './providers/providers.component';
import {ProductsComponent} from './products/products.component';
import {OrdersComponent} from './orders/orders.component';
import {CartComponent} from './orders/cart/cart.component';
import {ValidationComponent} from './orders/validation/validation.component';
import {TeamsComponent} from "./teams/teams.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./auth/login.component";
import {HomeComponent} from "./home/home.component";
import {OrderListComponent} from "./orders/order-list/order-list.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'providers',
    component: ProvidersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: {
      'title': 'Produits'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'teams',
    component: TeamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    // outlet: 'orders',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'cart',
        component: CartComponent,
        data: {'title': 'Panier'}
      },
      {
        path: 'validation',
        component: ValidationComponent,
        data: {'title': 'Commandes à valider'}
      },
      {
        path: 'list',
        component: OrderListComponent,
      },
      // {path: 'reception', component: ReceptionComponent},
      // {path: 'do-reception', component: PerformReceptionComponent},
      // {path: 'reception-local-provider', component: LocalReceptionComponent},
      {
        path: '',
        redirectTo: 'cart',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
