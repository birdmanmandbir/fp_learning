import { IO } from "./IO";
import _, { add } from "ramda";
import { Maybe } from "./Maybe";
import { liftA2, promiseLiftA2 } from "../lib/lib";

// 模拟浏览器的 localStorage 对象
const mockLocalStorage: any = {};

// 练习 1
// ==========
// 写一个函数，使用 Maybe 和 ap() 实现让两个可能是 null 的数值相加。

//  ex1 :: Number -> Number -> Maybe Number
export const ex1 = (x: number | null, y: number | null) =>
  Maybe.of(add).ap(Maybe.of(x)).ap(Maybe.of(y));

// 练习 2
// ==========
// 写一个函数，接收两个 Maybe 为参数，让它们相加。使用 liftA2 代替 ap()。

//  ex2 :: Maybe Number -> Maybe Number -> Maybe Number
export const ex2 = liftA2(add);

// 练习 3
// ==========
// 运行 getPost(n) 和 getComments(n)，两者都运行完毕后执行渲染页面的操作。（参数 n 可以是任意值）。
function getPost(i: number) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve({ id: i, title: "Love them futures" });
    }, 300);
  });
}

function getComments(i: number) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve([
        "This book should be illegal",
        "Monads are like space burritos",
      ]);
    }, 300);
  });
}

const makeComments = _.reduce(function (acc, c) {
  return acc + "<li>" + c + "</li>";
}, "");

const render = _.curry(function (p, cs) {
  return "<div>" + p.title + "</div>" + makeComments(cs);
});

//  ex3 :: Task Error HTML
export const ex3 = promiseLiftA2(render, getPost(3), getComments(3));

// 练习 4
// ==========
// 写一个 IO，从缓存中读取 player1 和 player2，然后开始游戏。

mockLocalStorage.player1 = "toby";
mockLocalStorage.player2 = "sally";

const getCache = function (x: string): IO<() => string> {
  return new IO(function () {
    return mockLocalStorage[x];
  });
};
const game = _.curry(function (p1: string, p2: string) {
  return p1 + " vs " + p2;
});

//  ex4 :: IO String
export const ex4: IO<() => string> = liftA2(
  game,
  getCache("player1"),
  getCache("player2")
);
