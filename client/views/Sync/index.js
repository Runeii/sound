import { mapGetters } from 'vuex'
import fileExists from 'file-exists'
const { ipcRenderer } = require('electron')

export default {
  data () {
    return {
      activity: false,
      complete: false,
      progress: 0
    }
  },
  computed: {
    ...mapGetters(['library']),
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
      ipcRenderer.send('upload-library', this.library)
      ipcRenderer.on('upload-library-update', (event, response) => {
        this.progress = response
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
        <p class='subheading grey--text text--darken-1'>{this.progress}</p>
      </v-layout>
    )
  }
}
