import { Router } from '@angular/router';
import { ApiDataHandler } from './../../core/api/api-data-handler.service';
import { Injectable, Inject } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    public redirectUrl = '';

    constructor(
        private _apiData: ApiDataHandler,
        private _router: Router
    ) {

    }

    public isUsernameAvailable(username: string): Observable<any>  {
        const payload = {
            username
        };
        return this._apiData.postApi('users/isAvailable', this._addCommonParams(payload));
    }

    public isAuthenticated() {
        return this._apiData.getApi('auth/isAuthenticated');
    }

    public login(username: string, password: string) {
        const payload = {
            username,
            password
        };
        return this._apiData.postApi('auth/signIn', this._addCommonParams(payload));
    }

    public onLogged(override = this.redirectUrl) {
        this._router.navigate([override]).then(null, () => {
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