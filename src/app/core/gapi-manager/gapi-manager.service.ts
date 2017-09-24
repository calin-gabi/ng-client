import {ApiDataHandler} from './../api/api-data-handler';
import {IAppConfig} from './../../app.config';
import {Injectable, Inject} from '@angular/core';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';
import {Observable} from 'rxjs/Observable';
import {LoginActions} from '../../components/login/login.actions';
import {LocalStorageService} from '../local-storage.service';
import {Router} from '@angular/router';
import {LoginService} from '../../components/login/login.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class GapiManagerService {
  private auth = null;
  public redirectUrl = '';

  constructor(private _googleAuthService: GoogleAuthService,
              private _apiDataHandler: ApiDataHandler,
              private _loginService: LoginService,
              private _router: Router,
              @Inject('AppConfig') private _appConfig: IAppConfig) {
  }

  public getAuth() {
    this._googleAuthService.getAuth().subscribe(
      auth => {
        this.auth = auth;
      }
    );
  }

  public login(): Observable<any> {
    const sub: Subject<any> = new Subject();
    this.auth.signIn()
      .then(res => {
          const response = res.getAuthResponse();
          const idToken = response.id_token;
          const accessToken = response.access_token;
          this.loginOAuth(idToken, accessToken).subscribe(
            result => {
              sub.next(result);
            }
          );
        },
        err => {
          console.log(err);
        });
    return sub;
  }

  public loginOAuth(idToken: String, accessToken: String) {
    const payload = {
      idToken,
      accessToken,
      oauthType: 'google'
    };
    return this._apiDataHandler.postApi('oauth/login', payload);
  }

  public verifyIdToken(idToken: String) {
    const payload = {
      idToken
    };
    return this._apiDataHandler.postApi('oauth/verify', payload);
  }


  public tokenInfo(token: String) {
    const payload = {
      token
    };
    return this._apiDataHandler.postApi('oauth/tokeninfo', payload);
  }

  public getMe() {
    console.log('getMe');
    return;
  }

  public logout(): void {
    if (this.auth) {
      this.auth.signOut();
    }
  }
}
