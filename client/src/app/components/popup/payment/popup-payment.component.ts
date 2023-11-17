import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoansService } from 'src/app/services/loan/loans.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-popup-payment',
  templateUrl: './popup-payment.component.html',
  styleUrls: ['./popup-payment.component.css']
})
export class PopupPaymentComponent implements OnInit {
  inputdata: any;
  paymentData: any = [];
  dueValue: number = this.paymentData.monto_cuota;

  valorCuota: number = 0;
  numeroCuotas: number = 1;
  cuotas: number = 0;
  cuotasOptions: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      private ref: MatDialogRef<PopupPaymentComponent>,
        private builder: FormBuilder,
        private LoansService: LoansService,
        private paymentService: PaymentService,
        ){
  }
  ngOnInit(): void {
    this.inputdata = this.data;
    
    console.log(this.inputdata.id);
    if(this.inputdata.id > 0 ){
      this.setPopupPaymentData(this.inputdata.id)
      
    }
  }

  paymentForm = this.builder.group({
    prestamo_id: this.builder.control(''),
    cuotas: this.builder.control(1),
    fecha_pago: this.builder.control(''),
    monto_pago: this.builder.control(0),
    proximo_pago: this.builder.control('')
  })

  setPopupPaymentData(id: any){
    this.paymentService.getPayment(id)
    .subscribe({
      next: payment => {
        if(Array.isArray(payment) && payment.length > 0){
          this.paymentData = payment[0];
          console.log(this.paymentData.cuotas);
          console.log(this.paymentData);
          this.cuotasOptions = this.generateRange(this.paymentData.cuotas);
          this.cuotas = this.paymentData.cuotas;
          this.paymentForm.patchValue({
            prestamo_id: this.inputdata.id,
            fecha_pago: this.currentDate(),
            monto_pago: this.paymentData.monto_cuota,
            proximo_pago: this.addDays()
          })

          const cuotasControl = this.paymentForm.get('cuotas');

          if (cuotasControl) {
            cuotasControl.valueChanges.subscribe((newValue) => {
              const cuotasValue = newValue ? +newValue : 0;
              this.updateTotalAmount(this.paymentData.monto_cuota, cuotasValue);
            });
          }
        }
      }
    })
  }

  updateTotalAmount(dueValue: number, cuotaCount: number): void {
    const totalAmount = dueValue * cuotaCount;
    console.log(dueValue)
    console.log(this.numeroCuotas)
    this.paymentForm.controls['monto_pago'].setValue(totalAmount)
  }

  savePayment(){
    this.paymentService.savePayment(this.paymentForm.value)
    .subscribe({
      next: res =>{
        Swal.fire({
          icon: 'success',
          title: 'Pago registrado correctamente',
          showConfirmButton: false,
          timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
        });
        this.closePopup();
      }
    })
  }

  closePopup(){
    this.ref.close();
  }

  addDays(){
    const date = new Date(this.currentDate())
    date.setDate(date.getDate() + 15)
    const año = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  currentDate(){
    const date = new Date();
    const año = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  generateRange(count: number): number[] {
    return Array.from({ length: count }, (number, i) => i + 1);
  }

}
