import { LoginService } from './../login/login.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required, (control) => {
        return this.validUsername(control);
      }),
      password: new FormControl('', Validators.required, (control) => {
        return this.validPassword(control);
      }),
      passwordRepeat: new FormControl()
    }, this.matchingPasswords('password', 'passwordRepeat'));
  }

  private validUsername(control: AbstractControl) {
    const userNameExists = true;
    if (userNameExists) {
      return Observable.create((obs) => {
        obs.next({ usernameExists: true});
      });
    } else {
      return null;
    }
  }

  private validPassword(control: AbstractControl) {
    const userPasswordValid = true;
    if (userPasswordValid) {
      return Observable.create((obs) => {
        obs.next({ passwordValid: true});
      });
    } else {
      return null;
    }
  }

  private mailFormat(control: FormControl) {
    // tslint:disable
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    // tslint:enable
    if (control === null || control.value === null) {
      return null;
    }
    if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { incorrectMailFormat: true };
    }

    return {};
  }

  private matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (confirmPassword.pristine) {
        return {};
      }
      if (password.value !== confirmPassword.value && password.value !== '' && confirmPassword.value !== '') {
        confirmPassword.setErrors({
          mismatchedPasswords: true,
        });
        return {
          mismatchedPasswords: true
        };
      }
    };
  }

  public submitRegister(form: FormGroup) {
    if (form.valid) {
      this._loginService.login(
        form.get('username').value,
        form.get('password').value)
        .subscribe((res) => {
          console.log(res);
        }, (error) => {
        });
    } else {
      console.log('form invalid');
    }
  }

}
