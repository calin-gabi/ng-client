import {LoginActions} from './../../components/login/login.actions';
import {LoginService} from './../../components/login/login.service';
import {Injectable} from '@angular/core';
import {CanLoad, Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs';
import {LocalStorageService} from '../local-storage.service';
import {IAppState} from '../store/store.module';
import {NgRedux} from '@angular-redux/store';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router,
              private _loginService: LoginService,
              private _ls: LocalStorageService,
              private _actions: LoginActions,
              private _ngRedux: NgRedux<IAppState>) {
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
          this._router.navigate(['login']);
          return Observable.of(false);
        } else {
          const login = (this._ngRedux.getState().login.login || {id: null});
          if (login['id'] !== res.id) {
            this._actions.saveLogin(res);
          }
          return Observable.of(true);
        }
      });
  }

}
