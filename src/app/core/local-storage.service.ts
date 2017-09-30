import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LocalStorageService {
    public _wls: Window;

    constructor(
        @Inject('Window') private wls: any
    ) {
        this._wls = this.wls as Window;
    }

    public set(key: string, value: string) {
        this._wls.localStorage.setItem(key, value);
    }

    public get(key: string, defaultValue: string) {
        return this._wls.localStorage.getItem(key) || defaultValue;
    }

    public clear(key: string): void {
      if (key) {
        this._wls.localStorage.removeItem(key);
      } else {
        this._wls.localStorage.clear();
      }
    }
}
