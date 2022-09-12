import { curry } from "ramda";
import _ from "ramda";
import { Functor } from "../functors/Functor";

export const trace = curry((tag, x) => {
  console.log(`tag: ${tag}`, x);
  return x;
});

export const map = curry(function <T extends Functor<any>>(
  f: anyFunc,
  any_functor_at_all: T
): T {
  return any_functor_at_all.map(f);
});

export const match = curry(function (what, x) {
  return x.match(what);
});

export type anyFunc = (a?: any) => unknown;

export const id = function (a: any) {
  return a;
};

// TODO Too much any!
export const join = (f: any) => {
  return f.join();
};

export const flatMap = curry(function (f: anyFunc, m: Functor<any>) {
  return _.compose(join, map(f))(m);
});

const promiseJoin = (m: Promise<any>) => m.then(id);

const promiseOf = (x: any) =>
  new Promise((resolve, reject) => {
    resolve(x);
  });

const promiseMap = curry((f: anyFunc, m: Promise<any>) => m.then(f));

export const promiseFlatMap = curry((f: anyFunc, m: Promise<any>) => {
  return _.compose(promiseJoin, promiseMap(f))(m);
});
