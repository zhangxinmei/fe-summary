# 深拷贝和浅拷贝
就我上面的问题就引伸出来两个概念：深拷贝和浅拷贝

要弄清楚这两个概念前，我们先要明白一点:

在JavaScript中，对于Object和Array这类引用类型值，当从一个变量向另一个变量复制引用类型值时，这个值的副本其实是一个指针，两个变量指向同一个堆内存，改变其中一个变量，另一个也会受到影响。

* ### 数组的浅拷贝

所以数组的浅拷贝就是拷贝原对象的**引用**，因此只要其中一个数组改变，另一个数组也会跟着改变。
```js
    var arr=[1,2,3];
    var arr2=arr;
    console.log(arr);  // [1, 2, 3]
    console.log(arr2);  // [1, 2, 3]
    arr2.push(4);
    console.log(arr);  // [1, 2, 3, 4]
    console.log(arr2);  // [1, 2, 3, 4]
```
但是在浅拷贝的这个问题上，有一点必须要说明：就是很多网上的文章说slice()和concat()方法是深拷贝，一开始我相信了，因为自己也亲自测试了一下:

```js
    var arr=[1,2,3];
    var arr2=arr.slice(0);
    console.log(arr);  // [1, 2, 3]
    console.log(arr2);  //[1, 2, 3]
    arr2.push(4);
    console.log(arr);  //[1, 2, 3]
    console.log(arr2);  // [1, 2, 3, 4]
    arr.push(5);
    console.log(arr);  // [1, 2, 3, 5]
    console.log(arr2);  // [1, 2, 3, 4]
```
根据打印出来的结果，我觉得是这样的没错！concat()方法也是一样的，就不再贴代码了。本来就打算这样相信下去，直到我看到了这篇文章[JavaScript中的浅拷贝和深拷贝](https://segmentfault.com/a/1190000008637489)
才发现似乎有点问题，话不多说，直接上代码：
```js
   var arr=['may',{age:18}];
   var arr2=arr.slice(0);
   console.log(arr2); //['may',{age:18}];
   arr2[0]='lee' 
   console.log(arr); // ['may',{age:18}]
   console.log(arr2);  // ['lee',{age:18}]
   arr2[1].age=20;
   console.log(arr); // ['lee',{age:20}]
   console.log(arr2); // ['may',{age:20}]
```
这一打印，才发现怎么和说好的不一样呢，arr2的age改变了，怎么arr的age也改变了呢，我也是百思不得其解。后来转念一想，直接去官方查看slice()的用法呀！[Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
这一查才终于豁然开朗了，MDN官方的解释是：

slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分**浅拷贝**到一个新数组对象。且原始数组不会被修改。

原来是这样，注意slice() 和concat()都是**浅拷贝**，再看slice()的拷贝规则：

     * 如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象 
       引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生 
       改变。

      * 对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值 
        到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
这才终于茅塞顿开，简单的来说就是如果数组里面的元素含有引用类型，那么只要其中一个数组中的引用类型改变，另一个数组中的引用类型也会跟着改变；如果数组里面的元素是基本类型，那么两个数组将互不影响。多么痛的领悟，这也就告诉我们解决问题要先看官方解释，而不是直接在网上搜索，有时候反而会被误导。

* ### 数组的深拷贝

深拷贝也就是拷贝出一个新的**实例**，新的实例和之前的实例互不影响。
实现深拷贝的方法有：
1. 利用JSON.stringify和JSON.parse
```js
   var arr=[1,2,3];
   var arr2=JSON.parse(JSON.stringify(arr));
   console.log(arr2);  //[1,2,3]
   arr2.push(4);
   console.log(arr);  //[1,2,3]
   console.log(arr2); // [1, 2, 3, 4]
```
```js
   var arr=['may',{age:18}];
   var arr2=JSON.parse(JSON.stringify(arr));
   console.log(arr2);  // ['may',{age:18}];
   arr2[0]='lee'
   console.log(arr);  // ['may',{age:18}];
   console.log(arr2);  // ['lee',{age:18}];
   arr2[1].age=20;
   console.log(arr);  // ['may',{age:18}];
   console.log(arr2);  // ['lee',{age:20}];
```
可以看出使用JSON.stringify和JSON.parse不管数组里面是基本类型还是引用类型，两个数组都互不影响。

2. 使用jQuery的[$.extend()方法](http://www.css88.com/jqapi-1.9/jQuery.extend/)

```js
  var arr=['may',{age:18}];
   var arr2=$.extend(true, {}, arr);
   console.log(arr2);  // ['may',{age:18}];
   arr2[0]='lee'
   console.log(arr);  // ['may',{age:18}];
   console.log(arr2);  // ['lee',{age:18}];
   arr2[1].age=20;
   console.log(arr);  // ['may',{age:18}];
   console.log(arr2);  // ['lee',{age:20}];
```
* ### 误区：
写到后面想起网上还有一篇文章也是有错误的，说使用ES6的扩展运算符...也可以实现深拷贝，但是其实扩展运算符...和slice()的作用是一样的，也是浅拷贝，也是数组里面有引用类型的话，一个数组中的引用类型改变，另一个数组中的引用类型也会跟着改变。
```js
   var arr=['may',{age:18}];
   var [ ...arr2 ] = arr;
   console.log(arr2); //['may',{age:18}];
   arr2[0]='lee' 
   console.log(arr); // ['may',{age:18}]
   console.log(arr2);  // ['lee',{age:18}]
   arr2[1].age=20;
   console.log(arr); // ['lee',{age:20}]
   console.log(arr2); // ['may',{age:20}]
```
* ### 总结：
所以最深的感悟就是遇到问题要先去看官方的文档解释，免得被误导，走更多的弯路。