[toc]
# super关键字

super关键字用于访问和调用一个对象的父对象的函数

```js
constructor(...args){
    super(...args);
    super.Func();
}
```

## super(name) 相当于 

```js
sup.prototype.constructor.call(this,name);
```

## 如果在子类中不使用super关键字，则会报错，是因为子类没有自己的this对象，它只能继承父类的this对象，然后对其进行加工

而super就是将父类的this继承给子类，没有super(),子类就得不到this对象

## super隐藏特性

1. super除了在构造器中使用，还在可以在对象字面量定义方法中使用
在对象字面量方法中里用super都是合法的

```js
const a = {foo(){
  return super.b;
}}

Object.setPrototypeOf(a, {
  b: 12345
})

console.log(a.foo())
// 12345
```
但是这种会报错，因为这种相当于将全局里的函数赋值给属性，存在函数上下文的问题
```js
const a = {foo:function(){
  return super.b;
}}

Object.setPrototypeOf(a, {
  b: 12345
})

console.log(a.foo())
// SyntaxError: 'super' keyword unexpected here
```

2.super 到底是什么

首先定义 一个原型对象和对象
```js 
const proto = {
  foo(){return 123}
}
const ins = {};
Object.setPrototypeOf(ins, proto);
```
通过super读取 原型上的属性或者方法就相当于
```js
const ins = {
  foo(){super.foo()}
};
Object.getPrototypeOf(ins).foo();
```

3. 静态绑定

super 方法是在定义时进行语意绑定的
```js
class A {a(){return console.log(1)}};
class B extends A{
    getSuper(){return super.a}
}
const b = new B;
const {getSuper} = b;
getSuper()();
```

4.拨云见日

js 中函数可以引用外部定义作用的变量，从而形成闭包

这是因为函数在定义的时候有一个外部环境槽，用来存放外部环境变量 

```js 
// 函数的环境槽位
Func.[[environment]]
```
而对象上的方法会有主对象槽，表示的是方法定义所在的对象
```js
// 方法
method.[[HomeObject]]
```
定义对象方法的区别
```js
// 这是字面量方法 
const obj = {
  func(){

  }
}
```
```js
// 这是赋值写法
const obj = {
  func: function(){

  }
}
```

上面两者还是有区别的，第一个方法是字面量方法，第二个是将匿名函数赋值给对象，所以匿名函数是全局的函数，赋值给方法，所以第二种没有主对象插槽，因而无法在这个匿名函数里使用super关键字

前者是定义方法，后者是定义一个属性值为一个函数

```js
[[homeObject]] 在对象定义时就一次设置，无法再次修改，因而形成了super的静态绑定
```

5. 因而在方法中super的相当于

```js
Object.getPrototypeOf([[homeObject]]).xxx
```

在构造器中super相当于

```js
Object.getPrototypeOf([[homeObject]]).constructor.call(this,arguments);
```



