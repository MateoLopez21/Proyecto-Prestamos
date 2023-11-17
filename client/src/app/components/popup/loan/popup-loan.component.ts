import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { CustomersService } from 'src/app/services/customer/customers.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoansService } from 'src/app/services/loan/loans.service';
import Swal from 'sweetalert2';



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
  editData: any = [];
  closeMessage = 'Closed popup';
  clienteSeleccionado: any;
  edit: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      private ref: MatDialogRef<PopupLoanComponent>,
       private customerService: CustomersService,
        private builder: FormBuilder, private LoansService: LoansService
        ){
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    
    if(this.inputdata.id > 0 ){
      this.setPopupData(this.inputdata.id);
    }
    this.getCustomers();
  }

  setPopupData(id: any){ 
    this.LoansService.getLoan(id)
    .subscribe({
      next: loan => {
        this.edit = true
        if (Array.isArray(loan) && loan.length > 0) {
          this.editData = loan[0];
          this.myForm.setValue({
            cliente_id: this.editData.idCliente,
            monto: this.editData.monto,
            total_pagar: this.editData.total_pagar,
            fecha_inicio: this.editData.fecha_inicio,
            proximo_pago: this.editData.proximo_pago,
            monto_cuota: this.editData.monto_cuota,
            cuotas: this.editData.cuotas,
            resta:this.editData.resta
            }) 
        } else {
          console.log('No se encontraron datos del cliente');
        }
      }
    })
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
        Swal.fire({
          icon: 'success',
          title: 'Préstamo registrado correctamente',
          showConfirmButton: false,
          timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
        });
        this.closePopup();
      }
    })
  }

  editLoan(id: any){
    this.LoansService.updateLoan(id, this.myForm.value)
    .subscribe({
      next: res => {
        Swal.fire({
          icon: 'success',
          title: 'Información actualizada con éxito',
          showConfirmButton: false,
          timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
        });
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
    cliente_id: this.builder.control(0),
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
