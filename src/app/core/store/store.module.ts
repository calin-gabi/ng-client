import { IRecordsStore, recordsReducer } from './records.reducer';
import { INITIAL_STATE, IUsersStore, usersReducer} from './users.reducer';
import { IAppState } from './store.module';
import { IAppConfig } from './../../app.config';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { NgModule, ModuleWithProviders, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createLogger } from 'redux-logger';

import { ILoginStore, loginReducer } from './login.reducer';

declare var require: any;

const PERSIST_STATE = require('redux-localstorage');

export interface IAppState {
    login?: ILoginStore;
    users?: IUsersStore;
    records?: IRecordsStore;
}

export const APP_REDUCER = combineReducers<IAppState> ({
    login: loginReducer,
    users: usersReducer,
    records: recordsReducer
});

export const ROOT_REDUCER = (state, action) => {
  if (action.type === 'LOGIN_SAVE_LOGOUT') {
    state = {
      login: {},
      users: [],
      records: {
        currentUser: {},
        records: []
      }
    };
  }
  return APP_REDUCER(state, action);
}

export const ENHANCERS = [
  PERSIST_STATE('counter', { key: '@angular-redux/store/examples/counter' })
];

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule
  ],
  declarations: []
})
export class StoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule,
      providers: [
      ]
    };
  }
  constructor(
    public store: NgRedux<IAppState>,
    private _ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    devTool: DevToolsExtension,
    @Inject('AppConfig') private _appConfig: IAppConfig
  ) {
    store.configureStore(
      ROOT_REDUCER,
      {},
      [ createLogger()],
      devTools.isEnabled() ? [ devTools.enhancer() ] : []);
  }
}

