import { ApiDataHandler } from './../api/api-data-handler';
import { IAppConfig } from './../../app.config';
import { Injectable, Inject } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi/lib/GoogleAuthService';

@Injectable()
export class GapiManagerService {

    constructor(
        private _googleAuthService: GoogleAuthService,
        private _apiDataHandler: ApiDataHandler,
        @Inject('AppConfig') private _appConfig: IAppConfig
    ) {

    }

    public login() {
        console.log('login');
        this._googleAuthService.getAuth().subscribe((auth) => {
            console.log(auth);
            if (auth.isSignedIn) {
                auth.signOut();
            }
            auth.signIn().then(res => {
                const idToken = res.Zi.id_token;
                // console.log(res);
                // this.verifyIdToken(idToken).subscribe(
                //     (result) => console.log(result)
                // );
                const accessToken = res.Zi.access_token;
                console.log(accessToken);
                this.tokenInfo(accessToken).subscribe(
                    (result) => console.log(result)
                );
            }, err => console.log(err));
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
