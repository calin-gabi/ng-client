import { IRecord } from './record';
import { ApiDataHandler } from './../../../core/api/api-data-handler';
import { Injectable } from '@angular/core';

@Injectable()
export class RecordsService {

    constructor(
        private _apiDataHandler: ApiDataHandler
    ) {}

    public getRecords(userId: number) {
        return this._apiDataHandler.getApi('records/' + userId.toString());
    }

    public addRecord(userId: number, record: any) {
        return this._apiDataHandler.postApi('records/' + userId.toString(), record);
    }

    public updateRecord(userId: number, record: any) {
        return this._apiDataHandler.postApi('records/' + userId.toString() + '/' + record.id.toString(), record);
    }

    public deleteRecord(userId: number, recordId: number) {
        return this._apiDataHandler.deleteApi('records/' + userId.toString() + '/' + recordId.toString());
    }
}
