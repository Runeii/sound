import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'
const uuid = require('uuid/v1')
import firebase from 'firebase/app'
require('firebase/firestore')
require('dotenv').config()
import ImportWorker from '../workers/importLibrary.worker.js'
import UploadWorker from '../workers/uploadLibrary.worker.js'

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
  cloud: true,
  uploadWorker: false
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
  },
  uploadWorker: state => { 
    return state.uploadWorker
  }
}

const mutations = {
  ...firebaseMutations,
  TOGGLE_CLOUD_LIBRARY (state, boolean) {
    state.cloud = boolean
  },
  STORE_UPLOAD_WORKER (state, worker) {
    state.uploadWorker = worker
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
  },
  uploadLibraryFiles ({ dispatch, commit, getters}) {
    const child = new UploadWorker()
    commit('STORE_UPLOAD_WORKER', child)
    child.postMessage(getters.uploadQueue)
    child.onmessage = (e) => {
      console.log('Received a message')
      const { type, data } = e.data
      if (type === 'success') {
        dispatch('updateTrack', data)
        console.log('UPDATE IN VUex', data)
      } else if (type === 'error') {
        console.log('ERROR', data)
      } else if (type === 'end') {
        console.log('END')
      }
    }
    return true
  },
  updateTrack ({ commit }, ) {

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
