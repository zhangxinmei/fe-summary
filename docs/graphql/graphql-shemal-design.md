# GraphQL 架构设计：构建可演化架构

> 这是 Marc-Andre Giroux 的客座文章，他目前正在 GitHub 的生态系统 API 团队工作。他一直在编写和思考 GraphQL 持续演化和模式设计。如果您需要一些 GraphQL 帮助，可以通过 marc@mgiroux.me 与他联系。

虽然 GraphQL 允许我们不断改进我们的 schemas，例如使用 deprecations，但我们不应该轻易地弃用 schema 成员。最后，在最好的情况下，deprecation 仍然需要所有集成商的工作，并且对于在最坏情况下没有进行更改的任何人来说，这是一个重大改变。

虽然可以通过更好的工具和文档（例如我们在 [GitHub](https://developer.github.com/v4/changelog/) 上 [build](https://developer.github.com/v4/breaking_changes/) 的文档）以更简单的方式进行这些更改，但是我们必须记住，如果我们想要一个让（integrators）集成商信任并且稳定的 API，那么使用（deprecations）弃用应该绝对是最后的手段。

好消息是，有一些方法可以构建我们的 GraphQL schema，以避免将来发生严重的重大变化。在构建 API 时，我们必须记住，事情会发生变化，并在发生这种情况时为自己的成功做好准备。在这篇文章中，我们将探讨在为未来设计 API 时可以提供帮助的一些事项。

### 1. Prefer Object Types over simpler structures

![images](./images/05.png)

以此 `CalendarEvent` 类型为例，注意 timeRange 字段，它表示事件何时开始并结束。乍一看，这看起来还不错。我们有一个列表类型，它可能与我们内部的匹配，在索引为 0 的数组开始，索引 1 为结尾。
