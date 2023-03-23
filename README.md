<p align="center">
  <a href="https://freeeis.aslancer.com" target="_blank">
    <img
      src="https://user-images.githubusercontent.com/33030594/227073920-03ed137f-c4f7-4ed7-ae05-d781dd1991f7.png"
      alt="FreeEIS"
      width="250"
    />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/free-fe-starter-kit">
    <img src="https://img.shields.io/npm/v/free-fe-starter-kit" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/free-fe-starter-kit">
    <img src="https://img.shields.io/npm/dm/free-fe-starter-kit" alt="Download">
  </a>
  <a href="https://github.com/didi/LogicFlow/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/free-fe-starter-kit" alt="LICENSE">
  </a>
</p>

简体中文 | [English](https://github.com/freeeis/.github/blob/main/profile/README.en-us.md)

[更多文档](https://freeeis.aslancer.com)（完善中……）

FreeEIS，是一种可扩展的、企业级系统统一开发框架。FreeEIS旨在解决越来越流行的远程协作开发中，系统拆分及组装的问题。并且通过积累越来越多的功能模块，使得系统的搭建更快捷。

## 特性


- 🛠 高扩展性

  “一切”皆可为模块，从一个漂亮的按钮、一个简单的运算工具函数，到一套完备的ERP系统，都可以做为FreeEIS中的模块。模块拆分灵活，模块间可零耦合，模块即插即用。同时考虑模块自身的扩展性，可开发模块做为另一模块的“插件”。

- 🎯 聚焦业务逻辑

  FreeEIS内核将与业务逻辑无关的功能预制，使得开发人员只需要考虑模块内部的业务逻辑，诸如模块加载、引用依赖、多语言支持、多样式支持、数据模型生成、权限管理与控制、路由生成、Mock功能等等都已经内置在FreeEIS内核中，模块开发过程中不需要再做考虑。特别是像数据模型生成、权限管理与控制，这类通常会消耗开发者大量精力的部分，也被剥离解耦，大大提高了开发效率。

- 🚀 快速集成

  FreeEIS中所有的功能都被拆分成大大小小的模块，在需要整合成为一整套系统的时候，只需要配置所需要的模块，或将模块代码（目录）放到统一的位置，FreeEIS内核将自动加载所有需要的模块，并整合为一套完整的系统。这使得系统级的组装更加灵活，可以根据需要极速集成成为大小和功能完全不同的完整系统。

- 🍹 不改变开发习惯

  FreeEIS尽力做到少封装，无SDK，避免改变现有的开发习惯。一个脚手架工程 + 一套简单的规范就可以实现快速的系统开发。


- 🚪 代码安全

  在某些场景下，我们不希望所有的开发人员拿到很多甚至所有功能模块的代码才可以运行调试自己的功能模块。FreeEIS的设计使得开发人员只关注自己所开发的模块也只需要访问到自己开发的功能模块的代码库，可以在不影响开发的情况下确保代码安全。


## 使用

### 前提条件

当前版本中，前端使用了如下技术或框架，您需要已经对这些技术或框架有所了解甚至拥有相关经验：
 - [VUE3](https://vuejs.org/)是我们整个前端部分的基础。
 - [Quasar Framework](https://quasar.dev/)是一个基于VUE的框架，具有多种特性，如拥有丰富的组件，支持Material Design，支持跨平台等等。但FreeEIS中并禁止使用其他组件库，您依然可以根据自己的喜好选择，我们只是借助了Quasar Framework的脚手架和跨平台支持，甚至您也可以将FreeEIS放在与Quasar Framework无关的其他VUE工程中使用。

当前版本中，后端使用了如下技术或框架，您需要已经对这些技术或框架有所了解甚至拥有相关经验：
 - [NodeJS](https://nodejs.org/)是基础！
 - [ExpressJS](http://expressjs.com/)是基础之上的基础😉。
 - [MongoDB](https://www.mongodb.com/)、[Mongoose](http://www.mongoosejs.net/), 目前已经实现的数据库操作模块基于Mongoose，但我们期望后续逐步添加更多数据库的支持。
 - [Redis](https://redis.io/)，建议使用Redis的docker镜像部署。

### 前端

```sh
# 安装前端脚手架

$ git clone https://github.com/freeeis/free-fe-starter-kit.git fe

# 安装依赖包
$ cd fe
$ yarn install

# 运行
$ yarn start

```


### 后端

在使用后端前，请先安装MongoDB和Redis，也可以使用远程部署的实例，FreeEIS的相关内置模块允许配置其地址和端口。另外，Redis不是必须的，如果无法连接到Redis，FreeEIS将使用[memory-cache](https://github.com/ptarjan/node-cache#readme)做为缓存，这不会影响开发或运行。

```sh
# 安装后端脚手架

$ git clone https://github.com/freeeis/free-be-starter-kit.git be

# 安装依赖包
$ cd be
$ yarn install

# 创建存放机密数据的文件（也可手动创建）
$ touch global.js

# 运行
$ yarn start

```

### 访问系统

成功运行前后端工程后，通过链接[http://localhost:8080](http://localhost:8080/)来访问系统。也可通过修改配置，使前端运行后自动从浏览器中打开页面。

## 内置功能模块

我们期望通过提供一些内置的功能模块，来简化开发人员的工作，比如账号管理、权限控制这些在任何系统中都需要的功能，我们做成了模块，可以直接被引用。下面是一个列表，列出来目前我们所提供的内置功能模块，以及他们的功能。当然，根据我们的宗旨，我们不强制您使用任何一个内置模块，您可以根据自己的需要定制开发所有需要的模块，而只是使用FreeEIS的规范并用她来组装系统。并且我们鼓励您这么做，因为我们相信，在任何一个领域都有很多比我们更加专业的开发人员，我们希望有更多的人开发出越来越多的强大的功能模块供他人使用。

| 模块      | 前端模块 | 后端模块 | 功能 | 说明|
| :------- |------- |------- | ----|----: |
| 内核 | [free-fe-core](https://github.com/freeeis/free-fe-core) | [free-be-core](https://github.com/freeeis/free-be-core) | 加载其他模块|默认添加在脚手架中|
| 基础功能 | [free-fe-core-modules](https://github.com/freeeis/free-fe-core-modules) | [free-be-core-modules](https://github.com/freeeis/free-be-core-modules)| 数据字典、日志、菜单管理、系统配置、<br>错误代码管理、缓存管理、哀悼日、<br>文件处理、数据校验方法、<br>多语言支持、多皮肤支持等等 | 默认添加在脚手架中|
| 账号管理 | [free-fe-account](https://github.com/freeeis/free-fe-account) | [free-be-account](https://github.com/freeeis/free-be-account) |账号管理、组织结构管理、权限管理、<br>角色管理、权限控制| 默认添加在脚手架中|
| 数据库 | / | [free-be-mongodb](https://github.com/freeeis/free-be-mongodb) |数据库操作| 默认添加在脚手架中|
| 演示模块 | [free-fe-demo](https://github.com/freeeis/free-fe-demo) | [free-be-demo](https://github.com/freeeis/free-be-demo) |演示模块内部结构和使用方法| 默认添加在脚手架中|


## 联系我们

扫码添加微信加入交流群

<img width="120" alt="" style="margin-left:24px" src="https://user-images.githubusercontent.com/33030594/227093642-b38b7871-16eb-48b6-b96a-191433dc55c2.png">


## 贡献

FreeEIS虽然已经在多个大型项目中得到了验证，但做为开源项目她依然处于比较早期的阶段，需要各位大牛的帮助一起成长。我们欢迎任何建议或意见或贡献，小到一个字的修改，大到架构的调整建议。我们感谢您的任何捐赠、PR、Issue等等，有任何相关问题都可以发邮件给我们：【[freeeis@xixineis.com](mailto:freeeis@xixineis.com)】。感谢🙏🙏！！
