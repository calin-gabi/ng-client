import {LoginActions} from './../../components/login/login.actions';
import {LoginService} from './../../components/login/login.service';
import {Injectable} from '@angular/core';
import {CanLoad, Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router,
              private _loginService: LoginService,
              private _ls: LocalStorageService,
              private _actions: LoginActions) {
  }

  public canActivate() {
    return this.isAuthenticated();
  }

  private isAuthenticated() {
    return this._loginService.isAuthenticated()
      .catch((error) => {
        this._router.navigate(['login']);
        return Observable.of(false);
      })
      .flatMap((res) => {
        if (res.username === 'anonymus') {
          console.log('login ');
          this._router.navigate(['login']);
          return Observable.of(false);
        } else {
          return Observable.of(true);
        }
      });
  }

}
