import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProvidersComponent} from './providers/providers.component';
import {ProductsComponent} from './products/products.component';
import {OrdersComponent} from './orders/orders.component';
import {CartComponent} from './orders/cart/cart.component';
import {ValidationComponent} from './orders/validation/validation.component';

const routes: Routes = [
  {
    path: 'providers',
    component: ProvidersComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: {
      'title': 'Produits'
    }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    // outlet: 'orders',
    // canActivate: [AuthGuard],
    children: [
      {path: 'cart', component: CartComponent, data: {'title': 'Panier'}},
      {path: 'validation', component: ValidationComponent, data: {'title': 'Commandes à valider'}},
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
