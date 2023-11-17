import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from 'src/app/models/loan';
import { LoansService } from 'src/app/services/loan/loans.service';
import { PopupLoanComponent } from '../popup/loan/popup-loan.component';
import { PopupPaymentComponent } from '../popup/payment/popup-payment.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-loans',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoansComponent implements OnInit{

  loans: any = [];
  dataSource: any;
  displayedColumns: string[] = ['Id', 'Cliente', 'Prestó', 'Total a Pagar', 'Resta', 'Fecha de Inicio', 'Próximo Pago', 'Valor de la Cuota', 'Cuotas Restantes', 'Pagar', 'Acciones'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private loansService: LoansService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getLoans();
  }
  

  getLoans(){
    this.loansService.getLoans()
      .subscribe({
        next: loan => {
          this.loans = loan
          this.dataSource = new MatTableDataSource<Loan>(this.loans);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: error => console.log(error)
      })
  }

  paymentDues(id: any): void {
    this.openPaymentPopup(id, 'Nuevo Pago')
  }

  addLoan(){
    this.openLoanPopup(0, 'Registrar nuevo préstamo')
  }

  editLoan(id: any): void {
    console.log(id)
    this.openLoanPopup(id, 'Modificar Préstamo')
  }

  confirmDelete(id: any): void {
    const confirmDelete = confirm('¿Estás seguro que deseas eliminar el préstamo?')

    if (confirmDelete) {
      this.deleteLoan(id);
    }
  }

  deleteLoan(id: any): void {
    this.loansService.deleteLoan(id)
    .subscribe({
      next: res =>{
        Swal.fire({
          icon: 'success',
          title: 'Préstamo eliminado correctamente',
          showConfirmButton: false,
          timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
        });
        this.getLoans();
      }
    })
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  formateMonto(monto: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'decimal', currency: 'COP' }).format(monto);
  }

  openLoanPopup(id: any, title: any){
    var _popup = this.dialog.open(PopupLoanComponent,{
      width: '60%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        id: id
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getLoans();
    })
  }

  openPaymentPopup(id: any, title: any){
    var _popup = this.dialog.open(PopupPaymentComponent,{
      width: '60%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        id: id
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getLoans();
    })
  }


}

