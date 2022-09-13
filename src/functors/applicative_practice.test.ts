import { ex1, ex2, ex3, ex4 } from "./applicative_practice";
import { Maybe } from "./Maybe";

describe("applicative", () => {
  it("ex1", () => {
    expect(ex1(1, 2)).toStrictEqual(Maybe.of(3));
    expect(ex1(1, null)).toStrictEqual(Maybe.of(null));
  });
  it("ex2", () => {
    expect(ex2(Maybe.of(1), Maybe.of(2))).toStrictEqual(Maybe.of(3));
    expect(ex2(Maybe.of(1), Maybe.of(null))).toStrictEqual(Maybe.of(null));
  });
  it("ex3", async () => {
    const result = await ex3;
    expect(result).toStrictEqual(
      "<div>Love them futures</div><li>This book should be illegal</li><li>Monads are like space burritos</li>"
    );
  });
  it("ex4", () => {
    const result = ex4.__value()
    expect(result).toStrictEqual("toby vs sally");
  });
});
