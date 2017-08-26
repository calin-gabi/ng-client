import { IAppState } from './../../core/store/store.module';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

@Injectable()
export class GapiManagerActions {
    public static readonly SET_LOGIN_STATUS = 'GAPI_SET_LOGIN_STATUS';
    public static readonly SET_USER = 'GAPI_SET_USER';
    public static readonly CLEAR_DATA = 'GAPI_CLEAR_DATA';

    constructor(
        private _ngRedux: NgRedux<IAppState>
    ) {

    }

    public clearData() {
        this._ngRedux.dispatch({type: GapiManagerActions.CLEAR_DATA});
    }

    public saveUser(user) {
        this._ngRedux.dispatch({type: GapiManagerActions.SET_USER, payload: user});
    }

    public saveLoginStatus(loginData) {
        this._ngRedux.dispatch({type: GapiManagerActions.SET_LOGIN_STATUS, payload: loginData});
    }

}
