import { IUsersStore, usersReducer } from './users.reducer';
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
}

export const ROOT_REDUCER = combineReducers<IAppState> ({
    login: loginReducer,
    users: usersReducer
});

export const ENHANCERS = [
  PERSIST_STATE('counter', { key: '@angular-redux/store/examples/counter' })
];

// const logger = createLogger({
//   // predicate, // if specified this function will be called before each action is processed with this middleware.
//   predicate: true,
//   // takes a Boolean or optionally a Function that receives `getState` function for 
//   // accessing current store state and `action` object as parameters. Returns `true` 
//   // if the log group should be collapsed, `false` otherwise.
//   duration: true, // print the duration of each action?
//   timestamp: true, // print the timestamp with each action?

//   level: 'log', // console's level

//   logger: console, // implementation of the `console` API.
//   logErrors: true, // should the logger catch, log, and re-throw errors?

//   diff: true // (alpha) show diff between states?
// });

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

