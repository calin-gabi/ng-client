import { LoginActions } from './../../components/login/login.actions';
import { LoginService } from './../../components/login/login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class AnonymusGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _actions: LoginActions
    ) { }

    public canActivate() {
        return this.isAnanonymus();
    }

    private isAnanonymus() {
        return this._loginService.isAuthenticated()
            .catch((error) => {
                return Observable.of(true);
            })
            .flatMap((res) => {
                if (res.username === 'anonymus') {
                    return Observable.of(true);
                } else {
                    this._router.navigate(['']);
                    return Observable.of(false);
                }
            });
    }

}
