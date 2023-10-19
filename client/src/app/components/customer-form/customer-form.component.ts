import { Component, HostBinding, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

import { CustomersService } from '../../services/customers.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

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
    private activedRoute: ActivatedRoute) { }

  ngOnInit(){

    const params = this.activedRoute.snapshot.params;
    console.log(params);
    if(params['id']){
      this.customerService.getCustomer(params['id'])
      .subscribe({
        next: customer => {
          this.customer = customer;
          console.log(customer)
          this.edit = true;
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
    const params = this.activedRoute.snapshot.params;
    this.customer.id = params['id'];
    this.customerService.updateCustomer(this.customer.id, this.customer) //Organiza esta parte porfa, no se por qué me sale undefined en el id)
    .subscribe({
      next: customer => {
        console.log(customer)
        console.log(this.edit)
        //this.router.navigate(['/clientes'])
      },
      error: error => console.log(error)
    })
  }
}
