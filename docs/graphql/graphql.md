# GraphQL入门指南

![image](https://cdn-images-1.medium.com/max/2600/1*sbPjm_cUHedMps6Kdy2F-A.jpeg)

现如今最常讨论的技术之一便是API。很多人不知道什么是API，简单的来说，API代表应用程序编程接口（Application Programming Interface）。顾名思义，就是为开发者、用户、消费者提供数据交互的接口。

你可以将API视为调酒师，你向调酒师要一杯酒，然后他为你提供你想要的酒。看似非常的简单，但是为什么会存在问题呢？

自现在网络发展以来，构建API并不像听起来那么难，但是学习和理解API却不是一件简单的事。很多开发者将会使用你的API来构建某些内容，或者仅仅是使用数据。因此，你的API应该尽可能简洁，直观。经过精心设计的API将非常易于学习和使用，同时也是很直观的，所以在开始设计你的API时一定要记住这点。

一直以来我们都在使用REST来构建API，随之也带来了一些问题。使用REST来设计构建API时，你将会面临一些问题，例如：

* 你需要访问很多资源路径
* 不易于开发者学习和理解你的API
* 存在信息过度或者是信息不足的问题

为了解决这些问题，Facebook创建了GraphQL。今天，我认为GraphQL是构建API的最佳方式。本文将会告诉你现在为什么需要学习GraphQL。

通过这篇文章，你将学习到GraphQL的工作原理。我将向你展示如何使用GraphQL创建设计精良、高效和功能强大的API。

在这之前你可能已经听过GraphQL，因为有很多人和公司已经在使用GraphQL。由于GraphQL是开源的，因此它的社区已经变得非常强大。

那么现在，是时候开始在实践中学习GraphQL是如何工作的了，以及感受它的魔力。

### 什么是GraphQL？

[GraphQL](https://graphql.org/)是Facebook开发的一种开源查询语言。它为我们提供了一种更有效的方法来设计、创建和使用我们的API，可以说它是REST的替代品。

GraphQL有很多功能，例如：
* 你可以编写你想要的数据，并获取你所需要的数据。不再像我们使用REST那样过度获取信息。
* It gives us a single endpoint, no more version 2 or version 3 for the same API。
* GraphQL是强类型的，您可以在执行之前在GraphQL类型系统中验证查询。它可以帮助我们构建更强大的API。

这是一篇关于GraphQL的基础介绍--为什么它如此强大以及为什么它如今获得了大量人气。如果你想了解更多关于GraphQL的信息，我建议你查看[GraphQL](https://graphql.org/)官网并查看它。

### 开始

本文的主要目的不是学习如何配置GraphQL服务器，所以我们现在还没有深入研究。而本文的主要目的在于了解GraphQL在实践中的工作原理，因此我们将使用一个名为[Graphpack](https://github.com/glennreyes/graphpack)的服务器。

在开始我们的项目前，我们需要创建一个新的文件夹，你可以随意命名，我打算将它命名为graphql-server：

打开你的终端并输入：

```
mkdir graphql-server

```

现在，你需要在你的电脑上安装npm或者yarn，npm和yarn是JavaScript编程语言的包管理器，对于Node.js，默认包管理器是npm。

进入你创建的文件夹中，输入以下命令：

```
npm init -y

```

如果你使用yarn，则输入以下命令：

```
yarn init 

```

npm将会为你自动创建一个package.json文件，你安装的所有依赖和命令都会在这个文件中。

所以现在，我们将要安装我们将要使用的唯一依赖项--Graphpack

[Graphpack](https://github.com/glennreyes/graphpack)允许你创建零配置的GraphQL服务器，对于刚开始学习GraphQL的我们来说这将帮助我们学习更多内容，而不必担心复杂的服务器配置。

在你的根目录中，在终端输入以下命令：

```

npm install --save-dev graphpack

```

如果你使用yarn，则输入以下命令：

```
yarn add --dev graphpack
```

安装完graphpack之后，找到package.json文件中scripts配置项，加上下面的代码：

```js
"scripts": {
    "dev": "graphpack",
    "build": "graphpack build"
}
```

我们将创建一个名为src的文件夹，它将成为整个服务器中唯一的文件夹。

创建完名为src的文件夹之后，我们将在src文件夹下面创建3个文件。首先创建名为schema.graphql的文件夹，在这个文件夹中,写下下面的代码：

```js

type Query {
  hello: String
}

```

schema.graphql文件将是我们的整个GraphQL架构，如果你不懂这是什么，被担心，我稍后会解释。

接着在我们的src文件夹中新建第二个名为resolvers.js的文件夹，代码如下：

```js
import { users } from "./db";

const resolvers = {
  Query: {
    hello: () => "Hello World!"
  }
};

export default resolvers;
```

This resolvers.js file is going to be the way we provide the instructions for turning a GraphQL operation into data.

最后，在src文件夹下建第三个文件db.js：

```js
export let users = [
  { id: 1, name: "John Doe", email: "john@gmail.com", age: 22 },
  { id: 2, name: "Jane Doe", email: "jane@gmail.com", age: 23 }
];
```

在本教程中，我们没有使用真是的数据库。因此，db.js文件将模拟数据库，仅用于学习目的。

现在我们的src文件夹应该如下：

```
src
  |--db.js
  |--resolvers.js
  |--schema.graphql
```

现在如果你在终端运行npm run dev 或者 yarn dev，你就会在终端看到以下输出：

![image](https://cdn-images-1.medium.com/max/1600/1*FKJYY9qqg4PLBvziWPlhVg.png)