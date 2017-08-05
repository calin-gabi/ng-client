import { ApiDataHandler } from './../../core/api/api-data-handler.service';
import { Injectable, Inject } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    constructor(
        private _apiData: ApiDataHandler
    ) {

    }

    public isAuthenticated() {
        return this._apiData.getApi('auth/isauthenticated');
    }

    public login(username: string, password: string) {
        const payload = {
            username,
            password
        };
        return this._apiData.postApi('auth/signin', this._addCommonParams(payload));
    }

    public register(username: string, password: string) {
        const payload = {
            username,
            password
        };
        return this._apiData.postApi('auth/signup', this._addCommonParams(payload));
    }

    public logout() {
        return this._apiData.getApi('auth/signout');
    }

    private _addCommonParams(obj) {
        return {
            ...obj
        };
    }
}