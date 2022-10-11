[toc]
# setTimeout误差

## js单线程

1. process-进程，cpu运行指令，加载和保存上下文所需的时间 
2. thread-线程，操作系统运算最小单位，或执行一段指令所需的时间

## setTimeout 
1. 只是将事件插入了宏任务队列，必须等到当前代码执行栈执行完，才会去执行setTimeout到回调
2. 要当前代码要消耗很长时间，回调也是没有办法按规定时间去执行的
3. 时间最小可以设置到4ms，小于4ms会默认按4ms执行

## 执行栈

计算机用来执行函数调用的栈，先进的最后调用

## 事件循环

### node端

> node 的event loop分为6个阶段，它们会按照顺序反复执行。
每当进入到某一阶段的时候，都会从对应的回调函数中取出函数来执行，当队列中的函数执行完或者执行函数的数量达到系统的阈值，那么就会进入下一阶段。

6个阶段

1. timers
2. I/O callbacks
3. idle, prepare
4. poll
5. check
6. close callbacks

### 浏览器端

>浏览器端 的情况与 node端 的情况相仿，当我们执行 JS 代码的时候其实就是往执行栈中放入函数，当遇到异步的代码时，会被挂起并在需要执行的时候加入到 Task（有多种 Task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行。

微任务(microtask)

1. process.nextTick
2. promise
3. Object.observe(曾经是提案，如今已经废除)
4. MutationOberver

宏任务(macrotask)

1. script
2. setTimeout
3. setInterval
4. setImmediate
5. I/O
6. UI渲染


执行顺序如下：

1. 执行同步代码，这是宏任务
2. 执行栈为空，查询是否有微任务要执行
3. 必要时渲染UI
4. 进行下一轮的 EventLoop ，执行宏任务中的异步代码

上面讲了定时器是属于 宏任务(macrotask) 。如果当前 执行栈 所花费的时间大于 定时器 时间，那么定时器的回调在 宏任务(macrotask) 里，来不及去调用，所有这个时间会有误差。

在最新的规范里有这么一句：
If nesting level is greater than 5, and timeout is less than 4, then increase timeout to 4.
所以意思就是意思就是如果timeout嵌套大于 5层，而时间间隔小于4ms，则时间间隔增加到4ms。

