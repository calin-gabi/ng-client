import { DevToolsExtension } from '@angular-redux/store';
import { IRecord } from './record';

import * as moment from 'moment';

export interface IRecord {
    id: number;
    userId: number;
    date: {};
    description: string;
    amount: number;
    comment: string;
    rev: number;
}

export class Record implements IRecord {
    public id: number;
    public userId: number;
    public date: {};
    public description: string;
    public amount: number;
    public comment: string;
    rev: number;

    constructor(elem: any) {
        this.id = elem.id;
        this.userId = elem.userId;
        this.date = moment(elem.date);
        this.description = elem.description;
        this.amount = parseFloat(elem.amount.toFixed(2));
        this.comment = elem.comment;
        this.rev = elem.rev;
    }

    public toSave() {
        return {
            id: this.id,
            userId: this.userId,
            date: moment(this.date).valueOf(),
            description: this.description,
            amount: this.amount,
            comment: this.comment
        };
    }
}
