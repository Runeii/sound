import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@firebase/app'
import '@firebase/firestore'
import { firebaseAction, firebaseMutations } from 'vuexfire'
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

Vue.use(Vuex)

const state = {
  tracks: [],
  artists: [],
  albums: [],
  cloud: true
}

const getters = {
  tracks: state => state.tracks,
  artists: state => state.artists,
  albums: state => state.albums,
  recordExists: (state) => (type, name) => {
    const filtered = state[type].filter(record => record.name === name)
    return (filtered.length > 0) ? filtered : false
  },
  uploadQueue: state => {
    return state.tracks.filter(record => record.src.cloud !== true)
  }
}

const mutations = {
  ...firebaseMutations,
  TOGGLE_CLOUD_LIBRARY (state, boolean) {
    state.cloud = boolean
  }
}

const actions = {
  setupCloudRefs: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('tracks', db.tracks)
    bindFirebaseRef('albums', db.albums)
    bindFirebaseRef('artists', db.artists)
  }),
  async addToDatabase ({ commit, dispatch, getters }, data) {
    const deviceID = getters.deviceID
    const track = {
      name: data['Name'],
      artist: data['Artist'],
      album: data['Album'],
      length: data['Total Time'],
      trackNumber: data['Track Number'],
      src: {}
    }
    track['src'][deviceID] = data['Location']
    const artist = await dispatch('addArtist', { name: track.artist })
    const album = await dispatch('addAlbum', { name: track.album })
    dispatch('addTrack', { ...track, artist: artist, album: album })
  },
  async addArtist ({ commit, dispatch, getters }, { name }) {
    const artistDoc = db.artists.doc(name)
    artistDoc.update({ name: name, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
    return artistDoc
  },
  async addAlbum ({ commit, dispatch }, { name }) {
    const albumDoc = db.albums.doc(name)
    albumDoc.update({ name: name, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
    return albumDoc
  },
  async addTrack ({ commit, dispatch, state }, data) {
    const track = await db.tracks.doc(data.name).get()
    if (track.exists && track.data().uuid) {
      db.tracks.doc(data.name).update({ ...data, created: firebase.firestore.FieldValue.serverTimestamp() })
      console.log('Updated document for ' + data.name)
    } else {
      db.tracks.doc(data.name).set({ ...data, uuid: uuid(), created: firebase.firestore.FieldValue.serverTimestamp() })
      console.log('Created new document for ' + data.name)
    }
  },
  toggleCloudLibrary ({ commit }, boolean) {
    commit('TOGGLE_CLOUD_LIBRARY', boolean)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
