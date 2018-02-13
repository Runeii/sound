import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'
const uuid = require('uuid/v1')
const firebase = require('firebase')
require('firebase/firestore')
require('dotenv').config()
import ImportWorker from '../workers/importLibrary.worker.js'

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
  importItunesLibraryFile ({ commit }, path) {
    const child = new ImportWorker()
    child.postMessage(path)
    child.onmessage = (e) => {
      const { type, data } = e.data
      if (type === 'update') {
        console.log('UPDATE', data)
      } else if (type === 'error') {
        console.log('ERROR', data)
      } else if (type === 'end') {
        console.log('END', data)
      }
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
