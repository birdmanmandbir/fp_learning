// @ts-ignore
import Task from "data.task";
import _ from "ramda";
import { anyFunc, id, map } from "../lib/lib";
import { either, Left, Right } from "./Either";
import { Identity } from "./Identity";
import { IO } from "./IO";
import { Maybe } from "./Maybe";

// 练习 1
// ==========
// 使用 _.add(x,y) 和 _.map(f,x) 创建一个能让 functor 里的值增加的函数

export const ex1: (i: Identity<number>) => Identity<number> = map(_.add(1));

//练习 2
// ==========
// 使用 _.head 获取列表的第一个元素
export const xs = Identity.of([
  "do",
  "ray",
  "me",
  "fa",
  "so",
  "la",
  "ti",
  "do",
]);

export const ex2: (i: Identity<string[]>) => Identity<string> = map(_.head);

// 练习 3
// ==========
// 使用 safeProp 和 _.head 找到 user 的名字的首字母
export const safeProp = _.curry(function (x, o) {
  return Maybe.of(o[x]);
});

export const user = { id: 2, name: "Albert" };

export const ex3: (u: User) => Maybe<string> = _.compose(
  map(_.head),
  safeProp("name")
);

// 练习 4
// ==========
// 使用 Maybe 重写 ex4，不要有 if 语句

export const ex4: (x: string | null) => Maybe<number> = _.compose(
  map(parseInt),
  Maybe.of
);

// 练习 5
// ==========
// 写一个函数，先 getPost 获取一篇文章，然后 toUpperCase 让这片文章标题变为大写

// getPost :: Int -> Future({id: Int, title: String})
const getPost = function (i: number) {
  return new Task(function (rej: anyFunc, res: anyFunc) {
    setTimeout(function () {
      res({ id: i, title: "Love them futures" });
    }, 300);
  });
};

export const ex5 = _.compose(map(_.toUpper), map(_.prop("title")), getPost);

// 练习 6
// ==========
// 写一个函数，使用 checkActive() 和 showWelcome() 分别允许访问或返回错误

interface User {
  id: number;
  name: string;
  active?: boolean;
}

const add = _.curry(function (a: number | string, b: number | string) {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
});

const showWelcome = _.compose(add("Welcome "), _.prop("name"));

const checkActive = function (user: User) {
  return user.active ? Right.of(user) : Left.of("Your account is not active");
};

export const ex6: (u: User) => Left<string> | Right<string> = _.compose(
  map(showWelcome),
  checkActive
);

// 练习 7
// ==========
// 写一个验证函数，检查参数是否 length > 3。如果是就返回 Right(x)，否则就返回
// Left("You need > 3")

export const ex7: (s: string) => Right<string> | Left<string> = function (
  x: string
) {
  return x.length > 3 ? Right.of(x) : Left.of("You need > 3"); // <--- write me. (don't be pointfree)
};

// 练习 8
// ==========
// 使用练习 7 的 ex7 和 Either 构造一个 functor，如果一个 user 合法就保存它，否则
// 返回错误消息。别忘了 either 的两个参数必须返回同一类型的数据。

const save = function (x: string) {
  return new IO(function () {
    console.log("SAVED USER!");
    return x + "-saved";
  });
};

export const ex8: (u: User) => IO<() => string> = _.compose(
  either(IO.of, save),
  ex7,
  _.prop("name")
);
