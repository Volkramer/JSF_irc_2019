///////////////////////////////////////////////////////////////////////////////////
/*SERVICES*/
import { AuthenticationService } from './../../services/Api/Authen/AuthenticationService';
///////////////////////////////////////////////////////////////////////////////////
/*ANGULAR MODULE*/
import { Component, OnInit } from '@angular/core';
///////////////////////////////////////////////////////////////////////////////////
/*COMPONENTS*/
///////////////////////////////////////////////////////////////////////////////////
/*MODEL/OBJECT*/
import { User } from '../../models/user'
///////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user: User = new User();
  private AuthService = new AuthenticationService();

  constructor() {

  }

  ngOnInit(): void {

  }

  async onSubmit() {
    const resp = await this.AuthService.register({
      username: this.user.username,
      password: this.user.password
    })
    console.log(resp.data);
  }

}