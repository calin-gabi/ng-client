import {Route, Router} from '@angular/router';
import {LoginActions} from './../login/login.actions';
import {LoginService} from './../login/login.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {select} from '@angular-redux/store';
import {LocalStorageService} from '../../core/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public login: any;

  @select(['login', 'login'])
  private _login$: Observable<any>;

  constructor(private _loginService: LoginService,
              private _actions: LoginActions,
              private _router: Router,
              private _ls: LocalStorageService) {
    this._login$.subscribe((login) => {
      this.login = login;
    });
  }

  public logout() {
    this._loginService.logout().subscribe(
      (res) => {
        if (res) {
          this._actions.Logout();
          this._router.navigate(['login']);
          this._ls.clear('token');
        }
      }
    );
  }

  ngOnInit() {
  }

}
