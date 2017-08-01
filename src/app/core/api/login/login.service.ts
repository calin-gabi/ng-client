import { ApiDataHandler } from './../api-data-handler';
import { Injectable, Inject } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { IAppConfig } from '../../../app.config';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable()
export class ApiLoginService {
    public static readonly LOGIN_TYPE_FACEBOOK: string = 'FACEBOOK';
    public static readonly LOGIN_TYPE_GOOGLE: string = 'GOOGLE_ID_TOKEN';

    constructor(
        private _api: ApiDataHandler,
        private _apiDashboard: ApiDashboardHandler,
        private _localStorage: LocalStorageService,
        @Inject('AppConfig') private _appConfig: IAppConfig
    ) { }

    public login(username: String, password: String): Observable<any> {
        const payload = {
            username,
            password
        };
        return this._api.postApi('auth/signIn', this._addCommonParams(payload));
    }

    public logout(): Observable<any> {
        return this._api.getApi('auth/signOut');
    }

    private _addCommonParams(obj) {
        return {
            ...obj,
            domain: this._appConfig.config.appDomain,
        };
    }
}
