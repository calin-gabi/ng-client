import {HttpHandlerService} from './http-handler.service';
import {LocalStorageService} from './../local-storage.service';
import {IAppConfig} from './../../app.config';
import {Injectable, Inject} from '@angular/core';
import {Http, RequestOptions, Request, RequestOptionsArgs, Response, Headers, XHRBackend} from '@angular/http';
import {DOCUMENT} from '@angular/platform-browser';
import {select} from '@angular-redux/store';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs';

@Injectable()
export class ApiDataHandler extends HttpHandlerService {

  constructor(backend: XHRBackend,
              options: RequestOptions,
              public _ls: LocalStorageService,
              @Inject('AppConfig') private _appConfig: IAppConfig) {
    super(backend, options);
  }

  private freeRoutes = ['auth/signIn', 'auth/signUp'];

  public getApi(endpoint) {
    const headers = new Headers({'Content-Type': 'application/json'});
    if (endpoint in this.freeRoutes === false) {
      headers.append('Token', this._ls.get('token', ''));
    }
    return this.get(this._appConfig.apiUrl + endpoint, new RequestOptions({headers}))
      .map(this.extractData)
      .catch(this.handleError);
  }

  public postApi(endpoint, payload) {
    const headers = new Headers({'Content-Type': 'application/json'});
    if (endpoint in this.freeRoutes === false) {
      headers.append('Token', this._ls.get('token', ''));
    }
    return this.post(this._appConfig.apiUrl + endpoint, payload, new RequestOptions({headers}))
      .map(this.extractData)
      .catch(this.handleError);
  }

  public patchApi(endpoint, payload) {
    const headers = new Headers({'Content-Type': 'application/json'});
    if (endpoint in this.freeRoutes === false) {
      headers.append('Token', this._ls.get('token', ''));
    }
    return this.patch(this._appConfig.apiUrl + endpoint, payload, new RequestOptions({headers}))
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteApi(endpoint) {
    const headers = new Headers({'Content-Type': 'application/json'});
    if (endpoint in this.freeRoutes === false) {
      headers.append('Token', this._ls.get('token', ''));
    }
    return this.delete(this._appConfig.apiUrl + endpoint, new RequestOptions({headers}))
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
    } catch (e) {
      console.error('Unexpected(JSON) format.');
    }
    // console.error(errMsg);
    return Observable.throw(errMsg || 'backend server error');
  }
}

