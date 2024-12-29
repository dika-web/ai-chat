import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private _storage: Storage) {}

  get<T>(key: string): T | null {
    const item = this._storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set<T>(key: string, value: T) {
    this._storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this._storage.removeItem(key);
  }

  clear() {
    this._storage.clear();
  }
}
