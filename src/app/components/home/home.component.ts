import { Route, Router } from '@angular/router';
import { LoginActions } from './../login/login.actions';
import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public login: any;

  @select(['login', 'login'])
  private _login$: Observable<any>;

  constructor(
    private _loginService: LoginService,
    private _actions: LoginActions,
    private _router: Router
  ) {
    this._login$.subscribe((login) => {
      this.login = login;
    });
  }

  public logout() {
    this._loginService.logout().subscribe(
      (res) => {
        if (res) {
          this._router.navigate(['login']);
        }
      }
    );
  }
  ngOnInit() {
  }

}
