import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import electronReloader from 'electron-reloader';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let win;  // 使用 let 声明 win 变量

function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 430,
    frame: false, // 取消window自带的关闭最小化等
    resizable: true, // 禁止改变主窗口尺寸
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });
  // 生成文件路径
  const indexPath = path.join(__dirname, '../dist/index.html');

  // 加载 Vue 开发服务器的地址
  // win.loadURL('http://localhost:3000');
  win.loadURL(indexPath);
  win.webContents.openDevTools(); // 开启开发者工具

  // 监听窗口关闭事件
  win.on('close', () => {
    win = null;  // 清除引用
  });
  // 监听最小化窗口的消息
  ipcMain.on('minimize-window', () => {
    if (win) {
      win.minimize();
    }
  });
  // 监听放大窗口的消息
  ipcMain.on('maximize-window', () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  });

  // 关闭默认菜单
  win.setMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  // 启用 electron-reloader
  if (process.env.NODE_ENV === 'development') {
    electronReloader(module, {
      watchRenderer: true,
      watchMain: true
    });
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 当窗口开始活动时触发
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 只在开发环境中启用 electron-reload
if (process.env.NODE_ENV === 'development') {
  try {
    const electronReload = await import('electron-reload');
    electronReload.default(path.join(__dirname, '../'), {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
      hardResetMethod: 'exit'
    });
  } catch (error) {
    console.error('Failed to load electron-reload:', error);
  }
}
