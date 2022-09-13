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

export const liftA2 = curry(function (
  f: anyFunc,
  functor1: Functor<any>,
  functor2: Functor<any>
) {
  return functor1.map(f).ap(functor2);
});

export const liftA3 = curry(function (f, functor1, functor2, functor3) {
  return functor1.map(f).ap(functor2).ap(functor3);
});

export const promiseAp = curry(
  (other_functor: Promise<any>, this_functor: Promise<any>) => {
    return other_functor.then(this_functor.then);
  }
);

export const promiseLiftA2 = curry(function (
  f,
  functor1: Promise<any>,
  functor2: Promise<any>
) {
  // TODO 不知道为啥用(x) => functor2.then(x), 直接用functor2.then就报错
  return functor1.then(f).then((x) => functor2.then(x));
});
