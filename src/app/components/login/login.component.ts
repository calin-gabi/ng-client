import { LoginActions } from './login.actions';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public username: string = null;

  constructor(
    private _loginService: LoginService,
    private _actions: LoginActions
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  public submitLogin(form: FormGroup) {
      this._loginService.login(
        form.get('username').value,
        form.get('password').value)
        .subscribe((res) => {
          this._actions.saveLogin(res);
          this._loginService.onLogged();
        }, (error) => {
          console.log(error);
        });
  }

}
