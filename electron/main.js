import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import electronReloader from "electron-reloader";
import { fileURLToPath } from "url";

// 获取当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let win; // 使用 let 声明 win 变量

// 判断是否为开发环境
// const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 网页相关配置
      preload: path.join(__dirname, "preload.cjs"),
      // preload: path.join(app.getAppPath(), 'electron', 'preload.cjs'), // 预加载脚本路径（适配打包后路径）
      //     preload: isDev
      // ? path.join(__dirname, 'preload.cjs') // 开发环境路径
      // : path.join(process.resourcesPath, 'app.asar', 'preload.cjs'), // 生产环境路径

      // nodeIntegration: false, // 是否启用 Node.js 集成
      // contextIsolation: true, // 是否启用上下文隔离
      // enableRemoteModule: false, // 是否启用 remote 模块
      // sandbox: false, // 是否启用沙盒模式
      // devTools: true, // 是否启用开发者工具
      // webSecurity: true, // 是否启用 Web 安全
      // additionalArguments: [], // 传递给渲染进程的额外参数
      // spellcheck: true, // 是否启用拼写检查
      // partition: null, // 指定 session 分区
      // zoomFactor: 1.0, // 缩放因子
      // backgroundThrottling: true, // 是否在后台限制性能
      // offscreen: false, // 是否启用离屏渲染
      // safeDialogs: false, // 是否启用安全对话框
      // safeDialogsMessage: "", // 安全对话框的消息
      // disableDialogs: false, // 是否禁用对话框
      // autoplayPolicy: "no-user-gesture-required", // 自动播放策略
      // webviewTag: false, // 是否启用 <webview> 标签
      // nativeWindowOpen: true, // 是否启用原生窗口打开
      // plugins: false, // 是否启用插件支持
      // experimentalFeatures: false, // 是否启用实验性功能
      // enableBlinkFeatures: "", // 启用的 Blink 功能
      // disableBlinkFeatures: "", // 禁用的 Blink 功能
    },
    // title: "My Electron App", // 窗口标题
    // icon: path.join(__dirname, "renwutouxiang.jpg"), // 窗口图标
    // show: true, // 是否在创建时显示窗口
    frame: false, // 是否显示窗口框架
    backgroundColor: "#000000", // 窗口背景颜色
    // resizable: true, // 是否允许调整窗口大小
    // minimizable: true, // 是否允许最小化
    // maximizable: true, // 是否允许最大化
    // closable: true, // 是否允许关闭
    // fullscreen: false, // 是否启动全屏模式
    // fullscreenable: true, // 是否允许全屏
    // skipTaskbar: false, // 是否跳过任务栏
    // kiosk: false, // 是否启用 kiosk 模式
    // alwaysOnTop: false, // 是否始终置顶
    // opacity: 1.0, // 窗口透明度
    transparent: true, // 是否启用透明窗口
    // hasShadow: true, // 是否启用窗口阴影
    // parent: null, // 父窗口
    // modal: false, // 是否为模态窗口
    // acceptFirstMouse: false, // 是否允许首次单击激活窗口
    // disableAutoHideCursor: false, // 是否禁用自动隐藏光标
    autoHideMenuBar: true, // 是否自动隐藏菜单栏
    // titleBarStyle: "default", // 标题栏样式
    // trafficLightPosition: { x: 0, y: 0 }, // macOS 窗口控制按钮位置
    // thickFrame: true, // 是否启用厚边框
    // vibrancy: null, // macOS 窗口模糊效果
    // zoomToPageWidth: false, // 是否缩放到页面宽度
    // tabbingIdentifier: null, // macOS 标签标识符
  });
  // 生成文件路径
  // const indexPath = path.join(__dirname, '../dist/index.html');
  // win.loadURL(indexPath);

  // 加载 Vue 开发服务器的地址
  win.loadURL("http://localhost:3000");

  console.log(process.env.NODE_ENV);

  //   // 根据环境加载不同的 URL
  // if (process.env.NODE_ENV === 'development') {
  //   win.loadURL('http://localhost:3000'); // 开发环境
  // } else {
  //   win.loadFile(path.join(__dirname, '../dist/index.html')); // 生产环境
  // }

  // win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../dist/index.html')}`);

  win.webContents.openDevTools(); // 开启开发者工具

  // 监听窗口关闭事件
  win.on("close", () => {
    win = null; // 清除引用
  });
  // 监听最小化窗口的消息
  ipcMain.on("minimize-window", () => {
    if (win) {
      win.minimize();
    }
  });
  // 监听放大窗口的消息
  ipcMain.on("maximize-window", () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  });

  // 关闭默认菜单
  // win.setMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  // 启用 electron-reloader
  if (process.env.NODE_ENV === "development") {
    electronReloader(module, {
      watchRenderer: true,
      watchMain: true,
    });
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 当窗口开始活动时触发
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// 只在开发环境中启用 electron-reload
if (process.env.NODE_ENV === "development") {
  try {
    const electronReload = await import("electron-reload");
    electronReload.default(path.join(__dirname, "../"), {
      electron: path.join(__dirname, "node_modules", ".bin", "electron"),
      hardResetMethod: "exit",
    });
  } catch (error) {
    console.error("Failed to load electron-reload:", error);
  }
}

// // main.js (主进程)
// win.webContents.setWindowOpenHandler((details) => {
//   // 阻止创建新窗口，在当前窗口加载内容
//   win.loadURL(details.url);
//   return { action: 'deny' };
// });

// console.log('Preload script path:', isDev
//   ? path.join(__dirname, 'preload.cjs')
//   : path.join(process.resourcesPath, 'app.asar', 'preload.cjs'));
