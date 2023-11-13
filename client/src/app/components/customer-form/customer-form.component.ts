import { Component, HostBinding, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

import { CustomersService } from '../../services/customer/customers.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customerForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    telefono: new FormControl('')
  });

  customer: Customer = {
    id:0,
    nombre: '',
    apellido: '',
    telefono: ''
  }


  edit: boolean = false;

  @HostBinding('class') classes='row';

  constructor(private customerService: CustomersService,
    private router: Router,
    private activedRoute: ActivatedRoute) {
  }

  ngOnInit(){
    const params = this.activedRoute.snapshot.params;
    console.log(params);
    if(params['id']){
      
      this.edit = true;
      this.customerService.getCustomer(params['id'])
      .subscribe({
        next: res => {
          console.log(res);
          if (Array.isArray(res) && res.length > 0) {
            this.customer = res[0];
            this.customerForm.patchValue(this.customer); // Asigna los valores al formulario
          } else {
            console.log('No se encontraron datos del cliente');
          }
        },
        error: error => console.log(error)
        })
    }
  }
  

  saveNewCustomer(){
    delete this.customer.id;
    this.customerService.saveCustomer(this.customer)
      .subscribe({
        next: customer => {
          console.log(customer)
          this.router.navigate(['/clientes'])
        },
        error: error => console.log(error)
  })
  }

  updateCustomer(){
    const id = Number(this.activedRoute.snapshot.params['id']);
    this.customer = this.customerForm.value;
    this.customer.id = id;

    this.customerService.updateCustomer(id, this.customer) //Organiza esta parte porfa, no se por qué me sale undefined en el id)
    .subscribe({
      next: res => {
        console.log(res)
        console.log(this.customer)
        console.log(this.edit)
        this.router.navigate(['/clientes'])
        console.log("id", this.customer.id)
        console.log(this.customer)
      },
      error: error => console.log(error)
    })
  }
}
