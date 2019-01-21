module.exports = {
  base: "/fe-summary/",
  title: "",
  description: "",
  ga: "",
  head: [
    ["link", { rel: "icon", href: `/logo.png` }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }]
  ],
  themeConfig: {
    repo: "zhangxinmei/fe-summary",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "编辑此页",
    activeHeaderLinks: false,
    sidebarDepth: 2,
    lastUpdated: "上次更新",
    nav: [{ text: "blog", link: "https://github.com/zhangxinmei" }],
    sidebar: [
      {
        title: "简介",
        collapsable: false,
        children: ["/"]
      },
      {
        title: "JS",
        collapsable: false,
        children: ["/js/javascript", "/js/javascriptType"]
      },
      {
        title: "CSS",
        collapsable: false,
        children: ["/css/css"]
      },
      {
        title: "Vue",
        collapsable: false,
        children: ["/vue/vue"]
      }
    ]
  }
};
