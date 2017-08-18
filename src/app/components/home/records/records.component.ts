import { ApiModule } from './../../../core/api/api.module';
import { RecordsActions } from './records.actions';
import { RecordsService } from './records.service';
import { Record } from './record';
import { Observable } from 'rxjs/Rx';
import { select } from '@angular-redux/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./records.component.scss']
})

export class RecordsComponent implements OnInit {
  public records: Array<any>;
  public currentUser: any;
  public login: any;
  public editable: boolean;
  private _timeoutSave: any = null;

  @select(['records', 'records'])
  private _records$: Observable<any>;

  @select(['records', 'currentUser'])
  private _currentUser$: Observable<any>;

  @select(['login', 'login'])
  private _login$: Observable<any>;

  constructor(
    private _recordsService: RecordsService,
    private _recordsActions: RecordsActions
  ) {
    this._records$.subscribe((records) => { this.records = records; });
    this._login$.subscribe((login) => { this.login = login; });
    this._currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        if (['admin', 'manager'].indexOf(this.currentUser['role']) > -1 || this.login['id'] === this.currentUser['id']) {
          this.editable = true;
        } else {
          this.editable = false;
        }
      }
    });
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

  public amountChange(amount) {
    console.log(amount);
  }

  public commentChange(comment) {
    console.log(comment);
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
    this._recordsActions.addRecord(record);
    return ;
  }

  public deleteRecord(record) {
    console.log(record.id);
    if (record.id > 0) {
      this._recordsService.deleteRecord(record.id).subscribe(
        (res) => {
          console.log(res);
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
    if (recordId > 0 ) {
      this._recordsService.updateRecord(recordId, record.toSave()).subscribe(
        (res) => {
          const rec = new Record(res);
          this._recordsActions.saveRecord(rec);
        }
      );
    } else {
      this._recordsService.addRecord(record.userId, record.toSave()).subscribe(
        (res) => {
          console.log(res);
        }
      );
    }
  }

  ngOnInit() {
  }

}
