///////////////////////////////////////////////////////////////////////////////////
/*ANGULAR MODULE*/
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
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
/*STORE*/
import { AuthEffects } from './store/effects/auth.effects';
///////////////////////////////////////////////////////////////////////////////////
/*COMPONENTS*/
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
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
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignInComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '/' }
    ]),
    FormsModule,

    !environment.production ? StoreDevtoolsModule.instrument() : []
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
