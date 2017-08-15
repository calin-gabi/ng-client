import { DevToolsExtension } from '@angular-redux/store';
import { IRecord } from './record';

export interface IRecord {
    id: number;
    user_id: number;
    date: Date;
    description: string;
    amount: number;
    comment: string;
    rev: number;
}

export class Record implements IRecord {
    public id: number;
    public user_id: number;
    date: Date;
    description: string;
    amount: number;
    comment: string;
    rev: number;

    constructor(elem: any) {
        this.id = elem.id;
        this.user_id = elem.user_id;
        this.date = new Date(elem.date);
        this.description = elem.description;
        this.amount = elem.amount;
        this.comment = elem.comment;
        this.rev = elem.rev;
    }

    public toSave() {

    }
}
