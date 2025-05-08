# Electron-Vue3开发桌面应用模板

#### 介绍

文章介绍地址：[Electron + Vue3 开发桌面应用+附源码什么是 Electron？ Electron 是一个使用 JavaS - 掘金](https://juejin.cn/post/7430809743081160744)

Electron-Vue3开发桌面应用模板

![b1d785e6c124cd9e2f89663adbac45f.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b9f6447347bc41648dd856d79df9a6a2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6LW16KaB5LiK5aSp:q75.awebp?rk3s=f64ab15b&x-expires=1747175277&x-signature=aeKOeK5EWVd76VMyqf0oSYUIChk%3D)


#### 软件架构
软件架构说明

vu3 + Electron

#### 使用说明

1.  安装依赖：npm i
2.  允许：npm run electron:dev
3.  打包：npm run electron:build

安装失败切换electron官方源：

npm config set electron_mirror https://cdn.npmmirror.com/binaries/electron/
npm config set electron_builder_binaries_mirror https://npmmirror.com/mirrors/electron-builder-binaries/



打包得时候要去 electron/main.js 路径下 

 win.loadURL('http://localhost:3000');注释 改成

```
const indexPath = path.join(__dirname, '../dist/index.html');
win.loadURL(indexPath);
```



可以打开调试工具

```
win.webContents.openDevTools(); // 开启开发者工具
```
