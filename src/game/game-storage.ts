import { InMemoryStorage, LocalStorage, Storage } from './lib/storage';

export default class GameStorage implements Storage {
  private static gameStorage: GameStorage;

  private internalStorage: Storage;

  private constructor() {
    if (typeof (window.Storage) !== 'undefined') {
      console.log('web storage is available');
      this.internalStorage = new LocalStorage();
    } else {
      console.log('web storage is not available');
      this.internalStorage = new InMemoryStorage();
    }
  }

  static get instance(): GameStorage {
    if (!GameStorage.gameStorage) {
      GameStorage.gameStorage = new GameStorage();
    }

    return GameStorage.gameStorage;
  }

  public get(key: string): string | null {
    return this.internalStorage.get(key);
  }

  public set(key: string, value: string): void {
    this.internalStorage.set(key, value);
  }
}
