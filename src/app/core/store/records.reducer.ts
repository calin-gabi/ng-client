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
        case RecordsActions.SAVE_RECORD:
            const rec = action.payload.record;
            const recordId = action.payload.recordId;
            const save_idx = state.records.findIndex((elem) => {
                return elem.id === recordId;
            });
            state.records.splice(save_idx, 1, rec);
            const records_saved = state.records;
            return { ...state, records: records_saved};
        case RecordsActions.ADD_RECORD:
            const newrec = action.payload;
            state.records.push(newrec);
            const records_added = state.records;
            return { ...state, records: records_added};
        case RecordsActions.DELETE_RECORD:
            const delrec = action.payload;
            const del_idx = state.records.findIndex((elem) => {
                return elem.id === delrec.id;
            });
            state.records.splice(del_idx, 1);
            const records_deleted = state.records;
            return { ...state, records: records_deleted};
        case RecordsActions.SAVE_CURRENT_USER:
            return { ...state, currentUser: action.payload};
        default:
            return state;
    }
}
