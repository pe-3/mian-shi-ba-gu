[toc]

# js 加载事件线

1. 创建document对象，web页面开始解析。元素对象和文本节点会被添加到文档中去。(document.readyState = "loading")
2. 遇到link标签外部css，创建线程异步加载，然后继续解析文档
```html
<link href ='xxx.css'> 
```
3. 遇到script标签外部js，带有aysnc属性或defer属性，创建加载线程异步加载，继续解析文档。aysnc加载完立即执行，defer等到文档解析完再执行
```html
<script src = 'xxx.js' aysnc >  // 加载完立即执行
<script src = 'xxx.js' defer >  // 加载完等到dom解析完在执行
// 都是异步加载
```
4. 遇到script标签外部js，没有设置aysnc和defer属性，那么浏览器会同步加载，并阻塞，等待js加载完并执行该脚本，然后继续解析文档。
```html
<script src ='xxx.js'> 
// 什么都没有设置，阻塞dom渲染，等到加载完并切执行完在继续解析文档
```
5. 遇到img标签且带有src属性，先解析dom结构后浏览器异步加载src，继续解析文档
```html
<img src = 'xxx.png' /> 
先在dom树中给img创建位置，然后异步加载资源内容
```
6. 当文档解析完成（domTree建立完毕）document.readyState = 'interactive'
```js
document.readyState = 'interactive';
// dom 对象准备状态改变为 互动状态
```
7. 文档解析完成以后，所有带有defer属性的脚步按顺序执行
```html
<body>

    <script src = 'xxx.js' />
</body>
// 相当于把script标签放在body的最底部，但不同的是defer事先异步加载好了在运行 
// 这里则是得同步加载并执行
```
8. document对象会触发DomContentLoaded事件。程序执行从同步脚本执行阶段，转化为事件驱动阶段。
```

```
9.  当所有aysnc的脚步加载完并执行后、img等加载完成后（页面所有的都执行完成后），document.readyState = 'complete'。
```
document.readyState = 'complete'
```
10. 以异步响应方式处理用户输入，网络事件

```js
网页开始正常运行
```