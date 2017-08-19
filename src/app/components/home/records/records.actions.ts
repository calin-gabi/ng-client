import { IAppState } from './../../../core/store/store.module';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

@Injectable()
export class RecordsActions {
    public static readonly SAVE_RECORDS = 'SAVE_RECORDS';
    public static readonly SAVE_RECORD = 'SAVE_RECORD';
    public static readonly ADD_RECORD = 'ADD_RECORD';
    public static readonly DELETE_RECORD = 'DELETE_RECORD';
    public static readonly SAVE_CURRENT_USER= 'SAVE_CURRENT_USER';

    constructor(
        private _ngRedux: NgRedux<IAppState>
    ) {

    }

    public saveRecords(records: {} ) {
        this._ngRedux.dispatch({type: RecordsActions.SAVE_RECORDS, payload: records});
    }

    public saveRecord(recordId, record: {} ) {
        const payload_ = {recordId: recordId, record: record}
        this._ngRedux.dispatch({type: RecordsActions.SAVE_RECORD, payload: payload_});
    }

    public addRecord(record: {} ) {
        this._ngRedux.dispatch({type: RecordsActions.ADD_RECORD, payload: record});
    }

    public deleteRecord(record: {} ) {
        this._ngRedux.dispatch({type: RecordsActions.DELETE_RECORD, payload: record});
    }

    public saveCurrentUser(currentUser: {} ) {
        this._ngRedux.dispatch({type: RecordsActions.SAVE_CURRENT_USER, payload: currentUser});
    }
}
