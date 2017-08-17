import { DevToolsExtension } from '@angular-redux/store';
import { IRecord } from './record';

import * as moment from 'moment';

export interface IRecord {
    id: number;
    user_id: number;
    date: {};
    description: string;
    amount: number;
    comment: string;
    rev: number;
}

export class Record implements IRecord {
    public id: number;
    public user_id: number;
    public date: {};
    public description: string;
    public amount: number;
    public comment: string;
    rev: number;

    constructor(elem: any) {
        this.id = elem.id;
        this.user_id = elem.user_id;
        this.date = moment(elem.date);
        this.description = elem.description;
        this.amount = elem.amount.toFixed(2);
        this.comment = elem.comment;
        this.rev = elem.rev;
    }

    public toSave() {

    }
}
