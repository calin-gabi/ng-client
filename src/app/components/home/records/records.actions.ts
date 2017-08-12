import { IAppState } from './../../../core/store/store.module';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

@Injectable()
export class RecordsActions {
    public static readonly SAVE_RECORDS = 'SAVE_RECORDS';
    public static readonly SAVE_CURRENT_USERID= 'SAVE_CURRENT_USERID';

    constructor(
        private _ngRedux: NgRedux<IAppState>
    ) {

    }

    public saveRecords(records: {} ) {
        this._ngRedux.dispatch({type: RecordsActions.SAVE_RECORDS, payload: records});
    }

    public saveCurrentUserId(currentUserId: {} ) {
            this._ngRedux.dispatch({type: RecordsActions.SAVE_CURRENT_USERID, payload: currentUserId});
        }
}
