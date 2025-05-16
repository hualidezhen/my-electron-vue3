const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    minimizeWindow: () => ipcRenderer.send('minimize-window'), //缩小
    maximizeWindow: () => ipcRenderer.send('maximize-window'), //放大
});
