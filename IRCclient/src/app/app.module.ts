///////////////////////////////////////////////////////////////////////////////////
/*ANGULAR MODULE*/
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
///////////////////////////////////////////////////////////////////////////////////
/*SERVICES*/
import { ChatService } from './services/Socket/chat.service';
import { ChannelMessageService }  from './services/Api/Channel/ChannelMessageService';
import { ChannelService }  from './services/Api/Channel/ChannelService';
import { ChannelUserService }  from './services/Api/Channel/ChannelUserService';
import { MessageService }  from './services/Api/Message/MessageService';
import { MessageUserService }  from './services/Api/Message/MessageUserService';
import { UserService }  from './services/Api/User/UserService';
import { AuthenticationService } from './services/Api/Authen/AuthenticationService';
///////////////////////////////////////////////////////////////////////////////////
/*COMPONENTS*/
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
///////////////////////////////////////////////////////////////////////////////////

@NgModule({
  declarations: [
    AppComponent, 
    SignInComponent, 
    LogInComponent, 
    HomeComponent, 
    DashboardComponent
  ],
  imports: [
    FormsModule, 
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignInComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '/' }
    ]),
    FormsModule
  ],
  providers: [
    ChatService,
    AuthenticationService,
    ChannelMessageService,
    ChannelService,
    ChannelUserService,
    MessageService,
    MessageUserService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
