import {ApiDataHandler} from './../api/api-data-handler';
import {IAppConfig} from './../../app.config';
import {Injectable, Inject} from '@angular/core';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';

@Injectable()
export class GapiManagerService {

  constructor(private _googleAuthService: GoogleAuthService,
              private _apiDataHandler: ApiDataHandler,
              @Inject('AppConfig') private _appConfig: IAppConfig) {
  }

  public login() {
    console.log('login');
    this._googleAuthService.getAuth().subscribe((auth) => {
      console.log(auth.isSignedIn.get());
      const currentUserId = auth.currentUser.get().getId();
      console.log(currentUserId);
      auth.signIn().then(res => {
        const response = res.getAuthResponse();
        const idToken = response.id_token;
        const accessToken = response.access_token;
        this.loginOAuth(idToken, accessToken).subscribe(
            (result) => console.log(result)
        );
      }, err => console.log(err));
    });
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

  public logout() {
    console.log('logout');
    return;
  }
}
