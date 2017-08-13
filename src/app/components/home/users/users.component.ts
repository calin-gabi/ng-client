import { RecordsActions } from './../records/records.actions';
import { RecordsService } from './../records/records.service';
import { UsersService } from './users.service';
import { Observable } from 'rxjs/Rx';
import { select } from '@angular-redux/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<any>;

  @select(['users', 'users'])
  private _users$: Observable<any>;

  constructor(
    private _usersService: UsersService,
    private _recordsService: RecordsService,
    private _actionsRecords: RecordsActions
  ) {
    this._users$.subscribe((users) => { this.users = users; });
  }

  public selectUser(user: any) {
    this._recordsService.getRecords(user.id).subscribe(
      (res) => {
        console.log(res);
        this._actionsRecords.saveCurrentUserId(user.id);
        this._actionsRecords.saveRecords(res);
      },
      (err) => {
        console.log(err);
      }
     );
  }

  ngOnInit() {
  }

}
