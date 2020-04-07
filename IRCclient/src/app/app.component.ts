///////////////////////////////////////////////////////////////////////////////////
/*SERVICES*/
import { ApiCommands } from './services/Api/ApiCommands'
import { CustomerService } from './services/Api/Authen/CustomerService';
///////////////////////////////////////////////////////////////////////////////////
/*ANGULAR MODULE*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
///////////////////////////////////////////////////////////////////////////////////
/*COMPONENTS*/
///////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  customer = new CustomerService();
  
  constructor(private router: Router) {

  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  signOut() {
    this.customer.destroyCache()
    this.router.navigateByUrl('/log-in')
  }

  ngOnInit(): void {

  }
}
