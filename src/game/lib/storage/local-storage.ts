import Storage from './storage';

export default class LocalStorage implements Storage {
  constructor() {
    if (typeof (window.Storage) === 'undefined') {
      throw new Error('HTML Web Storage is not available');
    }
  }

  public get(key: string): string | null {
    return localStorage.getItem(key);
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
