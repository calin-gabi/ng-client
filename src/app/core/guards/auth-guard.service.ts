import { Injectable } from '@angular/core';
import { CanLoad, Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor() { }

    public canActivate() {
        if (this.isAuthenticated()) {
            return Observable.of(true);
        } else {
            return null;
        }
    }

    private isAuthenticated() {
        return true;
    }

}
