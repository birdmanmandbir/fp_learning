import { ary, curry } from "lodash";

export const match = curry(function (what, str) {
  return str.match(what);
});

export const replace = curry(function (what, replacement, str) {
  return str.replace(what, replacement);
});

export const filter = curry(function (f, ary) {
  return ary.filter(f);
});

export const map = curry(function (f, ary) {
  return ary.map(f);
});

export const reduce = curry(function (f, initValue, ary) {
  return ary.reduce(f, initValue);
});

export const split = curry(function (what, str) {
  return str.split(what);
});
