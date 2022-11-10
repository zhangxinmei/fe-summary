# 如何实现一个简单的 chrome 插件

## 1. 初始化目录

Chrome  插件的目录结构很简单，只需要三个文件就能完成最简单的插件

```scss

--demo
  --demo.html // 插件界面
  --demo.png // 插件图标
  --manifest.json // 配置文件
  
```

### demo.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>This is a demo</title>
</head>
<body>
  <p>This is a demo</p>
</body>
</html>
```

demo.html 即为我们的 Chrome 插件的主要界面代码

### manifest.json

```json
{
    "name": "Demo",
    "version": "1.0",
    "manifest_version": 3,
    "background": {
      "service_worker": "background.js"
    },
    "action": {
        "default_popup": "demo.html",
        "default_icon":"demo.png",
    }
}
```
minifest.json是扩展程序的配置文件，是必须要的，除了常规的名称、版本等信息，action在这里负责配置插件的视图页面和图标

## 2. 导入插件

- 在 Chrome 浏览器中输入 `chrome://extensions`
- 打开开发者模式
- 点击扩展程序面板的左上角*加载已解压的扩展程序*按钮，导入我们的demo文件夹，这时候就能在插件栏看到我们的插件了


