[toc]
# instanceof 的工作原理

- 判断操作符右侧的原型对象是否存在于操作符左侧对象的原型链上

```js
obj instanceof Object
```

话不多说，直接实现

## 实现思路

1. 首先判断右侧是否是函数，因为函数才有prototype属性，不是则报错;
2. 如果是函数那么就拿到函数的原型对象。
3. 判断左侧类型是否是简单类型的，如果是直接返回false，简单类型除了null，其他都能直接用typeof判断。这样做是为了防止包装类。
4. 接下来遍历原型链判断构造函数的原型对象是否存在于左侧实例的原型链上，
如果存在则返回true，不存在就知道退出循环。
5. 返回false。


```js
function myinstanceof(leftvalue, rightvalue) {
    // 1.判断右侧值是否是函数，因为只有函数才能有prototype属性
    if (typeof rightvalue !== 'function') {
        throw new Error(
            'Right-hand side of ' instanceof ' is not an object'
        );
    };
    // 2.拿到右侧函数的原型对象
    const rightProto = rightvalue.prototype;
    // 3.如果左侧值是简单类型的，那么直接返回false
    const simpleTypeArr = [
        'number',
        'string',
        'boolean',
        'undefined',
        'symbol'
    ];
    const typeL = typeof leftvalue;
    if (simpleTypeArr.includes(typeL) || leftvalue === null) {
        return false;
    }
    // 3.拿到左侧对象的原型
    leftvalue = leftvalue.__proto__;
    while (leftvalue !== null) {
        if (leftvalue === rightProto) {
            return true;
        }
        leftvalue = leftvalue.__proto__;
    }
    return false;
}
```

# 测试

```js
function Con() { }
const ins = new Con();
const obh = {};

console.log(myinstanceof(ins, Con));
console.log(myinstanceof(obh, Con));
console.log(myinstanceof(1, Number));
console.log(myinstanceof(false, Boolean));
console.log(myinstanceof(null, Con));
console.log(myinstanceof('123', String));
console.log(myinstanceof('123', Object));
console.log(myinstanceof({}, Object));
// true
// false
// false
// false
// false
// false
// false
// true
```