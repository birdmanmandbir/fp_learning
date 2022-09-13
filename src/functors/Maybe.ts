import _ from "ramda";
import { match } from "../lib/lib";
import { Functor } from "./Functor";

export class Maybe<T> extends Functor<T> {
  // TODO any is not good
  static of(x: any) {
    return new Maybe<any>(x);
  }
  isNothing() {
    return this.__value === null || this.__value === undefined;
  }
  // TODO any is not good
  map(f: any) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
  }
  join() {
    return this.isNothing() ? Maybe.of(null) : this.__value;
  }
  ap(other_functor: Functor<any>) {
    return this.isNothing() ? Maybe.of(null) : other_functor.map(this.__value);
  }
}

Maybe.of("Malkovich Malkovich").map(match(/a/gi)).toString();
//=> Maybe(['a', 'a'])

Maybe.of(null).map(match(/a/gi)).toString();
//=> Maybe(null)

Maybe.of({ name: "Boris" }).map(_.prop("age")).map(_.add(10)).toString();
//=> Maybe(null)

Maybe.of({ name: "Dinah", age: 14 })
  .map(_.prop("age"))
  .map(_.add(10))
  .toString();
//=> Maybe(24)
