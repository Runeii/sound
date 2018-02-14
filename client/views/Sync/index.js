import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      activity: false,
      complete: false,
      failed: false,
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
    openButton () {
      return (
        <v-btn loading={this.activity} on-click={() => this.uploadLibrary()} disabled={this.activity} color="success" class="white--text">
          { !this.activity ? 'Start upload' : 'Uploading...' }
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
      )
    },
    completedButton () {
      return (
        <v-btn>
        Complete
        </v-btn>
      )
    },
    failedButton () {
      return (
        <v-btn>
        Failed
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
      this.uploadWorker.addEventListener('message', (e) => {
        const { type } = e.data
        if (type === 'success') {
          this.progress++
        } else if (type === 'error') {
          this.activity = false
          this.failed = true
        } else if (type === 'end') {
          this.activity = false
          this.completed = true
          this.$store.dispatch('toggleCloudLibrary', true)
        }
      })
    }
  },
  render (h) {
    return (
      <v-layout column justify-center align-center class='settings'>
        { !this.complete && !this.failed ? this.openButton : false }
        { this.complete ? this.completedButton : false }
        { this.failed ? this.failedButton : false }
        <p class='subheading grey--text text--darken-1'>{this.total ? this.progress + '/' + this.total : this.queueSize } tracks</p>
      </v-layout>
    )
  }
}
