[toc]

# class 细节

1. es5 生成实例对象的方法是使用构造函数

2. 这样写会让java程序员学习js时产生困惑

3. 所以在 es6 引入了 class (类)的概念

4. 新的class语言让对象原型的写法更清晰、更像面向对象编程的语法

5. 类的内部所有定义的方法，都是不可枚举的，类的方法要在 prototype上访问

6. 类定义后不存在变量提升

## es5与es6构造函数对比

1. 继承对比

构造函数继承
```js
function Father(name, age){
    this.name = name;
    this.age = age;
}

function Son(skill){
    Father.call(this,skill);
    this.skill = skill;
}
function F(){};
F.prototype = Father.prototype;
Son.prototype = new F();
```

类的继承

```js
class Father{
    constructor(name,age){
        this.name = name;
        this.age = age
    }
}
class Son extends Father{
    constructor(...args){
        super(...args)
    }
}
```


2. 静态方法

```js
function Father(){

}
Father.callMe = function(){
    console.log(this);
}
```

```js
class Father {
  constructor(params) {
    this.params = params;    
  }
  static foo(){
    console.log(this);
  }
}
```