'use strict'
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const isDev = process.env.NODE_ENV === 'development'

let config

if (isDev) {
  config = require('../build/config')
} else {
  config = {}
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 640,
    title: 'A Sound Player',
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
      nodeIntegrationInWorker: true
    }
  })

  // and load the index.html of the app.
  const url = isDev ? `http://${config.devServer.host}:${config.devServer.port}` : `file://${__dirname}/dist/index.html`
  mainWindow.loadURL(url)

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools()

    const installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err))
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// If we need to ping the main thread to work out what is currently going on (eg: to rebuild destroyed component)
// We reply with contents of currentActivity
// If nothing: 'pong' message is false
// If activity: 'pong' is an object with info that activity decides is important
let currentActivity = false
electron.ipcMain.on('ping', (event) => {
  console.log('Oh hello', currentActivity)
  event.sender.send('pong', currentActivity)
})

electron.ipcMain.on('open-dialog', (event, params) => {
  electron.dialog.showOpenDialog(params, result => {
    event.sender.send('open-dialog-reply', result)
  })
})

const path = require('path')
const fork = require('child_process').fork
function spawnChild (file) {
  const program = path.resolve(file)
  return fork(program, [], { stdio: ['ipc', 'inherit', 'inherit'] })
}

electron.ipcMain.on('upload-library', (event, queue) => {
  currentActivity = {
    state: 'uploading',
    total: queue.length,
    progress: 0
  }
  const child = spawnChild('./app/scripts/uploadLibrary.js')
  child.send(queue)
  console.log('Started uploading library....')
  child.on('message', ({ type, data }) => {
    console.log(type + ' message received: ', data)
    if (type === 'progress') {
      currentActivity.progress++
      event.sender.send('upload-library-update', data)
    } else if (type === 'error') {
      child.disconnect()
    } else if (type === 'end') {
      event.sender.send('upload-library-complete', true)
      console.log('Finished uploading library....')
      currentActivity = false
      child.disconnect()
    }
  })
})
