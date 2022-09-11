import {
    availablePrices,
  averageDollarValue,
  CARS,
  fastestCar,
  isLastInStock,
  nameOfFirstCar,
  sanitizeNames,
} from "./compose_practice";

describe("compose practice", () => {
  it("isLastInStock", () => {
    expect(isLastInStock(CARS)).toBe(false);
  });
  it("nameOfFirstCar", () => {
    expect(nameOfFirstCar(CARS)).toStrictEqual("Ferrari FF");
  });
  it("averageDollarValue", () => {
    expect(averageDollarValue(CARS)).toBe(790700);
  });
  it("sanitizeNames", () => {
    expect(sanitizeNames(["Hello World"])).toStrictEqual(["hello_world"]);
  });
  it("availablePrices", () => {
    expect(availablePrices(CARS)).toStrictEqual("$700,000.00, $1,850,000.00");
  });
  it("fastestCar", () => {
    expect(fastestCar(CARS)).toStrictEqual("Aston Martin One-77 is the fastest")
  })
});
