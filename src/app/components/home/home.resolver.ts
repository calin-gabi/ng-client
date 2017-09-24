import {RecordsService} from './records/records.service';
import {RecordsActions} from './records/records.actions';
import {UsersActions} from './users/users.actions';
// import { Observable } from 'rxjs/Rx';
import {UsersService} from './users/users.service';
import {IAppState} from './../../core/store/store.module';
import {NgRedux} from '@angular-redux/store';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IRecord, Record} from './records/record';

@Injectable()
export class HomeResolver implements Resolve<any> {

  constructor(private _usersService: UsersService,
              private _recordsService: RecordsService,
              private _usersActions: UsersActions,
              private _recordsActions: RecordsActions,
              private _ngRedux: NgRedux<IAppState>) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this._usersService.getUsers()
      .catch((err) => {
        console.log(err);
        return Observable.of([]);
      })
      .map(
        (res) => {
          if (JSON.stringify(this._ngRedux.getState().users.users) !== JSON.stringify(res)) {
            this._usersActions.saveUsers(res);
          }
          let currentUser = this._ngRedux.getState().login.login;
          if (currentUser === {} && this._ngRedux.getState().users.users.length > 0) {
            currentUser = this._ngRedux.getState().users.users[0]['id'];
          }
          if (currentUser['id'] !== (this._ngRedux.getState().records.currentUser || {id: null})['id']) {
            this._recordsActions.saveCurrentUser(currentUser);
          }
          // console.log(currentUser);
          return currentUser;
        }
      )
      .flatMap((user) => {
        // console.log(user);
        return this._recordsService.getRecords(user['id'])
          .catch((error) => {
            return Observable.of([]);
          })
          .map(
            (records) => {
              // console.log(records);
              const recordsList = this._ngRedux.getState().records.records;
              if (JSON.stringify(recordsList) !== JSON.stringify(records)) {
                const records_ = records.map((elem) => {
                  return new Record(elem);
                });
                this._recordsActions.saveRecords(records_);
              }
              return records;
            }
          );
      });
  }
}
