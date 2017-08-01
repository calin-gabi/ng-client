import { Injectable } from '@angular/core';
import { ApiDataHandler } from '../api-data-handler';
import { IUser } from './user';

@Injectable()
export class ApiUserService {
    /* tslint:disable */
    private static readonly USER_ROLE_ADMIN: string = 'admin';
    private static readonly USER_ROLE_MANAGER: string = 'manager';
    /* tslint:enable */
    constructor(
        private _api: ApiDataHandler
    ) { }

    public getUsers() {
        return this._api.getApi('users/');
    }

    public getUser() {
        return this._api.getApi('users/me');
    }

    public update(user: IUser) {
        const payload = {
            user
        };
        return this._api.postApi('users/' + user.id.toString(), payload);
    }
}
