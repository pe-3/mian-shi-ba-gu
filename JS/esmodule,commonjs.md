[参考 ： https://juejin.cn/post/6935973925004247077](https://juejin.cn/post/6935973925004247077)
```js
```

# Javascript 中的 CJS, AMD, UMD 和 ESM是什么？

1. cjs : common JS
2. AMD : 异步模块定义
3. UMD : ?
4. ESM : es6 module


## cjs

- 当 CJS 导入时，它会给你一个导入对象的副本
- CJS 不能在浏览器中工作。它必须经过转换和打包
- 是同步导入
- 导入的是对象的一个副本
- 不同引用之间的修改不影响
- 模块运行时进行加载
- 但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- this指向当前模块

```js
// importing 
const doSomething = require('./doSomething.js'); 

// exporting
module.exports = function doSomething(n) {
  // do something
}
```

## AMD

- AMD 是异步(asynchronously)导入模块的(因此得名)
- 一开始被提议的时候，AMD 是为前端而做的(而 CJS 是后端)
- AMD 的语法不如 CJS 直观。我认为 AMD 和 CJS 完全相反

```js
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});

```

## UMD

- 在前端和后端都适用（“通用”因此得名）
- 与 CJS 或 AMD 不同，UMD 更像是一种配置多个模块系统的模式。这里可以找到更多的模式
- 当使用 Rollup/Webpack 之类的打包器时，UMD 通常用作备用模块

```js
(function(root, factory){

    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }

})(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
})
```


## ESM

es6 模块语法


```js
<script type="module">
  import {func1} from 'my-lib';

  func1();
</script>
```

- 在很多现代浏览器可以使用
- 它兼具两方面的优点：具有 CJS 的简单语法和 AMD 的异步
- 得益于 ES6 的静态模块结构，可以进行 Tree Shaking
- ESM 允许像 Rollup 这样的打包器，删除不必要的代码，减少代码包可以获得更快的加载
- 异步加载
- 值的引用
- 编译时进行加载
- this指向undefined