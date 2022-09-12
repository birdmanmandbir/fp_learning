import _ from "ramda";
import { anyFunc } from "../lib/lib";
import { Functor } from "./Functor";

export class IO<T extends anyFunc> extends Functor<T> {
  static of(x: anyFunc) {
    return new IO(function () {
      return x;
    });
  }

  map<V extends anyFunc>(f: V) {
    return new IO(_.compose(f, this.__value));
  }
}

