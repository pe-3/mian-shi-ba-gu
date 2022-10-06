# white-space 

### 处理元素中的空白
<div style='height:100px;width:100px;background-color:cyan; white-space:normal;padding:10px;'>
这是一句话，


这句话会换行
</div>
- normal 连续的空白会被合并，换行符会被当作空白符来处理，换行在填充框盒子是必要
<div style='height:100px;width:100px;background-color:cyan; white-space:nowrap;padding:10px;'>
这是一句话，这句话不会换行
</div>
- nowrap 和normal一样，连续的空白符会被合并，但在文本内的换行无效
<div style='height:100px;width:100px;background-color:cyan; white-space:pre;padding:10px;'>
这是一句话，这句话也不会换行，文本内的连      续的空格不会失效
</div>
- pre 连续的空白符会被保留，再遇到换行符或者 br 元素时才会换行
<div style='height:100px;width:100px;background-color:cyan; white-space:pre;padding:10px;'>
这是一句话，这句话也不会换行，文本内的连续的空格不会失效
</div>
- pre-wrap 连续的空白符会被保留，再遇到换行符或者<br>元素才会换行
- pre-line 连续的空白符会被合并，再遇到换行符或者<br>，或者要为了填充框盒子时才会换行
- break-spaces 与pre-wrap行为相同，除了：

1. 任何保留的空白序列总是占用空间，包括在行尾
2. 每个保留的空格字符后都存在换行机会，包括空格字符之间。
3. 这样保留的空间占用空间而不会挂起，从而影响盒子的固有尺寸（最小内容大小和最大内容大小）

|     | 换行符  |  空格和制表符   | 文字换行  | 行尾空格  |
|  ----  | ----  |----  | ----  | ----  |
| normal  | 合并 | 合并 | 换行 | 删除 |
| nowrap  | 合并 | 合并 | 不换行| 删除 |
| pre  | 保留 | 保留| 不换行 | 保留 |
| pre-wrap  | 保留 | 保留 | 换行 | 挂起 |
| pre-line  | 保留 | 合并 | 换行 | 删除 |
| break-spaces  | 保留 | 保留 | 换行 | 换行 |