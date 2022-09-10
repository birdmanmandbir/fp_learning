import {
  words,
  sentences,
  filterQs,
  max,
  take,
  takeThree,
  slice,
} from "./curry_practice";

describe("curry practice test", () => {
  it("words", () => {
    expect(words("a basketball")).toStrictEqual(["a", "basketball"]);
  });
  it("sentences", () => {
    expect(
      sentences(["a basketball", "become a human", "in beautiful sky"])
    ).toStrictEqual([
      ["a", "basketball"],
      ["become", "a", "human"],
      ["in", "beautiful", "sky"],
    ]);
  });
  it("filterQs", () => {
    expect(
      filterQs(["quick", "camels", "quarry", "over", "quails"])
    ).toStrictEqual(["quick", "quarry", "quails"]);
  });
  it("max", () => {
    expect(max([1, 3, 15])).toBe(15);
  });
  it("take", () => {
    expect(take(2, [1, 3, 15])).toStrictEqual([1, 3]);
  });
  it("takeThree", () => {
    expect(takeThree([1, 3, 15])).toStrictEqual([1, 3, 15]);
  });
  it("slice", () => {
    expect(slice(0, 2, [1, 3, 15])).toStrictEqual([1, 3]);
  });
});
