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
import { DataTablesModule } from 'angular-datatables';
import { PopupLoanComponent } from './components/popup/popup-loan/popup-loan.component';
import { DateFormatPipe } from './date-format.pipe'


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CustomerFormComponent,
    CustomerListComponent,
    LoansComponent,
    PopupLoanComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    DataTablesModule
  ],
  providers: [
    CustomersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
