import { curry } from "ramda";
import { Functor } from "../functors/Functor";

export const trace = curry((tag, x) => {
  console.log(`tag: ${tag}`, x);
  return x;
});

export const map = curry(function <T extends Functor<any>>(f: anyFunc, any_functor_at_all: T): T {
  return any_functor_at_all.map(f);
});


export const match = curry(function (what, x) {
  return x.match(what);
});

export type anyFunc = (a: any) => unknown;

export const id = function(a: any) {
  return a;
}