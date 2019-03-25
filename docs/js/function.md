# 函数表达式

### 定义函数的方式

#### 函数声明

```js
function fn(arg0, arg1, arg2) {
  // 函数体
}
```

函数声明的一个重要特征：函数声明提升

```js
fn();
function fn() {
  console.log("hi");
}
```

#### 函数表达式

```js
var fn = function(arg0, arg1, arg2) {
  // 匿名函数
  // 函数体
};
```

函数表达式必须先赋值，否则会报错：

```js
fn();
var fn = function() {
  console.log("hi");
};
// Uncaught TypeError:fn is not a function
```
