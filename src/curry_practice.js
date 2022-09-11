import {
  curry,
  split,
  map,
  filter,
  reduce
} from "ramda";

// 练习 1
//==============
// 通过局部调用（partial apply）移除所有参数
export const words = split(" ");

// 练习 1a
//==============
// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组

export const sentences = map(words);

export const match = curry(function(what, x) {
  return x.match(what);
});
// 练习 2
//==============
// 通过局部调用（partial apply）移除所有参数
export const filterQs = filter(match(/q/i));

// 练习 3
//==============
// 使用帮助函数 `_keepHighest` 重构 `max` 使之成为 curry 函数

// 无须改动:
var _keepHighest = function (x, y) {
  return x >= y ? x : y;
};

// 重构这段代码:
export const max = reduce(_keepHighest, -Infinity);

// 彩蛋 1:
// ============
// 包裹数组的 `slice` 函数使之成为 curry 函数
// //[1,2,3].slice(0, 2)
export const slice = curry(function (start, end, ary) {
  return ary.slice(start, end);
});

// 彩蛋 2:
// ============
// 借助 `slice` 定义一个 `take` curry 函数，该函数调用后可以取出字符串的前 n 个字符。
export const take = slice(0);
export const takeThree = take(3);
