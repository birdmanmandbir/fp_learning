import {
  compose,
  curry,
  head,
  last,
  prop,
  replace,
  add,
  split,
  map,
  filter,
  reduce,
  match,
  toLower,
  join,
  flip,
  sortBy,
} from "ramda";
import accounting from "accounting";

// 示例数据
export const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

// 练习 1:
// ============
// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
export const isLastInStock = compose(
  prop("in_stock"),
  last
);

// 练习 2:
// ============
// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
export const nameOfFirstCar = compose(prop("name"), head);

// 练习 3:
// ============
// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
export const _average = function (xs) {
  return reduce(add, 0, xs) / xs.length;
}; // <- 无须改动

export const averageDollarValue = compose(
  _average,
  map(function (c) {
    return c.dollar_value;
  })
);

// 练习 4:
// ============
// 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。

export const _underscore = replace(/\W+/g, "_"); //<-- 无须改动，并在 sanitizeNames 中使用它

export const sanitizeNames = compose(map(_underscore), map(toLower));

// 彩蛋 1:
// ============
// 使用 compose 重构 availablePrices
export const availablePrices = compose(
  join(", "),
  map(function (x) {
    return accounting.formatMoney(x.dollar_value);
  }),
  filter(prop("in_stock"))
);

// 彩蛋 2:
// ============
// 重构使之成为 pointfree 函数。提示：可以使用 _.flip()

const append = curry((a, b) => {
  return b + a;
});

export const fastestCar = compose(
  append(" is the fastest"),
  prop("name"),
  last,
  sortBy(prop("horsepower"))
);
