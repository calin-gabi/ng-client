import { LocalStorageService } from './../local-storage.service';
import { IAppConfig } from './../../app.config';
import { HttpHandlerService } from './http-handler.service';
import { XHRBackend, RequestOptions } from '@angular/http';
import { ApiDataHandler } from './api-data-handler';
import { NgModule } from '@angular/core';

export function getApiDataHandler(
  backend: XHRBackend,
  options: RequestOptions,
  window: Window,
  _appConfig: IAppConfig
) {
  return new ApiDataHandler(backend, options, new LocalStorageService(window), _appConfig);
}

@NgModule({
  imports: [],
  providers: [
    {
      provide: ApiDataHandler,
      useFactory: getApiDataHandler,
      deps: [XHRBackend, RequestOptions, 'Window', 'AppConfig']
    },
    HttpHandlerService
  ]
})
export class ApiModule {

}
