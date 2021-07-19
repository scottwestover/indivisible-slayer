export default interface Storage {
  get(key: string): string | null;
  set(key: string, value: string): void;
}
