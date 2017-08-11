import { LocalStorageService } from './../local-storage.service';
import { IAppConfig } from './../../app.config';
import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { DOCUMENT } from '@angular/platform-browser';
import { select } from '@angular-redux/store';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class ApiDataHandler {

    constructor(
        private _http: Http,
        private _ls: LocalStorageService,
        @Inject('AppConfig') private _appConfig: IAppConfig
    ) {
    }

    private freeRoutes = ['auth/signIn', 'auth/signUp'];

    public getApi(endpoint) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        if (endpoint in this.freeRoutes === false) {
            headers.append('Token', this._ls.get('token', ''));
        }
        return this._http.get(this._appConfig.apiUrl + endpoint, new RequestOptions({ headers}))
            .map(this.extractData)
            .catch(this.handleError);
    }

    public postApi(endpoint, payload) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        if (endpoint in this.freeRoutes === false) {
            headers.append('Token', this._ls.get('token', ''));
        }
        return this._http.post(this._appConfig.apiUrl + endpoint, payload, new RequestOptions({ headers}))
            .map(this.extractData)
            .catch(this.handleError);
    }

    public extractData(res: Response) {
        try {
            if (res.text()) {
                return res.json() || {};
            }
        } catch (e) {
            return 'Extract data error';
        }
    }

    protected handleError(error: Response | any) {
        let errMsg = '';
        try {
            if (error instanceof Response) {
                const body = error.json() || {};
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                errMsg = error.message ? error.message : error.toString();
            }
            // console.error(errMsg);
        } catch (e) {
            // console.error('Unexpected(JSON) format.');
        }
        return Observable.throw(error || 'backend server error');
    }
}

