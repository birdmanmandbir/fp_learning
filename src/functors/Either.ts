import { curry } from "ramda";
import _ from "ramda";
import moment from "moment";
import { Functor } from "./Functor";
import { anyFunc, map } from "../lib/lib";

export class Left<T> extends Functor<T> {
  static of<V>(x: V) {
    return new Left<V>(x);
  }
  map(f: any) {
    return this;
  }
}

export class Right<T> extends Functor<T> {
  static of<V>(x: V) {
    return new Right<V>(x);
  }
  map(f: any) {
    return Right.of(f(this.__value));
  }
}

Right.of("rain")
  .map(function (str: string) {
    return "b" + str;
  })
  .toString();
// Right("brain")

Left.of("rain")
  .map(function (str: string) {
    return "b" + str;
  })
  .toString();
// Left("rain")

Right.of({ host: "localhost", port: 80 }).map(_.prop("host")).toString();
// Right('localhost')

Left.of("rolls eyes...").map(_.prop("host")).toString();
// Left('rolls eyes...')

//  getAge :: Date -> User -> Either(String, Number)
const getAge = curry(function (now, user) {
  const birthdate = moment(user.birthdate, "YYYY-MM-DD");
  if (!birthdate.isValid()) return Left.of("Birth date could not be parsed");
  return Right.of(now.diff(birthdate, "years"));
});

getAge(moment(), { birthdate: "2005-12-12" });
// Right(9)

getAge(moment(), { birthdate: "balloons!" });
// Left("Birth date could not be parsed")

const Num2String = curry((a: number) => `${a}`);

//  fortune :: Number -> String
const fortune = _.compose(
  _.concat("If you survive, you will be "),
  Num2String,
  _.add(1)
);

//  zoltar :: User -> Either(String, _)
const zoltar = _.compose(map(console.log), map(fortune), getAge(moment()));

zoltar({ birthdate: "2005-12-12" });
// "If you survive, you will be 10"
// Right(undefined)

zoltar({ birthdate: "balloons!" });
// Left("Birth date could not be parsed")
// 由于Left的map实际上均不会执行，因此Left的值不会被打印

export const either = curry(function <T>(f: anyFunc, g: anyFunc, e: Functor<T>) {
  switch (e.constructor) {
    case Left:
      return f(e.__value);
    case Right:
      return g(e.__value);
  }
});

const id = (a: any) => a;

// 由于Left的map实际上均不会执行，因此Left的值不会被打印， 因此需要id复制一下值
//  zoltar :: User -> _
var zoltar1 = _.compose(console.log, either(id, fortune), getAge(moment()));

zoltar1({ birthdate: "2005-12-12" });
// "If you survive, you will be 10"
// undefined

zoltar1({ birthdate: "balloons!" });
// "Birth date could not be parsed"
// undefined
