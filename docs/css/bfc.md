## 块格式化上下文(BFC)
官方MDN的解释：
块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。
## 通俗的理解

BFC通俗一点来说就是一个独立布局的环境，在这个环境里面的元素不受外界影响。并且处在同一BFC中的块级盒子和行级盒子都会垂直的沿着其父元素的边框排列。

## 产生BFC的情况
* 根元素或包含根元素的元素
> 也就是说根元素会产生一个BFC，那么在根元素html里面的所有不满足产生BFC的元素都是在同一个BFC中。
* 浮动元素（元素的 float 不是 none）
* 绝对定位元素（元素的 position 为 absolute 或 fixed）
* 行内块元素（元素的 display 为 inline-block）
* 表格单元格或表格标题（元素的 display为 table-cell或 table-captionHTML表格标题默认为该值）
* 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
* overflow 值不为 visible 的块元素
* 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
* 网格元素（display为 grid 或 inline-grid 元素的直接子元素）

所以如果要让元素产生BFC，只需要设置上面的任何一个属性即可。
## BFC的特性
* 内部的Box会在垂直方向，从顶部开始一个接一个地放置。

* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生叠加

* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。

* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如 此。

* 计算BFC高度是包含其浮动子元素的.


## BFC margin重叠问题
处在**同一**BFC中，且盒子都不满足产生BFC的情况下，会产生margin重叠。记住一定是同一BFC中，所以里面的盒子不能产生BFC，一但产生就创建了一个新的BFC，那么他们也就不会出现margin重叠了。
```html
  <div class="parent">
       <div class="child">child1</div>
       <div class="child">child2</div>
       <div class="child">child3</div>
    </div>
```
```css
   .parent{
          background: burlywood;
          overflow: hidden;
      }
      .child{
          background: brown;
          margin: 10px 0;
      }
```
![image](https://github.com/zhangxinmei/summary/raw/master/img/b1.png)
我们给parent设置了 overflow: hidden;那么parent也就是一个BFC。所以里面的child都处在同一个BFC中,从图中也可以看到明显的margin重叠，因为按照不重叠的话child之间的间距应该是20px，但是实际是10px。

```html
       <div class="child">child1</div>
       <div class="child">child2</div>
       <div class="child">child3</div>
```
```css
      .child{
          background: brown;
          margin: 10px 0;
      }
```
![image](https://github.com/zhangxinmei/summary/raw/master/img/b0.png)
从上面的图片图片中也可以看出来处在根元素html中的非BFC元素也会产生margin重叠，因为html是一个BFC，因此里面的元素就相当于处在同一个BFC中，因此他们会产生margin重叠。
## 消除BFC中的margin重叠
需要给发生重叠中的元素设置任何一个满足产生BFC的css样式都能取消重叠。但在这个问题上我产生了一点疑问就是：我发现我给上面的child加 overflow: hidden;很多上面提到产生BFC的属性都没有用，只有display为inline-block和设置float浮动才有效果，其他的还是一样有重叠。而当我给child都加上一层div以后，加上加任何能产生BFC的属性都有效果了，margin不再重叠。我弄不明白是因为什么呢？
上代码和图：

```html
     <div class="parent">
       <div class="child">child1</div>
       <div class="child">child2</div>
       <div class="child">child3</div>
    </div>
```
```css
   .parent{
          background: burlywood;
          overflow: hidden;
      }
      .child{
          background: brown;
          margin: 10px 0;
          overflow: hidden;
      }
```
![image](https://github.com/zhangxinmei/summary/raw/master/img/b1.png)
```html
     <div class="parent">
         <div class="box">
                <div class="child">child1</div>
         </div>
      
        <div class="box">
                <div class="child">child2</div>
        </div>
        <div class="box">
                <div class="child">child3</div>
        </div>
    </div>
```
```css
   .parent{
          background: burlywood;
          overflow: hidden;
      }
   .box{
         overflow: hidden;
     }
      .child{
          background: brown;
          margin: 10px 0;
      }
```
这里包了一层div之后就，再加 overflow: hidden;就可以，并且我还试过其他可以产生BFC的元素都是可以实现的。
![image](https://github.com/zhangxinmei/summary/raw/master/img/b3.png)
## BFC的作用
#### 1. 用于清除浮动，防止容器高度坍塌
我们知道如果元素设置了浮动，那么他的父元素的高度会坍塌，如下：
```html
   <div class="wrap">
        <div class="box1">box1</div>
        <div class="box1">box2</div>
    </div>
```
```css
.wrap{
        background: firebrick;
    }
    .wrap>div{
        width: 100px;
        height: 100px;
        background: aqua;
        float: left;
        margin-right: 10px;
    }
```
![image](https://github.com/zhangxinmei/summary/raw/master/img/b8.png)
从图中可以看出wrap的高度坍塌了，为0
##### 解决办法
这时候就可以通过BFC来清除浮动，给wrap设置一个 overflow: hidden;或者其他能让其产生BFC的css,就可以清除浮动啦
```html
   <div class="wrap">
        <div class="box1">box1</div>
        <div class="box1">box2</div>
    </div>
```
```css
.wrap{
        background: firebrick;
        overflow: hidden;
    }
    .wrap>div{
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
如果是上面的这样，那么根据BFC的规则：
> 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
则会出现如下图的布局：

![image](https://github.com/zhangxinmei/summary/raw/master/img/b10.png)

##### 2. 实现两列布局的方法
再根据BFC的特性：

> BFC的区域不会与float box重叠。

所以只要把right变成BFC即可
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
[MDN块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
[BFC(块级格式化上下文)](https://www.jianshu.com/p/66632298e355#)
[CSS之BFC详解](http://www.html-js.com/article/1866)

