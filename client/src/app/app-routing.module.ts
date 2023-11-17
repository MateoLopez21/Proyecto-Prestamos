import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from './components/customer-list/customer-list.component'
import { CustomerFormComponent } from './components/customer-form/customer-form.component'
import { LoansComponent } from './components/loans/loan-list.component'
import { PaymentListComponent } from './components/payments/payment-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';



const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
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
  },
  {path: 'prestamos',
  component: LoansComponent
  },
  {
    path: 'pagos',
    component: PaymentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
