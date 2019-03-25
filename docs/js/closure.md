# 闭包

定义：有权访问另一个函数作用域中的变量的函数。
闭包是由函数及创建该函数的词法环境组成。（这个环境包含了这个闭包创建时所能访问的所有局部变量）

```js
function fn() {
  var result = new Array();
  for (var i = 0; i < 10; i++) {
    result[i] = function() {
      return i;
    };
  }
  return result;
}

fn()[0](); // 10
fn()[1](); // 10
```

上面的函数返回的每个函数都返回 10，并不是我们所想的 0，1，2，3...，这是因为每个函数的作用域链中都保存着 fn()函数的活动对象，所以它们引用的都是同一个变量 i。当 fn()函数返回后，变量的值是 10，此时每个函数都引用着保存变量 i 的同一个变量对象，所以在每个函数内部 i 的值嗾使 10。

我们可以通过创建另一个匿名函数强制让闭包的行为符合预期：

```js
function fn() {
  var result = new Array();
  for (var i = 0; i < 10; i++) {
    result[i] = (function(num) {
      return function() {
        return num;
      };
    })(i);
  }
  return result;
}
fn()[0](); // 0
fn()[1](); // 1
```
