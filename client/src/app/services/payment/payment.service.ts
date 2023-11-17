import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  API_URI = 'http://localhost:3000/api'


  constructor(private http:HttpClient) { }

  getpayments(): Observable<Payment[]>{
    return this.http.get<Payment[]>(`${this.API_URI}/pagos`);
  }

  getPayment(id:string){
    return this.http.get(`${this.API_URI}/prestamos/${id}`);
  }

  savePayment(paymentData: Payment){
    return this.http.post(`${this.API_URI}/pagos`, paymentData);
  }
}
