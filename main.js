// 这里是主进程(main process)
// 运行在NodeJS环境

const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {

  // 一个 BrowserWindow 实例对应着一个 渲染器进程(renderer process)
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  return win
}

app.whenReady().then(() => {
  const win = createWindow()
  // console.log(win.webContents)

  // For Windows and Linux
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  // For macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})