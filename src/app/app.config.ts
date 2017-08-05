import { OpaqueToken } from '@angular/core';

export const APP_CONFIG = new OpaqueToken('app.config');

export interface IAppConfig {
    apiUrl: string;
}
export const AppConfig: IAppConfig = {
    apiUrl: 'http://localhost:9000/'
};

