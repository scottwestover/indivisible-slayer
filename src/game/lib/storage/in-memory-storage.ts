import Storage from './storage';

export default class InMemoryStorage implements Storage {
  private data: { [key: string]: string };

  constructor() {
    this.data = {};
  }

  public get(key: string): string | null {
    if (!this.data[key]) {
      return null;
    }
    return this.data[key];
  }

  public set(key: string, value: string): void {
    this.data[key] = value;
  }
}
