import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from './components/customer-list/customer-list.component'
import { CustomerFormComponent } from './components/customer-form/customer-form.component'

const routes: Routes = [
  {
    path: 'clientes',
    component: CustomerListComponent
  },
  {
    path: 'clientes/agregar',
    component: CustomerFormComponent
  },
  {
    path:'clientes/edit/:id',
    component: CustomerFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
