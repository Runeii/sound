import fs from 'fs'
const mID = require('node-machine-id')
const machineId = mID.machineIdSync()
require('dotenv').config()

import firebase from 'firebase/app'
require('firebase/storage')

const filesystem = firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: process.env.FIREBASE_URL,
  projectId: process.env.FIREBASE_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER
}).storage().ref()

onmessage = (e) => {
  const queue = e.data
  const startProcessASynchronously = async () => {
    await asyncForEach(queue, async (track) => {
      const fileRef = filesystem.child(track.uuid)
      const localPath = decodeURI(track.src[machineId].replace(/^(file:\/\/)/, ''))
      fs.readFile(localPath, (err, data) => {
        fileRef.put(data).then(snapshot => {
          postMessage({ type: 'success', data: track })
        }).catch(err => {
          postMessage({ type: 'error', data: JSON.stringify(err) })
          Promise.reject()
        })
      })
    })
    postMessage({ type: 'end' })
  }
  startProcessASynchronously()
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
