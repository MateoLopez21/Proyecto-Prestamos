import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  paymentsData: any = [];
  dataSource: any;
  displayedColumns: string[] = ['Id del Préstamo', 'Cliente', 'Fecha de Pago', 'Valor Pagado'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private paymentService: PaymentService) { }
  ngOnInit(): void {
    this.getPayments();
  }
  

  getPayments(){
    this.paymentService.getpayments()
    .subscribe({
      next: data =>{
        this.paymentsData = data
        this.dataSource = new MatTableDataSource<Payment>(this.paymentsData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  formateMonto(monto: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'decimal', currency: 'COP' }).format(monto);
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
}
