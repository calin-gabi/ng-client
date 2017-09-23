import {Router} from '@angular/router';
import {ApiDataHandler} from './../../core/api/api-data-handler';
import {Injectable, Inject} from '@angular/core';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs';
import {GapiManagerService} from '../../core/gapi-manager/gapi-manager.service';
import {LoginActions} from './login.actions';
import {LocalStorageService} from '../../core/local-storage.service';

@Injectable()
export class LoginService {
  public redirectUrl = '';

  constructor(private _apiData: ApiDataHandler,
              private _actions: LoginActions,
              private _ls: LocalStorageService,
              private _router: Router) {

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

  public onLoggedIn(loginPayload): void {
    this._actions.saveLogin(loginPayload);
    this._ls.set('token', loginPayload.token);
    this._router.navigate(['/']);
  }

  public login(payload: any, loginType: string) {
    this._apiData.postApi('auth/signIn', this._addCommonParams(payload))
      .subscribe(
        res => {
          this.onLoggedIn(res);
        }
      );
  }

  public onLoggedRedirect(override = this.redirectUrl) {
    console.log(override);
    this._router.navigate(
      [override])
      .then(
        null,
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
    return this._apiData.postApi('auth/signUp', this._addCommonParams(payload));
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
