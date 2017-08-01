import { LocalStorageService } from './../../core/local-storage/local-storage.service';

import { HttpHandlerService } from './http-handler.service';
import { IAppConfig } from './../../app.config';

import { Injectable, Inject } from '@angular/core';
import { XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class ApiDataHandler extends HttpHandlerService {
    public static readonly RESPONSE_ERROR = 'RESPONSE_ERROR';
    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public localStorage: LocalStorageService,
        @Inject('AppConfig') private _appConfig: IAppConfig
    ) {
        super(backend, options);
    }

    public request(request: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        let token = this.localStorage.get('JSESSIONID', null);
        if (typeof request === 'string') { // meaning we have to add the token to the options, not in url
            request = this._appConfig.config.apiUrl + request + (token ? ';jsessionid=' + token : '');
        } else {
            request.url = this._appConfig.config.apiUrl + request.url + (token ? ';jsessionid=' + token : '');
        }
        return super.request(request, options);
    }

    public getApi(endpoint) {
        return this.get(endpoint)
            .map(this.extractData)
            .catch((d) => {
                return this._handleError(d);
            });
    }

    public postApi(endpoint: string, options?, withCredentials = null): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.post(
            endpoint,
            options,
            new RequestOptions({ headers, withCredentials })
        ).catch((error: Response | any) => {
            return this._handleError(error);
        });
    }

    public extractData(res: Response) {
        try {
            if (res.text()) {
                return res.json() || {};
            }
            return res.json() || {};
        } catch (e) {
            // return ApiDashboardHandler.RESPONSE_ERROR;
        }
        return ApiDashboardHandler.RESPONSE_ERROR;
    }

    protected _handleError(error: Response | any) {
        let errMsg: string = '';
        if (error && error.headers) {
            if (error.headers.get('X-JSESSIONID')) {
                this.localStorage.set('JSESSIONID', error.headers.get('X-JSESSIONID'));
            }
        }
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
