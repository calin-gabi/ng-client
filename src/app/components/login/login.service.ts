import { Router } from '@angular/router';
import { ApiDataHandler } from './../../core/api/api-data-handler';
import { Injectable, Inject } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import {LoginActions} from './login.actions';
import {LocalStorageService} from '../../core/local-storage.service';
import {GapiManagerService} from '../../core/gapi-manager/gapi-manager.service';
import {GoogleAuthService} from "ng-gapi";

@Injectable()
export class LoginService {
    public redirectUrl = '';

    constructor(
        private _apiData: ApiDataHandler,
        private _router: Router,
        private _gapiManagerService: GapiManagerService,
        private _googleAuthService: GoogleAuthService,
        private _ls: LocalStorageService,
        private _actions: LoginActions
    ) {}

    public isUsernameAvailable(username: string): Observable<any>  {
        const payload = {
            username
        };
        return this._apiData.postApi('users/isAvailable', this._addCommonParams(payload));
    }

    public isAuthenticated() {
        return this._apiData.getApi('auth/isAuthenticated');
    }

    public onSuccessfullLogin(result: any, loginType: String) {
      result.loginType = loginType;
      const payload = result;
      this._actions.saveLogin(payload);
      this._ls.set('token', result.token);
      this.redirectTo();
    }

    private basicLogin(payload: any) {
      return this._apiData.postApi('auth/signIn', this._addCommonParams(payload))
        .map((result) => this.onSuccessfullLogin(result, 'basic'));
    }

    private googleLogin() {
      const payload = this._gapiManagerService.getAuthPayload();
      return this._apiData.postApi('oauth/login', payload)
            .map((result) => this.onSuccessfullLogin(result, 'google'))
    }

    public login(payload: any, loginType: string) {
      switch (loginType) {
        case 'basic':
          this.basicLogin(payload);
          break;
        case 'google':
          this.googleLogin();
          break;
        default:
          return;
      }
    }

    public redirectTo(override = this.redirectUrl) {
        this._router.navigate([override]).then(
          null
          ,
          () => {
            console.error('System not authenticated');
        });
    }

    public register(username: string, password: string) {
        const payload = {
            username,
            password,
            email: username
        };
        return this._apiData.postApi('auth/signUp', this._addCommonParams(payload))
          .map((result) => this.onSuccessfullLogin(result, 'basic'));
    }

    public logout() {
        return this._apiData.postApi('auth/signOut', this._addCommonParams({}));
    }

    private _addCommonParams(obj) {
        return {
            ...obj
        };
    }
}
