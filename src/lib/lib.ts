import { curry } from "ramda";
export const trace = curry((tag, x) => {
  console.log(`tag: ${tag}`, x);
  return x;
});
export const map = curry(function (f, any_functor_at_all) {
  return any_functor_at_all.map(f);
});
export const match = curry(function (what, x) {
  return x.match(what);
});
