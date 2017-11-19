import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProvidersComponent} from './providers/providers.component';

const routes: Routes = [
  {
    path: 'providers',
    component: ProvidersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
