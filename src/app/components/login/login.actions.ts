import { IAppState } from './../../core/store/store.module';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginActions {
    public static readonly SAVE_LOGIN = 'LOGIN_SAVE_LOGIN';

    constructor(
        private _ngRedux: NgRedux<IAppState>
    ) {

    }
    public saveLogin(login: {} ){
        this._ngRedux.dispatch({type: LoginActions.SAVE_LOGIN, payload: login});
    }
}
