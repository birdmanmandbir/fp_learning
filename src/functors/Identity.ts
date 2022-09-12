import { anyFunc } from "../lib/lib";
import { Functor } from "./Functor";

export class Identity<T> extends Functor<T> {
    static of<V>(x: V) {
      return new Identity<V>(x);
    }
  
    map(f: anyFunc) {
      return Identity.of(f(this.__value));
    }
  }
  