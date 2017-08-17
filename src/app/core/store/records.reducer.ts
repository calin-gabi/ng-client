import { RecordsActions } from './../../components/home/records/records.actions';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ActivatedRouteSnapshot } from '@angular/router';

export interface IRecordsStore {
    currentUser: any;
    records: Array<any>;
}

export const INITIAL_STATE: IRecordsStore = {
    currentUser: {},
    records: []
};

export function recordsReducer(state: IRecordsStore = INITIAL_STATE,
                             action: any): IRecordsStore {
    switch (action.type) {
        case RecordsActions.SAVE_RECORDS:
            return { ...state, records: action.payload};
        case RecordsActions.SAVE_CURRENT_USER:
            return { ...state, currentUser: action.payload};
        default:
            return state;
    }
}
