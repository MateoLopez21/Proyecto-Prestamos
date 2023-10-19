import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Customer } from '../models/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http:HttpClient) { }

  getCustomers(){
    return this.http.get(`${this.API_URI}/clientes`);
  }

  getCustomer(id:string){
    return this.http.get(`${this.API_URI}/clientes/${id}`);
  }

  saveCustomer(customer:Customer){
    return this.http.post(`${this.API_URI}/clientes`, customer);
  }

  deleteCustomer(id:string){
    return this.http.delete(`${this.API_URI}/clientes/${id}`);
  }

  updateCustomer(id:string|number, updatedCustomer:Customer){
    return this.http.patch(`${this.API_URI}/clientes/${id}`, updatedCustomer);
  }
}