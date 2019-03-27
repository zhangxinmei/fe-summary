# GraphQL 架构设计：构建可演化架构

> 这是 Marc-Andre Giroux 的客座文章，他目前正在 GitHub 的生态系统 API 团队工作。他一直在编写和思考 GraphQL 持续演化和模式设计。如果您需要一些 GraphQL 帮助，可以通过 marc@mgiroux.me 与他联系。

虽然 GraphQL 允许我们不断改进我们的 schemas，例如使用 deprecations，但我们不应该轻易地弃用 schema 成员。最后，在最好的情况下，deprecation 仍然需要所有集成商的工作，并且对于在最坏情况下没有进行更改的任何人来说，这是一个重大改变。
