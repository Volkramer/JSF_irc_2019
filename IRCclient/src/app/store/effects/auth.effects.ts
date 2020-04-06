import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/catch';
// import { tap } from 'rxjs';

import { AuthenticationService } from '../../services/Api/Authen/AuthenticationService';


@Injectable()
export class AuthEffects {

constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
) {}

  // effects go here

}