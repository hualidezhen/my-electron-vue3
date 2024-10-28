import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let win;  // 使用 let 声明 win 变量

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // 生成文件路径
  const indexPath = path.join(__dirname, '../dist/index.html');
  console.log('Loading URL:', `file://${indexPath}`);

  // 加载 Vue 开发服务器的地址
  // win.loadURL('http://localhost:3000');
  win.loadURL(`file://${indexPath}`);

  // 监听窗口关闭事件
  win.on('closed', () => {
    win = null;  // 清除引用
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
