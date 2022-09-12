import _ from "ramda";
import { IO } from "./IO";
import { Maybe } from "./Maybe";
import { Left, Right } from "./Either";
import {
  anyFunc,
  flatMap,
  map,
  promiseFlatMap,
} from "../lib/lib";

const __filename = "hello/monad";

// 练习 1
// ==========
// 给定一个 user，使用 safeProp 和 map/join 或 chain 安全地获取 street 的 name

const safeProp = _.curry(function (x, o) {
  return Maybe.of(o[x]);
});
export const user = {
  id: 2,
  name: "albert",
  address: {
    street: {
      number: 22,
      name: "Walnut St",
    },
  },
};

export const ex1: (u: typeof user) => string = _.compose(
  flatMap(safeProp("name")),
  flatMap(safeProp("street")),
  safeProp("address")
);

// 练习 2
// ==========
// 使用 getFile 获取文件名并删除目录，所以返回值仅仅是文件，然后以纯的方式打印文件

const getFile = function () {
  return new IO(function () {
    return __filename;
  });
};

const pureLog = function (x: string) {
  return new IO(function () {
    console.log(x);
    return "logged " + x;
  });
};

export const ex2: () => IO<() => string> = _.compose(
  flatMap(_.compose(pureLog, _.last, _.split("/"))),
  getFile
);

// 练习 3
// ==========
// 使用 getPost() 然后以 post 的 id 调用 getComments()
const getPost = function (i: number) {
  return new Promise(function (resolve: anyFunc, reject: anyFunc) {
    setTimeout(function () {
      resolve({ id: i, title: "Love them tasks" });
    }, 300);
  });
};

const getComments = function (i: number) {
  return new Promise(function (resolve: anyFunc, reject: anyFunc) {
    setTimeout(function () {
      resolve([
        { post_id: i, body: "This book should be illegal" },
        { post_id: i, body: "Monads are like smelly shallots" },
      ]);
    }, 300);
  });
};

interface Post {
  id: number;
  title: string;
}

interface Comment {
  post_id: number;
  body: string;
}

// Good example, task only define the process, but fork is only executed by impure functions
const post2Comments: (p: Post) => Promise<Comment[]> = _.compose(
  getComments,
  _.prop("id")
);
export const ex3: (id: number) => Promise<Comment[]> = _.compose(
  promiseFlatMap(post2Comments),
  getPost
);

// 练习 4
// ==========
// 用 validateEmail、addToMailingList 和 emailBlast 实现 ex4 的类型签名

//  addToMailingList :: Email -> IO([Email])

const addToMailingList = (function (list: string[]) {
  return function (email: string) {
    return new IO(function () {
      list.push(email);
      return list;
    });
  };
})([]);

function emailBlast(list: string[]) {
  return new IO(function () {
    return "emailed: " + list.join(",");
  });
}

const validateEmail = function (x: string) {
  return x.match(/\S+@\S+\.\S+/) ? new Right(x) : new Left("invalid email");
};

const processEmails: (email: string) => IO<() => string> = _.compose(
  flatMap(emailBlast),
  addToMailingList
);

// 注意validateEmail返回是Either,  直接join即可作为下一步参数, 但这样就失去校验的目的, 因此使用map
//  ex4 :: Email -> Either String (IO String)
export const ex4: (e: string) => Right<IO<() => string>> | Left<string> =
  _.compose(map(processEmails), validateEmail);
