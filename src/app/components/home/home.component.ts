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

  constructor() {
    this._login$.subscribe((login) => { this.login = login; });
  }

  ngOnInit() {
  }

}
