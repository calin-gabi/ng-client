import {ApiModule} from './../../../core/api/api.module';
import {RecordsActions} from './records.actions';
import {RecordsService} from './records.service';
import {Record} from './record';
import {Observable} from 'rxjs/Rx';
import {select} from '@angular-redux/store';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./records.component.scss']
})

export class RecordsComponent implements OnInit {
  public records: Array<any> = [];
  public currentUser: any;
  public login: any;
  public editable = true;
  private _timeoutSave: any = null;
  private _recordSaving: boolean;
  public startDate: any;
  public endDate: any;
  public textFilter: string;

  @select(['records', 'records'])
  private _records$: Observable<any>;

  @select(['records', 'currentUser'])
  private _currentUser$: Observable<any>;

  @select(['login', 'login'])
  private _login$: Observable<any>;

  constructor(private _recordsService: RecordsService,
              private _recordsActions: RecordsActions) {
    this._records$.subscribe((records) => {
      this.records = records || [];
    });
    this._login$.subscribe((login) => {
      this.login = login || {};
    });
    this._currentUser$.subscribe((user) => {
      this.currentUser = user || {};
    });
    const _now = moment();
    this.startDate = _now;
    this.endDate = _now;
  }

  public selectStartDate(event) {
    console.log(event);
    this.startDate = moment(event);
  }

  public selectEndDate(event) {
    console.log(event);
    this.endDate = moment(event);
  }

  public searchByDate() {
    this._recordsService.filterRecords(
      this.currentUser.id,
      moment(this.startDate).valueOf(),
      moment(this.endDate).valueOf()).subscribe(
      (res) => {
        console.log(res);
        const records_ = res.map((elem) => {
          return new Record(elem);
        });
        this._recordsActions.saveRecords(records_);
      }
    );
  }

  public typeFilter() {
    return true;
  }

  public filterText(event) {
    console.log(event);
    this.filterText = event;
  }

  public descriptionChange(record, description) {
    record.description = description;
    record.amount = +record.amount;
    if (this._timeoutSave) {
      clearTimeout(this._timeoutSave);
    }

    this._timeoutSave = setTimeout(() => {
      this.saveRecord(record);
    }, 300);
  }

  public amountChange(record, amount) {
    record.amount = +record.amount;
    if (this._timeoutSave) {
      clearTimeout(this._timeoutSave);
    }

    this._timeoutSave = setTimeout(() => {
      this.saveRecord(record);
    }, 300);
  }

  public commentChange(record, comment) {
    record.comment = comment;
    record.amount = +record.amount;
    if (this._timeoutSave) {
      clearTimeout(this._timeoutSave);
    }

    this._timeoutSave = setTimeout(() => {
      this.saveRecord(record);
    }, 300);
  }

  public addRecord() {
    const record = new Record({
      id: 0,
      userId: this.currentUser.id,
      description: '',
      date: moment(),
      amount: 0,
      comment: ''
    });
    console.log(record);
    this._recordsService.addRecord(this.currentUser.id, record.toSave()).subscribe(
      (res) => {
        const rec = new Record(res);
        this._recordsActions.saveRecord(rec.id, rec);
      }
    );
    return;
  }

  public deleteRecord(record) {
    if (record.id > 0) {
      this._recordsService.deleteRecord(this.currentUser.id, record.id).subscribe(
        (res) => {
          this._recordsActions.deleteRecord(record);
        }
      );
    } else {
      this._recordsActions.deleteRecord(record);
    }
    return;
  }

  public onSelect(record, event) {
    record.date = moment(event);
    this.saveRecord(record);
  }

  public saveRecord(record: Record) {
    const recordId = record.id;
    if (this._recordSaving) {
      return;
    }
    this._recordSaving = true;
    this._recordsService.updateRecord(this.currentUser.id, record.toSave()).subscribe(
      (res) => {
        const rec = new Record({
          id: res.id,
          userId: res.userId,
          description: res.description,
          date: res.date,
          amount: res.amount,
          comment: res.comment
        });
        this._recordsActions.saveRecord(rec.id, rec);
        this._recordSaving = false;
      }
    );
  }

  public isEditable(): Boolean {
    return ['admin', 'manager']
      .indexOf(this.currentUser['role']) > -1 || this.login['id'] === this.currentUser['id'];
  }

  ngOnInit() {
    Observable
      .zip(
        this._login$,
        this._currentUser$
      )
      .subscribe(
        ([login, currentUser]) => {
          if (login && currentUser) {
            this.editable = ['admin', 'manager']
              .indexOf(this.currentUser['role']) > -1 || login['id'] === currentUser['id'];
          }
        });
  }

}
