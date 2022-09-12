import { Left, Right } from "./Either";
import {
  ex1,
  ex2,
  ex3,
  ex4,
  ex5,
  ex6,
  ex7,
  ex8,
  user,
  xs,
} from "./functor_practise";
import { Identity } from "./Identity";
import { Maybe } from "./Maybe";

describe("functor practice", () => {
  it("ex1", () => {
    expect(ex1(Identity.of(3))).toStrictEqual(Identity.of(4));
  });
  it("ex2", () => {
    expect(ex2(xs)).toStrictEqual(Identity.of("do"));
  });
  it("ex3", () => {
    expect(ex3(user)).toStrictEqual(Maybe.of("A"));
  });
  it("ex4", () => {
    expect(ex4("12")).toStrictEqual(Maybe.of(12));
    expect(ex4(null)).toStrictEqual(Maybe.of(null));
  });
  it("ex5", () => {
    const task = ex5(3);
    // 异步的，如果报错，jest检测不到，但日志可以打出来
    // @ts-ignore
    task.fork(
      function (err: string) {
        console.error(err);
      },
      function (title: string) {
        expect(title).toStrictEqual("LOVE THEM FUTURES");
      }
    );
  });
  it("ex6", () => {
    expect(ex6({ id: 2, name: "neil", active: true })).toStrictEqual(
      Right.of("Welcome neil")
    );
    expect(ex6({ id: 2, name: "neil", active: false })).toStrictEqual(
      Left.of("Your account is not active")
    );
  });
  it("ex7", () => {
    const str1 = "aaaaa";
    const str2 = "a";
    expect(ex7(str1)).toStrictEqual(Right.of(str1));
    expect(ex7(str2)).toStrictEqual(Left.of("You need > 3"));
  });
  it("ex8", () => {
    const validIO = ex8({id: 12, name: "aaaaa"})
    expect(validIO.__value()).toStrictEqual('aaaaa-saved')
    const invalidIO = ex8({id: 12, name: "aa"})
    expect(invalidIO.__value()).toStrictEqual("You need > 3")
  })
});
