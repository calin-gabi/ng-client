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

  @select(['records', 'records'])
  private _records$: Observable<any>;

  @select(['records', 'currentUser'])
  private _currentUser$: Observable<any>;

  @select(['login', 'login'])
  private _login$: Observable<any>;

  constructor() {
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

  ngOnInit() {
  }

}
