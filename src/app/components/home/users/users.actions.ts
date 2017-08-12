import { IAppState } from './../../../core/store/store.module';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersActions {
    public static readonly SAVE_USERS = 'SAVE_USERS';

    constructor(
        private _ngRedux: NgRedux<IAppState>
    ) {

    }

    public saveUsers(users: {} ) {
        this._ngRedux.dispatch({type: UsersActions.SAVE_USERS, payload: users});
    }
}
