import { appConfigProd } from './../app/app.config.prod';
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import {
  enableDebugTools,
  disableDebugTools
} from '@angular/platform-browser';
import {
  ApplicationRef,
  enableProdMode
} from '@angular/core';
// Environment Providers
const PROVIDERS: any[] = [
  { provide: 'AppConfig', useFactory: getConfig }
];

export function getConfig() {
  return appConfigProd;
}

export const environment = {
  production: true
};
