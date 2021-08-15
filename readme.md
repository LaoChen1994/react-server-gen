## React Server 使用

### 1. 介绍

一个 koa + react + typescript开箱即用的方案

### 2. 安装使用

可以搭配相应的yeoman cli脚手架进行命令行建站，操作过程如下

```bash
npm install -g yo
npm install -g generator-my-bff
```

Then generate your new project:

```bash
yo my-bff
```       


### 3. 启动命令

```bash
# 依赖安装
npm run dep:install

# 启动server
npm run start

# 开发模式打包资源
npm run dev

# 打包server
npm run build-server

```