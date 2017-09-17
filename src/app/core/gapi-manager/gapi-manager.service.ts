import {ApiDataHandler} from './../api/api-data-handler';
import {IAppConfig} from './../../app.config';
import {Injectable, Inject} from '@angular/core';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';
import {LoginActions} from '../../components/login/login.actions';
import {LocalStorageService} from '../local-storage.service';

@Injectable()
export class GapiManagerService {

  constructor(private _googleAuthService: GoogleAuthService,
              private _apiDataHandler: ApiDataHandler,
              @Inject('AppConfig') private _appConfig: IAppConfig) {
    }

  public getAuthPayload() {
    return this._googleAuthService.getAuth().subscribe((auth) => {
      console.log(auth.isSignedIn.get());
      const currentUserId = auth.currentUser.get().getId();
      console.log(currentUserId);
      auth.signIn().then(
        res => {
        const response = res.getAuthResponse();
        const idToken = response.id_token;
        const accessToken = response.access_token;
        const payload = {
          idToken,
          accessToken,
          oauthType: 'google'
        };
        return payload;
      }, err => {
          console.log(err);
          return null;
        });
    });
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
