import { mapGetters } from 'vuex'
import fileExists from 'file-exists'
const { ipcRenderer } = require('electron')

export default {
  data () {
    return {
      activity: false,
      complete: false,
      progress: 0,
      total: false,
      attempted: false
    }
  },
  created () {
    ipcRenderer.send('ping')
    ipcRenderer.on('pong', (event, response) => {
      if (response && response.state === 'uploading') {
        this.total = response.total
        this.progress = response.progress
        this.fieldProgressMessages()
      }
    })
  },
  computed: {
    ...mapGetters(['library', 'uploadQueue']),
    queueSize () {
      return this.uploadQueue.length
    },
    completedButton () {
      return (
        <v-btn>
        Complete
        </v-btn>
      )
    },
    openButton () {
      return (
        <v-btn loading={this.activity} on-click={this.uploadLibrary()} disabled={this.activity} color="success" class="white--text">
          { !this.activity ? 'Start upload' : 'Uploading...' }
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
      )
    }
  },
  methods: {
    uploadLibrary () {
      this.activity = true
      this.total = this.queueSize
      ipcRenderer.send('upload-library', this.library)
      this.fieldProgressMessages()
    },
    fieldProgressMessages () {
      ipcRenderer.on('upload-library-update', (event, response) => {
        this.progress++
      })
      ipcRenderer.once('upload-library-complete', (event, response) => {
        this.complete = true
        this.$store.dispatch('toggleCloudLibrary', true)
        this.activity = false
      })
    }
  },
  render (h) {
    return (
      <v-layout column justify-center align-center class='settings'>
        { !this.complete ? this.openButton : this.completedButton }
        <p class='subheading grey--text text--darken-1'>{this.total ? this.progress + '/' + this.total : this.queueSize } tracks</p>
      </v-layout>
    )
  }
}
