export class Functor<T> {
  __value: T;
  constructor(x: T) {
    this.__value = x;
  }
  toString() {
    console.log(`{${this.__value}}`);
  }
  map(f: any) {
    return f(this.__value);
  }
}
