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
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  private Auth = new AuthenticationService();

  
  constructor() {

  }
  
  ngOnInit(): void {
 
  }

  async onSubmit() {
    const resp = await this.Auth.signin({
      username: this.user.username,
      password: this.user.password
    })
    console.log(resp.data)
  }

}
