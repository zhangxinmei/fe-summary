## 块格式化上下文(BFC)

官方 MDN 的解释：
块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视化 CSS 渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

## 通俗的理解

BFC 通俗一点来说就是一个独立布局的环境，在这个环境里面的元素不受外界影响。并且处在同一 BFC 中的块级盒子和行级盒子都会垂直的沿着其父元素的边框排列。

## 产生 BFC 的情况

- 根元素或包含根元素的元素
  > 也就是说根元素会产生一个 BFC，那么在根元素 html 里面的所有不满足产生 BFC 的元素都是在同一个 BFC 中。
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格或表格标题（元素的 display 为 table-cell 或 table-captionHTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）

所以如果要让元素产生 BFC，只需要设置上面的任何一个属性即可。

## BFC 的特性

- 内部的 Box 会在垂直方向，从顶部开始一个接一个地放置。

- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生叠加

- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。

- 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如 此。

- 计算 BFC 高度是包含其浮动子元素的.

## BFC margin 重叠问题

处在**同一**BFC 中，且盒子都不满足产生 BFC 的情况下，会产生 margin 重叠。记住一定是同一 BFC 中，所以里面的盒子不能产生 BFC，一但产生就创建了一个新的 BFC，那么他们也就不会出现 margin 重叠了。

```html
<div class="parent">
  <div class="child">child1</div>
  <div class="child">child2</div>
  <div class="child">child3</div>
</div>
```

```css
.parent {
  background: burlywood;
  overflow: hidden;
}
.child {
  background: brown;
  margin: 10px 0;
}
```

![image](https://github.com/zhangxinmei/summary/raw/master/img/b1.png)

我们给 parent 设置了 overflow: hidden;那么 parent 也就是一个 BFC。所以里面的 child 都处在同一个 BFC 中,从图中也可以看到明显的 margin 重叠，因为按照不重叠的话 child 之间的间距应该是 20px，但是实际是 10px。

```html
<div class="child">child1</div>
<div class="child">child2</div>
<div class="child">child3</div>
```

```css
.child {
  background: brown;
  margin: 10px 0;
}
```

![image](https://github.com/zhangxinmei/summary/raw/master/img/b0.png)

从上面的图片图片中也可以看出来处在根元素 html 中的非 BFC 元素也会产生 margin 重叠，因为 html 是一个 BFC，因此里面的元素就相当于处在同一个 BFC 中，因此他们会产生 margin 重叠。

## 消除 BFC 中的 margin 重叠

需要给发生重叠中的元素设置任何一个满足产生 BFC 的 css 样式都能取消重叠。但在这个问题上我产生了一点疑问就是：我发现我给上面的 child 加 overflow: hidden;很多上面提到产生 BFC 的属性都没有用，只有 display 为 inline-block 和设置 float 浮动才有效果，其他的还是一样有重叠。而当我给 child 都加上一层 div 以后，加上任何能产生 BFC 的属性都有效果了，margin 不再重叠。我弄不明白是因为什么呢？
上代码和图：

```html
<div class="parent">
  <div class="child">child1</div>
  <div class="child">child2</div>
  <div class="child">child3</div>
</div>
```

```css
.parent {
  background: burlywood;
  overflow: hidden;
}
.child {
  background: brown;
  margin: 10px 0;
  overflow: hidden;
}
```

![image](https://github.com/zhangxinmei/summary/raw/master/img/b1.png)

```html
<div class="parent">
  <div class="box"><div class="child">child1</div></div>

  <div class="box"><div class="child">child2</div></div>
  <div class="box"><div class="child">child3</div></div>
</div>
```

```css
.parent {
  background: burlywood;
  overflow: hidden;
}
.box {
  overflow: hidden;
}
.child {
  background: brown;
  margin: 10px 0;
}
```

这里包了一层 div 之后就，再加 overflow: hidden;就可以，并且我还试过其他可以产生 BFC 的元素都是可以实现的。
![image](https://github.com/zhangxinmei/summary/raw/master/img/b3.png)

## BFC 的作用

#### 1. 用于清除浮动，防止容器高度坍塌

我们知道如果元素设置了浮动，那么他的父元素的高度会坍塌，如下：

```html
<div class="wrap">
  <div class="box1">box1</div>
  <div class="box1">box2</div>
</div>
```

```css
.wrap {
  background: firebrick;
}
.wrap > div {
  width: 100px;
  height: 100px;
  background: aqua;
  float: left;
  margin-right: 10px;
}
```

![image](https://github.com/zhangxinmei/summary/raw/master/img/b8.png)
从图中可以看出 wrap 的高度坍塌了，为 0

##### 解决办法

这时候就可以通过 BFC 来清除浮动，给 wrap 设置一个 overflow: hidden;或者其他能让其产生 BFC 的 css,就可以清除浮动啦

```html
<div class="wrap">
  <div class="box1">box1</div>
  <div class="box1">box2</div>
</div>
```

```css
.wrap {
  background: firebrick;
  overflow: hidden;
}
.wrap > div {
  width: 100px;
  height: 100px;
  background: aqua;
  float: left;
  margin-right: 10px;
}
```

![image](https://github.com/zhangxinmei/summary/raw/master/img/b9.png)

#### 1. 用于实现自适应两列布局

```html
<div class="wrap">
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

```css
.wrap {
  width: 100%;
}

.left {
  width: 30%;
  height: 150px;
  float: left;
  background: rgb(102, 181, 255);
}

.right {
  height: 200px;
  background: #fcc;
}
```

如果是上面的这样，那么根据 BFC 的规则：

> 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
> 则会出现如下图的布局：

![image](https://github.com/zhangxinmei/summary/raw/master/img/b10.png)

#### 2. 实现两列布局的方法

再根据 BFC 的特性：

> BFC 的区域不会与 float box 重叠。

所以只要把 right 变成 BFC 即可

```html
<div class="wrap">
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

```css
.wrap {
  width: 100%;
}

.left {
  width: 30%;
  height: 150px;
  float: left;
  background: rgb(102, 181, 255);
}

.right {
  height: 200px;
  background: #fcc;
  overflow: hidden;
}
```

![image](https://github.com/zhangxinmei/summary/raw/master/img/b11.png)

如上图，轻松实现两列自适应布局，不管屏幕多大都会自适应。是不是很棒！

参考资料：
[MDN 块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
[BFC(块级格式化上下文)](https://www.jianshu.com/p/66632298e355#)
[CSS 之 BFC 详解](http://www.html-js.com/article/1866)
