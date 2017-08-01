import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiDataHandler } from './../api-data-handler';

@Injectable()
export class ApiValidatorService {

    constructor(
        private _api: ApiDataHandler
    ) { }

    public isEmailAvailable(email: string) {
        return this._api.getApi('user/email/available/' + email);
    }

    public checkUserAvailable(name: string): Observable<any> {
        return this._api.getApi('register/user/available/' + name);
    }

    public checkPassword(password: string): Observable<any> {
        return this._api.getApi('register/password/check/' + password);
    }

}
