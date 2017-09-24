import {GapiManagerService} from './../../core/gapi-manager/gapi-manager.service';
import {LocalStorageService} from './../../core/local-storage.service';
import {LoginActions} from './login.actions';
import {LoginService} from './login.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public username: string = null;

  constructor(private _loginService: LoginService,
              private _gapiManagerService: GapiManagerService) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  public submitLogin(form: FormGroup) {
    const payload = {
      username: form.get('username').value,
      password: form.get('password').value
    };
    this._loginService.login(payload, 'basic');
  }

  public loginGoogle() {
    const sub: Subject<any> = new Subject();
    this._gapiManagerService.login().subscribe(
      (result) => {
        console.log(result);
        sub.next(result);
      });
    sub.subscribe(
      result => {
        setTimeout(() => { this._loginService.onLoggedIn(result); }, 500);
      }
    );
  }

  ngOnInit() {
    setTimeout(() => { this._gapiManagerService.getAuth(); }, 1000);
  }
}
