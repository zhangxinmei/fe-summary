# 继承

#### 原型链

原型链是实现继承的主要方法。

基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法

```js
function SuperType() {
  this.property = true;

SuperType.prototype.getSuperValue = function() {
  return this.property;

function SubType() {
  this.subproperty = false;
}

SubType.prototype=new SuperType(); // 继承 SuperType

SubType.prototype.getSubValue=function() {
  return this.subproperty;
}

var instance = new SubType();

instance.getSuperValue() // true
```

调用 instance.getSuperValue()会经历三个步骤：

1. 搜索实例
2. 实例上找不到，搜索 SubType.prototype
3. 搜索 SuperType.prototype，找到 getSuperValue()方法，结束搜索

原型搜索机制：
当访问一个实例属性时，首先会在实例中搜索该属性。如果没有找到该属性，则继续搜索该实例的原型。在通过原型链实现继承的情况下，搜索过程就会沿着原型链继续向上。在找不到属性或方法的情况下，搜索过程要一直进行到原型链末端才会停下来。

原型链缺点：
包含引用类型值的原型属性会被所有实例共享

#### 借用构造函数

```js
function SuperType() {
  this.colors = ["red", "blue", "green"];
}

function SubType() {
  SuperType.call(this);
}

var instance1 = new SubType();

instance1.colors; // ["red", "blue", "green"]
instance1.colors.push("yellow");
instance1.colors; // ["red", "blue", "green", "yellow"]

var instance2 = new SubType();
instance2.colors; // ["red", "blue", "green"]
```

#### 组合继承

结合原型链和借用构造函数，使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承。

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name); // 第二次调用 SuperType()
  this.age = age;
}

SubType.prototype = new SuperType(); // 第一次调用 SuperType()

SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function() {
  console.log(this.age);
};
var instance1 = new SubType("may", 12);
instance1.sayName(); //may
instance1.colors.push("yellow");
instance1.colors; //["red", "blue", "green", "yellow"]
var instance2 = new SubType("alice", 13);

instance2.sayName(); // alice
instance2.colors; //["red", "blue", "green"]
```

#### 原型式继承

借助原型可以基于已有对象创建新对象，同时还不必因此创建自定义类型。

```js
function inheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
var person = {
  name: "may",
  friend: ["max", "kimi", "judy"]
};
var anotherP = inheritObject(person);
anotherP.name = "bob";
anotherP.friend.push("rose");
var yetAnotherP = inheritObject(person);
yetAnotherP.name = "bob2";
yetAnotherP.friend.push("jack");
anotherP.name; // bob
anotherP.friend; // ["max", "kimi", "judy", "rose", "jack"]
yetAnotherP.name; // bob2
yetAnotherP.friend; //["max", "kimi", "judy", "rose", "jack"]
person.name; //may
person.friend; // ["max", "kimi", "judy", "rose", "jack"]
```

#### 寄生式继承

```js
function createAnother(o) {
  var clone = Object(o);

  clone.sayHi = function() {
    console.log("hi");
  };
  return clone;
}
var person = {
  name: "may",
  friend: ["max", "kimi", "judy"]
};
var anotherP = createAnother(person);
anotherP.sayHi(); // hi
anotherP.name; // may
anotherP.friend; // ["max", "kimi", "judy"]
```

#### 寄生组合式继承

寄生式继承+构造函数式继承

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
function inheritPropotype(subType, superType) {
  var prototype = Object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}
inheritPropotype(SuperType, SubType);
var instance1 = new SubType("may", 12);
instance1.name; // may
instance1.colors; // ["red", "blue", "green"]
```
