///////////////////////////////////////////////////////////////////////////////////
/*SERVICES*/
import { AuthenticationService } from './../../services/Api/Authen/AuthenticationService';
///////////////////////////////////////////////////////////////////////////////////
/*ANGULAR MODULE*/
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
///////////////////////////////////////////////////////////////////////////////////
/*COMPONENTS*/
///////////////////////////////////////////////////////////////////////////////////
/*MODEL/OBJECT*/
import { User } from '../../models/user'
///////////////////////////////////////////////////////////////////////////////////
/*STORE*/
import { AppState } from '../../store/app.state';
import { LogIn } from '../../store/actions/auth.actions';
///////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  private AuthService = new AuthenticationService();

  
  constructor(private store: Store<AppState>) {

  }
  
  ngOnInit(): void {

  }

  async onSubmit() {
    const resp = await this.AuthService.signin({
      username: this.user.username,
      password: this.user.password
    })
    console.log(resp.data)
    this.store.dispatch(new LogIn(resp.data))
  }

}
