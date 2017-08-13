import { Observable } from 'rxjs/Rx';
import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  public records: Array<any>;

  @select(['records', 'records'])
  private _records$: Observable<any>;

  constructor() {
    this._records$.subscribe((records) => { this.records = records; });
  }

  ngOnInit() {
  }

}
