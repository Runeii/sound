import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['uploadWorker', 'library', 'uploadQueue']),
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
  created () {
    if (this.uploadWorker) {
      this.uploadWorker.postMessage('getStatus')
      this.uploadWorker.onmessage = (e) => {
        const { type, data } = e.data
        if (type === 'status') {
          this.total = data.total
          this.progress = data.progress
          this.fieldProgressMessages()
        }
      }
    }
  },
  methods: {
    uploadLibrary () {
      this.activity = true
      this.total = this.queueSize
      this.$store.dispatch('uploadLibraryFiles').then(s => this.fieldProgressMessages())
    },
    fieldProgressMessages () {
      this.uploadWorker.onmessage = (e) => {
        const { type } = e.data
        if (type === 'success') {
          console.log('UPDATE IN component')
          this.progress++
        } else if (type === 'error') {
          this.activity = false
        } else if (type === 'end') {
          this.complete = true
          this.$store.dispatch('toggleCloudLibrary', true)
          this.activity = false
        }
      }
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
