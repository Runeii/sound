const getItunesTracks = require('@johnpaulvaughan/itunes-music-library-tracks').getItunesTracks
const { machineIdSync } = require('node-machine-id')
import firebase from 'firebase/app'
require('firebase/firestore')
const uuid = require('uuid/v1')

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

const deviceID = machineIdSync()

onmessage = (e) => {
  let currentBatch = []
  let total = 0

  const trackStream = getItunesTracks(e.data)

  trackStream.on('data', (rawStream) => {
    total++
    const rawData = JSON.parse(rawStream)
    currentBatch.push(structureData(rawData))

    if (!(total % 400)) {
      processBatch(currentBatch)
      currentBatch = []
    }
  })

  trackStream.on('error', (err) => {
    postMessage({ type: 'error', data: err })
  })

  trackStream.on('end', () => {
    processBatch(currentBatch)
    postMessage({ type: 'end', data: total })
  })
}

function structureData (data) {
  const track = {
    name: data['Name'] || '[Untitled]',
    artist: data['Artist'] || 'Unknown Artist',
    album: data['Album'] || 'Unknown Album',
    length: data['Total Time'] || null,
    trackNumber: data['Track Number'] || null,
    src: {}
  }
  track['src'][deviceID] = data['Location']
  return track
}

async function processBatch (currentSet) {
  const batch = firebasedb.batch()

  const processBatchAsync = async () => {
    await asyncForEach(currentSet, async (data) => {
      const artist = await db.artists.doc(escape(data.artist))
      const album = await db.albums.doc(escape(data.album))
      const track = await db.tracks.doc(escape(data.name))
      console.log(artist)
      batch.set(artist, { name: data.artist, albums: [album] }, { merge: true })
      batch.set(album, { name: data.album, artist: artist }, { merge: true })
      batch.set(track, { ...data, artist: artist, album: album, uuid: uuid() }, { merge: true })
    })
    batch.commit().then(() => {
      postMessage({ type: 'update', data: currentSet.length })
    })
  }
  processBatchAsync()
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
