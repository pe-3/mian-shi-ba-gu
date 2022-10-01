function DeepClone(target, cache = new Map()) {
    if (cache.get(target))
        return cache.get(target);
    // 克隆复用函数
    const clone = function (source) {
        cache.set(target, source);
        for (let key in target) {
            if (target.hasOwnProperty(key))
                source[key] = DeepClone(target[key]);
        }
        return source;
    }
    // 克隆日期
    if (target instanceof Date)
        return clone(new Date(target));
    // 克隆正则
    if (target instanceof RegExp)
        return clone(new RegExp(target.source, target.flags));
    // 克隆函数
    if (target instanceof Function)
        return clone(function (...args) { return target.call(this, args); });
    // 克隆数组
    if (target instanceof Array)
        return clone([]);
    // 克隆简单的对象
    if (target instanceof Object)
        return clone({});
    return target;
}