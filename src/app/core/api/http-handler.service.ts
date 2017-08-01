import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs';

export interface ILoadingBarRequestOptionsArgs extends RequestOptionsArgs {
  ignoreLoadingBar?: boolean;
}

@Injectable()
export class HttpHandlerService extends Http {
  public pending = new Subject();
  // tslint:disable-next-line:no-inferrable-types
  private _pendingRequests: number = 0;
  constructor(
    backend: XHRBackend,
    options: RequestOptions
  ) {
    super(backend, options);
  }

  public request(
    request: string | Request,
    options?: RequestOptionsArgs | ILoadingBarRequestOptionsArgs
  ): Observable<Response> {
    const response = super.request(request, options).share();
    if (options && options['ignoreLoadingBar'] === true) {
      return response;
    }

    this._requestStarted();
    response.subscribe(
      (x) => null,
      (err) => this._requestEnded(),
      () => this._requestEnded(),
    );

    return response;
  }

  private _requestStarted() {
    this.pending.next({
      started: this._pendingRequests === 0,
      pendingRequests: ++this._pendingRequests,
    });
  }

  private _requestEnded() {
    this.pending.next({
      completed: this._pendingRequests === 1,
      pendingRequests: --this._pendingRequests,
    });
  }
}
