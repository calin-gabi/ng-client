import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LocalStorageService {
    private _storage = {};
    private _window: Window;
    private _namespace = 'hm';

    constructor( @Inject('Window') window: any) { this._window = window as Window; }

    public set(key, value) {
        try {
            this._window.localStorage[this._namespace + '_' + key] = value;
        } catch (e) {
            this._storage[this._namespace + '_' + key] = value;
        }
    }

    public remove(key) {
        try {
            this._window.localStorage.removeItem(this._namespace + '_' + key);
        } catch (e) {
            this._storage[this._namespace + '_' + key] = null;
        }
    }

    public get(key, defaultValue) {
        try {
            return this._window.localStorage[this._namespace + '_' + key];
        } catch (e) {
            return this._storage[this._namespace + '_' + key] || defaultValue;
        }
    }

    public setObject(key, value) {
        try {
            this._window.localStorage[this._namespace + '_' + key] = JSON.stringify(value);
        } catch (e) {
            this._storage[this._namespace + '_' + key] = JSON.stringify(value);
        }
    }

    public clear() {
        try {
            this._window.localStorage.clear();
        } catch (e) {
            this._storage = {};
        }

    }

    public getObject(key) {
        try {
            return JSON.parse(this._window.localStorage[this._namespace + '_' + key] || '{}');
        } catch (e) {
            return JSON.parse(this._storage[this._namespace + '_' + key] || '{}');
        }
    }
}
