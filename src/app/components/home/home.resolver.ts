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
        private _ngRedux: NgRedux<IAppState>
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this._usersService.getUsers()
            .catch((err) => {
                console.log(err);
                return Observable.of({});
            })
            .map(
                (res) => {
                    console.log(res);
                    return res;
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
