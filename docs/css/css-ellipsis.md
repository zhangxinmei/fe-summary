# 文本溢出处理方案

* 单行文本溢出

首先需要先设置元素的宽度，然后设置下面
```css
overflow: hidden;
white-space: nowrap; // 设置文字不能换行
text-overflow: ellipsis; // 文本溢出时显示...
```

* 多行文本溢出
  
```css
webkit-line-clamp:2;（用来限制在一个块元素显示的文本的行数, 2 表示最多显示 2 行。 为了实现该效果，它需要组合其他的WebKit属性）
display:-webkit-box;（和 1 结合使用，将对象作为弹性伸缩盒子模型显示 ）
-webkit-box-orient:vertical;（和 1 结合使用 ，设置或检索伸缩盒对象的子元素的排列方式 ）
overflow:hidden;
text-overflow:ellipsis;
```
