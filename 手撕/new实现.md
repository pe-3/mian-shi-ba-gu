[toc]
# new的实现

## 什么是new

- new 是一个操作符
- new 运算符创建一个用户定义的对象类型
- 或者 构造函数的内置对象的实例

##  用法

```js
new [constructor]
```

## 什么是构造函数

- 用于创建新实例的函数
- 通过new操作符调用

### 构造函数的普通函数的区别

- 构造函数和普通函数的区别就是通过new调用
- 构造函数也是函数
- new调用和常规调用的结果不同

### new的时候构造函数的返回值

```js
function Con(){
    this.name = '1'
    return {name:'2'};
}
```
这时候构造函数new返回的是一个name属性为2的对象

```js
function Con(){
    this.name = 1;
    return 1;
}
```
这时候构造函数new返回的是一个对象{name:1}，而不是1

```js
function Con(){
    return 1;
}
```
这时候构造函数返回的是一个空对象

综上，构造函数new调用时返回值是对象的时候会覆盖前面的操作。


### new 的机制

##### ECMA-262 3rd. 13.2.2 [[Construct]]
When the [[Construct]] property for a Function object F is called, the following steps are taken:

1. Create a new native ECMAScript object.
2. Set the [[Class]] property of Result(1) to "Object".
3. Get the value of the prototype property of F.
4. If Result(3) is an object, set the [[Prototype]] property of Result(1) to Result(3).
5. If Result(3) is not an object, set the [[Prototype]] property of Result(1) to the original Object prototype object as described in 15.2.3.1.
6. Invoke the [[Call]] property of F, providing Result(1) as the this value and providing the argument list passed into [[Construct]] as the argument values.
7. If Type(Result(6)) is Object then return Result(6).
Return Result(1).


翻译过来就是

当函数对象F的[[Construct]]属性被调用时，将执行以下步骤:

1. 创建一个新的原生ECMAScript对象。
2. 设置Result(1)的[[Class]]属性为“Object”。
3. 得到F的原型属性的值。
4. 当Result(3)为对象时，将Result(1)的[[Prototype]]属性设置为Result(3)。
5. 如果Result(3)不是对象，请将Result(1)的[[Prototype]]属性设置为15.2.3.1所述的原始object原型对象。
6. 调用F的[[Call]]属性，提供Result(1)作为this值，并提供传入[[Construct]]的参数列表作为参数值。 
7. 如果Type(Result(6))是Object，则返回Result(6)。
8. 返回 结果(1)

### 构造函数是箭头函数

1. 普通函数创建时，引擎会按照特定的规则为这个函数创建一个prototype属性（指向原型对象）。
2. 默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构造函数。
3. 如果将prototype指向一个函数,那么所有this操作将会失效， 因为构造函数的Construct属性会丢失
```js
function Person(){
    this.age = 18;
}
Person.prototype
/**
{
    constructor: ƒ Foo()
    __proto__: Object
}
**/
```

```js
function Person(){
    this.age = 18;
}
Person.prototype = function(){}
new Person
/**
    __proto__:{
    arguments : null,
    caller: null,
    length: 0,
    name: ""
    prototype:{
        constructor: ƒ (),
        __proto__: Object
    }
** /
```
箭头函数被new时会报错，因为引擎在创建箭头函数的时候不会给它配置prototype属性，箭头函数没有constructor供new调用，因此会报错

```js
const Foo = ()=>{};
new Foo
// TypeError: Foo is not a constructor
```

## 手写new

根据new的工作机制我们可以实现一个基本的new

```js
function mynew(constructor, ...args) {
    // 0.判断传入的是否是一个构造函数
    if (!constructor instanceof Function) {
        throw new Error(`constructor is not a function`);
    }
    // 1.创建一个原生对象
    const obj = Object();
    // 2.拿到构造函数的原型
    const proto = constructor.prototype;
    // 3.判断原型的类型
    if (proto instanceof Object) {
        Object.setPrototypeOf(obj, proto);
    } else {
        Object.setPrototypeOf(obj, Object.prototype);
    }
    // 4.调用构造函数，拿到结果
    const res = constructor.apply(obj, args);
    // 5.判断构造函数执行的结果是否是一个函数
    if (res instanceof Object) {
        return res;
    }
    return obj;
}
```