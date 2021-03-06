# 基本类型和引用类型

## 内存空间
对于前端开发来说，内存空间并不是一个经常被提及的概念，所以很容易被大家忽视。在没有没有写这篇文章之前，我对于内存空间也是没有很多的理解。但是内存空间会在很多JS基础中涉及到，如果我们理解了它，可能很多问题也会迎刃而解。
那么内存空间究竟是什么呢？

在JS中每一个数据都需要一个内存空间。内存空间又分为下面两种：

* ### 栈内存

数据在栈内存中的存储方式，遵循**后进先出**的原则。栈内存包括了变量的**标识符**和变量的**值**，在栈内存中存储的数据的大小及生存周期是必须确定的

* ### 堆内存
数据在堆内存中存储的**顺序随意**，堆内存用来存放所有引用类型的的数据，它的存储空间较大，在栈内存中存储的数据的大小无需固定。

## 指针
我们最开始接触指针应该是C语言，C语言中指针是指一个变量，其值是这个变量的地址，即内存位置的直接地址，如下图指针指的是变量的具体地址0x00之类的。
![image](https://github.com/zhangxinmei/summary/raw/master/img/6.jpg)

#### 理解了上面的概念完之后，我们再回到我们的主题基本类型和引用类型：

## 基本类型
JavaScript 中的基本数据类型有：Undefined、Null、Boolean、Number、String，加上ES6新增的Symbol 总共6种。

在JS中的基本数据类型中，这些值都有固定的大小，往往都保存在栈内存中，由系统自动分配存储空间。

```js
var a=10;
```
如下图，变量a存储在栈内存中，他的标识符是a，变量的值是10,它的值是直接保存在栈内存中的，我们可以直接操作保存在栈内存中的值，所以这就是为什么基本类型是按值访问的了。

![image](https://github.com/zhangxinmei/summary/raw/master/img/p5.png)
#### 基本类型赋值问题:

```js
var a = 20;
var b = a;
b = 30;
console.log(a);  //20
console.log(b); //30
```
上面的问题，我们经常会遇到的，可能在面试中也会被面试官问到，我们当然可以很轻松的知道最终a为20，b为30，但是这是为什么呢？可能这时候心里面就没有很清晰了吧！这也就和上面所说的基本类型和JS内存空间有关了，借用别人在总结这个问题的时候的一张图，可以很清晰的看出其中的原理：

因为在栈内存中的数据发生复制行为时，系统会自动为新的变量分配一个新值，因此a和b之间互相独立，没有影响，所以尽管b的值改变了，a的值也不会被改变。


![image](https://github.com/zhangxinmei/summary/raw/master/img/p3.png)

## 引用类型

JavaScript 中的引用类型：除过上面的 6 种基本数据类型外，剩下的就是引用类型了，即Object 类型，Object 类型又包括：Object、Array、Date 、RegExp 、Function 类型等。

JS的引用数据类型，它们值的大小是**不固定**的，所以无法像基本类型那样直接存储在栈内存中。因此引用类型的值是保存在堆内存中的对象，但是JavaScript不允许直接访问堆内存中的位置，因此我们不能直接操作对象的堆内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象。这里的引用，我们可以粗浅地理解为保存在栈内存中的一个**地址**，也就是**指针**。
因此，引用类型的存储需要内存的栈内存和堆内存共同完成，栈内存用来保存变量标识符和指向堆内存中该对象的**指针**，也可以说是该对象在堆内存的地址。堆内存中保存对象的内容。而它们的内存地址（指针）和堆内存中的值是对应的。

```js
var a=[1,2,3];
var b={ m: 1 }; 
```
如下图，数组a和对象b的变量标识符和指针保存在栈内存中，而它们的具体值保存在堆内存中。

![image](https://github.com/zhangxinmei/summary/raw/master/img/p7.png)

#### 引用类型赋值问题:
```js
var m = { a: 10, b: 20 }
var n = m;
n.a = 15;
console.log(m);  //{a: 15, b: 20}
console.log(n);   //{a: 15, b: 20}
```
对于引用类型赋值问题，因为我们已经知道引用类型的存储是栈内存和堆内存共同完成的，一开始m保存了一个实例化的对象，这时将m赋值给n后，m和n都指向了这个实例化的对象，虽然他们的内存地址不一样，但是他们指向的对象是一样的，因此只要其中一个引用类型改变另一个引用类型也会跟着改变。
![image](https://github.com/zhangxinmei/summary/raw/master/img/p4.png)

# 总结
* 基本类型的值是按值访问的，引用类型的值是按引用访问的。

* 基本类型是存储在栈内存中的，引用类型的存储是由栈内存和堆内存共同完成的

* 基本类型的赋值，两个变量是相互不影响的；引用类型的赋值，两个变量间是相互影响的。

参考文献：
* [[ JS 进阶 ] 基本类型 引用类型 简单赋值 对象引用](https://segmentfault.com/a/1190000002789651)
* [前端基础进阶：详细图解 JavaScript 内存空间](https://juejin.im/entry/589c29a9b123db16a3c18adf)
* [C 语言指针怎么理解？](https://www.zhihu.com/question/24466000)
