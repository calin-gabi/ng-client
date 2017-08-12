import { UsersActions } from './../../components/home/users/users.actions';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ActivatedRouteSnapshot } from '@angular/router';

export interface IUsersStore {
    users: Array<any>;
}

export const INITIAL_STATE: IUsersStore = {
    users: []
};

export function usersReducer(state: IUsersStore = INITIAL_STATE,
                             action: any): IUsersStore {
    switch (action.type) {
        case UsersActions.SAVE_USERS:
            return { ...state, users: action.payload};
        default:
            return state;
    }
}
