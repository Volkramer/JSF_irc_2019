
import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {CustomerService} from '../services/Api/Authen/CustomerService';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class NeedAuthGuard implements CanActivate {

constructor(private customerService: CustomerService, private router: Router) {
}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

        if (this.customerService.isLogged()) {
            return true;
        }
        this.router.navigateByUrl(
            this.router.createUrlTree(
                ['/log-in'], {
                    queryParams: {
                        redirectUrl
                    }
                }
            )
        );
        return false;
    }
}