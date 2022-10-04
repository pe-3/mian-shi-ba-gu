[toc]
# call, apply, bind 的实现

## 三兄弟的作用

- 改变函数运行时上下文（this指向）

## 三兄弟的区别

主要是参数的区别

1. 第一个参数都是要绑定的上下文对象
2. 第二个参数 apply则是参数数组 
3. call则是除了第一个参数其余的参数都作为函数的参数
4. bind不会立即调用，其他两个会立即调用

## call 和 apply 的实现

- 首先它们是Function 原型上的方法
- 显示绑定this，将方法放到传入的上下文对象上即可
- 调用完成，解除绑定即可防止污染

```js
Function.prototype.call = function(context, ...args){
    const ctx = context || window;
    // ctx是要绑定的上下文
    // 当前this是被绑定的函数
    ctx.func = this;
    
    const res = args.lenght? ctx.func(...args): ctx.func();
    // 解除this绑定，防止污染对象 
    delete ctx.func
    return res;
}
```

```js
Function.prototype.apply = function(context, args){
    const ctx = context || window;
    // ctx是要绑定的上下文
    // 当前this是被绑定的函数
    ctx.func = this;
    
    const res = args.lenght? ctx.func(...args): ctx.func();
    // 解除this绑定，防止污染对象 
    delete ctx.func
    return res;
}
```

## bind 的实现呐

```js
Function.prototype.bind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('Bind must be called on a function')
    }
    const that = this;
    function Obj() { }
    function newFunc(...args2) {
        if (this instanceof newFunc) {
            return that.apply(this, args.concat(args2));
        }
        return that.apply(context, args.concat(args2));
    }
    Obj.prototype = that.prototype;
    newFunc.prototype = new Obj();
    return newFunc;
}
```