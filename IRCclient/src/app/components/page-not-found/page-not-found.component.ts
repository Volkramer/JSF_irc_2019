import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/Api/Authen/CustomerService';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  customer = new CustomerService();

  constructor() { }

  ngOnInit(): void {
  }

}
