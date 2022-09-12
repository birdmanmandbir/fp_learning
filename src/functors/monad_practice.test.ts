import { Maybe } from "./Maybe";
import _ from "ramda";
import { ex1, ex2, ex3, ex4, user } from "./monad_practice";
import { either } from "./Either";
import { run } from "./IO";
import { join } from "../lib/lib";

describe("monad", () => {
  it("ex1", () => {
    expect(ex1(user)).toStrictEqual(Maybe.of("Walnut St"));
  });
  it("ex2", () => {
    const deleteFile = ex2();
    expect(deleteFile.__value()).toStrictEqual("logged monad");
  });
  it("ex3", async () => {
    const task = ex3(3);
    const comments = await task;
    expect(comments).toStrictEqual([
      { post_id: 3, body: "This book should be illegal" },
      { post_id: 3, body: "Monads are like smelly shallots" },
    ]);
  });
  it("ex4", () => {
    const io = _.compose(either(console.log, run), ex4);
    const emails = io("aa@qq.com");
    expect(emails).toStrictEqual("emailed: aa@qq.com");
    const emails2 = io("aa1@qq.com");
    expect(emails2).toStrictEqual("emailed: aa@qq.com,aa1@qq.com");
    const emails3 = io("aa1@qqcom");
    expect(emails3).not.toBeDefined();
  });
});
