## 介绍

这是一个gulp的前端开发工具，使用browserify编译js，实现多个页面多个入口分别打包输出以及本地开发时修改资源实时编译。

## 项目结构

```
- /app
--- /build 存放所有的task
--- /config 设置一些路径
--- /res 生成的资源存放处
--- /src 开发目录
------ /lib   存放一些js依赖
------ /public   存放公共的样式，图片
--------- /css   最终会编译成base-[hash].css存放在res/public/css目录中
--------- /img   最终会变异成img-[hash]的图片存放在res/public/img目录中
------ /components   可以存放一些复用的模块
------ /store  存放状态数据
------ /view  页面
--------- /index
------------- /css
------------- /img
------------- /js
------------- index.html
------------- index.js
--------- /subpage
------------- /css
------------- /img
------------- /js
------------- index.html
------------- index.js
----- /WEB-INF 生成的html文件
----- gulpfile.js
----- package.json
```

## 使用

### 命令

#### 安装依赖

```
npm install
```

#### 本地启动

```
npm run dev
```

#### 打包

```javascript
npm run build
```

### 页面

每一个页面都会在src/view 中创建一个文件夹，包括 :

```
-- /css 样式(可选)
-- /img 图片(可选)
-- /js js(可选)
-- /swf flash文件(可选)
-- /media 媒体文件(可选)
-- index.html 页面模板
-- index.js 入口文件
```

文件夹名称为最终生成的模板文件名

### commonJS

使用browserify打包js文件，会将js文件最终合并打包

#### 设置模块别名

在使用commonjs的方式加载模块时， 可能会遇到经常使用的模块， 比如:jquery，这样可以给模块添加别名，例如：

```javascript
require('../lib/jquery')  =>  require('jquery')
```

方法： 在package.json文件中 "browser" 字段中添加别名即可

例如：

```json
"browser": {
  "jquery": "./src/lib/jquery.min.js"
}
```

key为别名， value为模块的相对路径

### 模板引擎

添加ejs模板，可在js文件中直接require<br>
例如：

a.html

```html
<div>
<% if(show){ %>
hellow world!
<% } %>
</div>
```

app.js

``` javascript
var tmp = require('a.html');
document.body.innerHTML = tmp({show: true});
```

### shim

我们经常会使用jquery的插件，但是又需要依赖jquery，这样我们就需要shim来组合jquery和jquery的插件

使用方法:

```
"browser": {
    "jquery": "./src/lib/jquery.min.js",
    "blockUI": "./src/lib/jquery.blockUI.min.js"
  },
  "browserify-shim": {
    "jquery": "$",
    "blockUI" : { "depends": ["jquery:jQuery"] }
  },
```

在package.json中， 找到browserify-shim这个字段， 添加依赖，就上例中的blockUI, "depends" 为依赖， 他依赖了jquery,:jQuery为传入的的值