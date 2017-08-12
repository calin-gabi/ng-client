import { IUser } from './user';
import { ApiDataHandler } from './../../../core/api/api-data-handler';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

    constructor(
        private _apiDataHandler: ApiDataHandler
    ) {}

    public getUsers() {
        return this._apiDataHandler.getApi('users');
    }

    public getMe() {
        return this._apiDataHandler.getApi('users/me');
    }

    public getUser(id: number) {
        return this._apiDataHandler.getApi('users/' + id.toString());
    }

    public updateUser(user: IUser) {
        return this._apiDataHandler.postApi('users/' + user.id.toString(), user);
    }

    public deleteUser(id: number) {
        return this._apiDataHandler.deleteApi('users/' + id.toString());
    }
}
