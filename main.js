const electron = require('electron')
const Menu = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

// app.on('browser-window-created',function(e,window) {
//   window.setMenu(null);
// });

function createWindow() {

  mainWindow = new BrowserWindow({
    width:800,
    height:600,
    icon: __dirname + '/icon.png'
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}