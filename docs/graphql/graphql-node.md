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

GraphQL 只有一个外部端点 /graphql，此端点可以有多个其他端点执行各种操作，这些端点将在 schema 中指定。

schema 将执行以下操作：

* 指定端点

* 指示端点的输入和输出字段 （Indicate the input and output fields for the endpoint）

* 指示在命中端点时应执行的操作，依此类推。（Indicate what action should be done when an endpoint is hit and so on.）

schema 在代码中定义如下：

```js
const schema = new GraphQLSchema({ query: queryType });
```

schema 可以包含查询和变更类型，但是这篇文章将仅关注查询类型。

### 查询（query）

你可以在 schema 中看到查询已设置为 queryType，我们使用以下命令从 query.js 文件中导入queryType：

```js
const {queryType} = require('./query.js');
```

query.js 是我们即将创建的自定义文件，query 是我们在 schema 中指定只读端点的地方。

在项目中新建一个名为 query.js 的文件，并将以下代码复制到其中：

```js
const { GraphQLObjectType,
    GraphQLString
} = require('graphql');


//Define the Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,

            resolve: function () {
                return "Hello World";
            }
        }
    }
});

exports.queryType = queryType;
```

### 查询说明

queryType创建为GraphQLObjectType并命名为Query。（queryType is created as a GraphQLObjectType and given the name Query.）

字段是我们指定各种端点的地方，因此我们在这里添加一个名为 hello 的端点，hello 有一个 GraphQLString 类型，这意味着该端点的返回类型为 String。这里的类型是 GraphQLString 而不是 String，因为这是 GraphQL 架构，因此直接使用 String 是不行的。

resolve 函数表示调用端点时要执行的操作，这里的操作是返回一个字符串 Hello World。

最后，我们用 exports.queryType = queryType 导出 querytype，这是为了确保我们可以在server.js中导入它。

### Running the Application








