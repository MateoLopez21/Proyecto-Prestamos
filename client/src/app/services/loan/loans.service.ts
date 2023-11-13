import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from 'src/app/models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  API_URI = 'http://localhost:3000/api'
  // API_URI = 'https://6ng1rmgd-3000.use2.devtunnels.ms/api'


  constructor(private http:HttpClient) { }

  getLoans(): Observable<Loan[]>{
    return this.http.get<Loan[]>(`${this.API_URI}/prestamos`);
  }

  // getCustomer(id:string){
  //   return this.http.get(`${this.API_URI}/clientes/${id}`);
  // }

  saveLoan(loan: Loan){
    return this.http.post(`${this.API_URI}/prestamos`, loan);
  }

  // deleteCustomer(id:string){
  //   return this.http.delete(`${this.API_URI}/clientes/${id}`);
  // }

  // updateCustomer(id: number, updatedCustomer:Customer): Observable<Customer>{
  //   return this.http.patch(`${this.API_URI}/clientes/${id}`, updatedCustomer);
  // }
}
