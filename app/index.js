'use strict'
const electron = require('electron')
const uuid = require('uuid/v1')
const firebase = require('firebase')
require('firebase/firestore')
require('dotenv').config()
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
      webSecurity: false
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

/*
**
** IMPORT LIBRARY
**
*/
const firebasedb = firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: process.env.FIREBASE_URL,
  projectId: process.env.FIREBASE_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER
}).firestore()

const db = {
  tracks: firebasedb.collection('tracks'),
  albums: firebasedb.collection('albums'),
  artists: firebasedb.collection('artists')
}

let completed = 0
let total = false
electron.ipcMain.on('import-library', (event, libraryPath) => {
  const child = spawnChild('./app/scripts/importLibrary.js')
  child.send(libraryPath)
  child.on('message', ({ type, data }) => {
    if (type === 'track') {
      handToDatabase(data).then((response) => {
        if (completed === total) {
          console.log('Finished')
          handToDatabase()
          batch.commit()
          event.sender.send('import-library-complete', true)
        } else {
          completed++
          event.sender.send('import-library-update', data)
        }
      })
    } else if (type === 'error') {
      child.disconnect()
    } else if (type === 'end') {
      total = data - 1
      console.log('End total is: ' + total)
      child.disconnect()
    }
  })
})

let batch = firebasedb.batch()
let batchSize = 0
async function handToDatabase (track) {
  if (batchSize < 400 || !(total > completed)) {
    batchSize++
    const success = await addToDatabase(track)
    return success
  } else {
    const completedBatch = batch
    batch = firebasedb.batch()
    const success = await completedBatch.commit().then(() => {
      addToDatabase(track)
      return success
    })
  }
}
async function addToDatabase (track) {
  const artist = await addArtist({ name: track.artist })
  const album = await addAlbum({ name: track.album })
  track.artist = artist
  track.album = album
  addTrack(track)
}
async function addArtist ({ name }) {
  const artistDoc = await db.artists.doc(escape(name))
  batch.update(artistDoc, { name: name, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
  return artistDoc
}
async function addAlbum ({ name }) {
  const albumDoc = await db.albums.doc(escape(name))
  batch.update(albumDoc, { name: name, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
  return albumDoc
}
async function addTrack (data) {
  const trackDoc = await db.tracks.doc(escape(data.name))
  const record = await trackDoc.get()
  if (record.exists) {
    data.updated = firebase.firestore.FieldValue.serverTimestamp()
    batch.update(trackDoc, data)
  } else {
    data.uuid = uuid()
    data.created = firebase.firestore.FieldValue.serverTimestamp()
    batch.set(trackDoc, data)
  }
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
