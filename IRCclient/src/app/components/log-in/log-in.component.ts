import { RouterModule } from '@angular/router';
///////////////////////////////////////////////////////////////////////////////////
/*SERVICES*/
import { AuthenticationService } from './../../services/Api/Authen/AuthenticationService';
import { CustomerService } from './../../services/Api/Authen/CustomerService';
///////////////////////////////////////////////////////////////////////////////////
/*ANGULAR MODULE*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
///////////////////////////////////////////////////////////////////////////////////
/*COMPONENTS*/
///////////////////////////////////////////////////////////////////////////////////
/*MODEL/OBJECT*/
import { User } from '../../models/user'
///////////////////////////////////////////////////////////////////////////////////
/*STORE*/
///////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  
  constructor(/*private store: Store<AppState>*/ 
    private router: Router,
    private AuthService: AuthenticationService,
    private customer: CustomerService) {

  }
  
  ngOnInit(): void {

  }

  async onSubmit() {
    const resp = await this.AuthService.signin({
      username: this.user.username,
      password: this.user.password
    }).then(
      (resp) => {
        if (resp.data.token) {
          this.customer.setToken(resp.data.token)
          this.customer.setUser(resp.data.user)
          this.router.navigateByUrl('/dashboard')
        }
      },
      () => {
          alert("Wrong credentials")
    })
  }

}
