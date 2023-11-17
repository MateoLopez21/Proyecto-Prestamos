import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';


import { CustomersService } from './services/customer/customers.service';
import { LoansComponent } from './components/loans/loan-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material-module';
import { PopupLoanComponent } from './components/popup/loan/popup-loan.component';
import { DateFormatPipe } from './date-format.pipe';
import { PopupPaymentComponent } from './components/popup/payment/popup-payment.component'
import { ToastrModule } from 'ngx-toastr';
import { PaymentListComponent } from './components/payments/payment-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CustomerFormComponent,
    CustomerListComponent,
    LoansComponent,
    PopupLoanComponent,
    DateFormatPipe,
    PopupPaymentComponent,
    PaymentListComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Duración predeterminada de las notificaciones
      positionClass: 'toast-top-right', // Posición predeterminada de las notificaciones
      preventDuplicates: true, // Evitar mostrar notificaciones duplicadas
    })
  ],
  providers: [
    CustomersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
