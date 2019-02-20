# GraphQL简介：工作原理以及如何使用

GraphQL 是 API 的查询语言，它显示了服务器提供的不同类型的数据，然后客户端可以准确地选择它想要的内容。

同样在 GraphQL 中，你可以一次性调用多个服务器资源，而不在需要进行多个 REST API 调用。

你可以通过访问 [https://graphql.org/](https://graphql.org/) 来了解 GraphQL 的所有优点。我们必须在实践中使用 GraphQL，或者你很难理解它的优点，那么就让我们开始使用 GraphQL 吧~

我们将在本文中使用 GraphQL 和 NodeJS。

## 先决条件

安装 NodeJS：[https://nodejs.org/en/](https://nodejs.org/en/)

## 如何将 GraphQL 与 NodeJs 一起使用？

GraphQL 可以与多种语言一起使用，这篇文章中，我们将重点介绍如何使用 NodeJS 将 GraphQL 与 JavaScript 结合使用。

新建一个名为 graphql-with-nodejs 的文件夹，进入项目文件夹并运行 npm init 来创建 NodeJS 项目，终端命令如下：

```js

cd graphql-with-nodejs 
npm init

```

## 安装依赖项

使用以下命令安装 Express：

```js
npm install express
```

我们将使用以下命令安装 GraphQL 和 GraphQL for Express：

```js

npm install express-graphql graphql

```

### NodeJS代码

在项目中创建一个名叫 server.js 的文件，并将以下代码复制到其中：

```js
const express = require('express');
const port = 5000;
const app = express();

app.get('/hello', (req,res) => {
    res.send("hello");
   }
);

app.listen(port);
console.log(`Server Running at localhost:${port}`);
```

上面的代码有一个名为 /hello 的 HTTP GET 请求，这个请求是使用 Express 创建的。现在，让我们修改此代码来启用 GraphQL。

### 在代码中启用GraphQL

GraphQL有一个名为 /graphql 的 URL 端点，它将处理所有的请求。

将以下代码复制到 server.js 中：

```js

//get all the libraries needed
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {GraphQLSchema} = require('graphql');

const {queryType} = require('./query.js');

//setting up the port number and express app
const port = 5000;
const app = express();

 // Define the Schema
const schema = new GraphQLSchema({ query: queryType });

//Setup the nodejs GraphQL server
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(port);
console.log(`GraphQL Server Running at localhost:${port}`);

```

现在让我们来看看这段代码吧~

graphqlHTTP 使我们能够在 /graphql url 中设置 GraphQL 服务器，它知道如何处理即将发生的请求。这个设置在以下代码行中完成：

```js
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
```

现在，让我们来一起探索 graphqlHTTP 中的参数吧~

### graphiql

graphiql 是一个 Web UI，您可以使用它来测试GraphQL端点（GraphQL endpoints）//TODO。我们将其设置为true，以便更容易测试我们创建的各种GraphQL端点。

### schema
