import {Router} from '@angular/router';
import {ApiDataHandler} from './../../core/api/api-data-handler';
import {Injectable, Inject, OnDestroy} from '@angular/core';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs';
import {LoginActions} from './login.actions';
import {LocalStorageService} from '../../core/local-storage.service';

import {AuthService} from 'angular2-social-login';

@Injectable()
export class LoginService implements OnDestroy {
  public redirectUrl = '';
  private sub: any;

  constructor(private _apiData: ApiDataHandler,
              private _router: Router,
              private _ls: LocalStorageService,
              public _oauth: AuthService,
              private _actions: LoginActions) {
  }

  public isUsernameAvailable(username: string): Observable<any> {
    const payload = {
      username
    };
    return this._apiData.postApi('users/isAvailable', this._addCommonParams(payload));
  }

  public isAuthenticated() {
    return this._apiData.getApi('auth/isAuthenticated');
  }

  public onSuccessfullLogin(result: any, loginType: String) {
    console.log(result);
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
    this.sub = this._oauth.login('google')
      .subscribe(
        res => {
          const payload = {
            idToken: res['idToken'],
            accessToken: res['token'],
            oauthType: 'google'
          };
          return this._apiData.postApi('oauth/login', payload)
            .subscribe((result) => {
              console.log(result)
              this.onSuccessfullLogin(result, 'google');
            });
        }
        ,
        err => console.log(err)
      );
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
    return this._apiData.postApi('auth/signOut', this._addCommonParams({}))
      .map(
        (res) => {
          this._oauth.logout();
          return res;
        });
  }

  private _addCommonParams(obj) {
    return {
      ...obj
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
