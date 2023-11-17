import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from 'src/app/models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  API_URI = 'http://localhost:3000/api'


  constructor(private http:HttpClient) { }

  getLoans(): Observable<Loan[]>{
    return this.http.get<Loan[]>(`${this.API_URI}/prestamos`);
  }

  getLoan(id:string){
    return this.http.get(`${this.API_URI}/prestamos/${id}`);
  }

  saveLoan(loan: Loan){
    return this.http.post(`${this.API_URI}/prestamos`, loan);
  }

  deleteLoan(id:string){
    return this.http.delete(`${this.API_URI}/prestamos/${id}`);
  }

  updateLoan(id: number, updatedLoan: Loan): Observable<Loan>{
    return this.http.patch(`${this.API_URI}/prestamos/${id}`, updatedLoan);
  }
}
