import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Loan } from 'src/app/models/loan';
import { LoansService } from 'src/app/services/loan/loans.service';
import { PopupLoanComponent } from '../popup/popup-loan/popup-loan.component';


@Component({
  selector: 'app-loans',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoansComponent implements OnInit{

  loans: any = [];
  dataSource: any;
  displayedColumns: string[] = ['Id', 'Cliente', 'Prestó', 'Total a Pagar', 'Resta', 'Fecha de Inicio', 'Próximo Pago', 'Valor de la Cuota', 'Cuotas Restantes'];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
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
          console.log(this.loans);
          this.dataSource = new MatTableDataSource<Loan>(this.loans);
          this.dataSource.paginator = this.paginatior;
          this.dataSource.sort = this.sort;
        },
        error: error => console.log(error)
      })
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  formateMonto(monto: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'decimal', currency: 'COP' }).format(monto);
  }

  openPopup(){
    var _popup = this.dialog.open(PopupLoanComponent,{
      width: '60%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: 'Nuevo Préstamo'
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.getLoans();
    })
  }


}

