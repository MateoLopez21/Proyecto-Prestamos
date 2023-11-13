import { Component, OnInit } from '@angular/core';

import { CustomersService } from '../../services/customer/customers.service'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: any = []
  dtoptions: DataTables.Settings = {}

  constructor(private customerService: CustomersService) { }

  ngOnInit(){
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe({
      next: customers => {
        this.customers = customers
      },
      error: error => console.log(error)
    })
  }

  deleteCustomer(id: string){
    this.customerService.deleteCustomer(id)
    .subscribe({
      next: customer => {
        console.log(customer);
        this.getCustomers();
      },
      error: error => console.log(error)
    })
  }

}
