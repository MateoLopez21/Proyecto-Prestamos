import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { CustomersService } from 'src/app/services/customer/customers.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoansService } from 'src/app/services/loan/loans.service';


@Component({
  selector: 'app-popup-loan',
  templateUrl: './popup-loan.component.html',
  styleUrls: ['./popup-loan.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: { parse: { dateInput: 'YYYY-MM-DD' }, display: { dateInput: 'YYYY-MM-DD', monthYearLabel: 'YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'YYYY' } } }
  ]
})
export class PopupLoanComponent implements OnInit {
  totalPagar: number = 0;
  numeroCuotas: number = 0;
  valorCuota: number = 0;

  customers: any = []
  selectedDate: Date | null = null;
  formatedDate: string | null = null;
  inputdata: any;
  closeMessage = 'Closed popup';
  clienteSeleccionado: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private ref: MatDialogRef<PopupLoanComponent>, private customerService: CustomersService, private builder: FormBuilder, private LoansService: LoansService){
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    this.getCustomers();
  }

  // Función para redondear al millar
  calculateValueDues(totalPagar: number, cuotas: number): number {
    const resultado = totalPagar / cuotas;
    const redondeadoAlMillar = Math.ceil(resultado / 1000) * 1000;
    this.valorCuota = redondeadoAlMillar;
    this.myForm.controls['monto_cuota'].setValue(redondeadoAlMillar);
    return redondeadoAlMillar;
  }

  saveLoan(){
    console.log(this.myForm.value);
    this.LoansService.saveLoan(this.myForm.value)
    .subscribe({
      next: loan => {
        this.closePopup();
      }
    })
  }

  currentDate(){
    const date = new Date();
    const año = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  formatDate(date: Date | null): string {
    this.formatedDate = moment(date).format('YYYY-MM-DD')
    return date ? moment(date).format('YYYY-MM-DD') : '';
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe({
      next: customers => {
        this.customers = customers
      },
      error: error => console.log(error)
    })
  }

  myForm = this.builder.group({
    cliente_id: this.builder.control(''),
    monto: this.builder.control(0),
    total_pagar: this.builder.control(0),
    fecha_inicio: [this.currentDate()],
    proximo_pago: this.builder.control(''),
    monto_cuota: this.builder.control(0),
    cuotas: this.builder.control(0),
    resta: this.builder.control(''),

  })

  closePopup(){
    this.ref.close();
  }
  

}
