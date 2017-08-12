import { RecordsService } from './records/records.service';
import { RecordsActions } from './records/records.actions';
import { UsersActions } from './users/users.actions';
// import { Observable } from 'rxjs/Rx';
import { UsersService } from './users/users.service';
import { IAppState } from './../../core/store/store.module';
import { NgRedux } from '@angular-redux/store';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeResolver implements Resolve<any> {

    constructor(
        private _usersService: UsersService,
        private _recordsService: RecordsService,
        private _usersActions: UsersActions,
        private _recordsActions: RecordsActions,
        private _ngRedux: NgRedux<IAppState>
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this._usersService.getUsers()
            .catch((err) => {
                console.log(err);
                return Observable.of([]);
            })
            .map(
                (res) => {
                    console.log(res);
                    const usersList = this._ngRedux.getState().users.users;
                    if (usersList !== res) {
                        this._usersActions.saveUsers(res);
                    }
                    let currentUserId = this._ngRedux.getState().login.login['id'];
                    if (usersList.length > 0) {
                        currentUserId = usersList[0]['id'];
                    }
                    if (currentUserId !== this._ngRedux.getState().records.curentUserId) {
                        this._recordsActions.saveCurrentUserId(currentUserId);
                    }
                    return this._recordsService.getRecords(currentUserId)
                        .catch((error) => {
                            return Observable.of([]);
                        })
                        .map(
                            (records) => {
                                console.log(records);
                                return records;
                            }
                        );
                }
            );
    }
}
