import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LoginActions } from './../../components/login/login.actions';
import { ActivatedRouteSnapshot } from '@angular/router';
export interface ILoginStore {
    login: {};
}

export const INITIAL_STATE: ILoginStore = {
    login: {}
};

export function loginReducer(state: ILoginStore = INITIAL_STATE,
                             action: any): ILoginStore {
    switch (action.type) {
        case LoginActions.SAVE_LOGIN:
            return { ...state, login: action.payload};
        case LoginActions.SAVE_LOGOUT:
            return { ...state, login: action.payload};
        default:
            return state;
    }
}
