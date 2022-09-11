import { curry } from "ramda";
export const trace = curry((tag, x) => {
  console.log(`tag: ${tag}`, x);
  return x;
});
