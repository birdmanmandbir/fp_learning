import { IO } from "../functors/IO";
import { Maybe } from "../functors/Maybe";
import _ from "ramda";

//  io_window_ :: IO Window
var io_window = new IO(function () {
  return window;
});

io_window.map(function (win: Window) {
  return win.innerWidth;
});
// IO(1430)

io_window.map(_.prop("location")).map(_.prop("href")).map(_.split("/"));
// IO(["http:", "", "localhost:8000", "blog", "posts"])

//  $ :: String -> IO [DOM]
var $ = function (selector: any) {
  return new IO(function () {
    return document.querySelectorAll(selector);
  });
};

$("#myDiv")
  .map(_.head)
  .map(function (div) {
    return div.innerHTML;
  });
// IO('I am some inner html')

////// 纯代码库: lib/params.js ///////

//  url :: IO String
var url = new IO(function() { return window.location.href; });

//  toPairs =  String -> [[String]]
var toPairs = _.compose(_.map(_.split('=')), _.split('&'));

//  params :: String -> [[String]]
var params = _.compose(toPairs, _.last, _.split('?'));

const eq = _.curry((a: string, b: string) => a == b);

//  findParam :: String -> IO Maybe [String]
var findParam = function(key: string) {
  return _.map(_.compose(Maybe.of, _.filter(_.compose(eq(key), _.head)), params), url);
};

////// 非纯调用代码: main.js ///////

// 调用 __value() 来运行它！
findParam("searchTerm").__value();
// Maybe(['searchTerm', 'wafflehouse'])
