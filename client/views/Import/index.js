import fileExists from 'file-exists'
const {remote, ipcRenderer} = require('electron')

export default {
  data () {
    return {
      userHome: remote.app.getPath('home'),
      itunesPath: false,
      complete: false,
      detecting: true,
      detected: false,
      activity: true,
      tracksAdded: 0
    }
  },
  mounted () {
    if (this.autoDetectItunesLibraryPath()) {
      this.detected = true
    }
    this.detecting = false
    this.activity = false
  },
  computed: {
    completedButton () {
      return (
        <v-btn>
        Complete
        </v-btn>
      )
    },
    detectingButton () {
      return (
        <v-btn loading={this.detecting} disabled={this.detecting}>
        Please wait...
          <span slot='loader'>Please wait...</span>
        </v-btn>
      )
    },
    openButton () {
      if (this.detected) {
        return (
          <v-btn loading={this.activity} on-click={this.importLibrary()} disabled={this.activity} color="success" class="white--text">
            Start import
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
        )
      } else {
        return (
          <v-btn loading={this.activity} on-click={this.openLibrary()} disabled={this.activity} color="blue-grey" class="white--text">
            Locate iTunes library
            <v-icon right dark>open_in_browser</v-icon>
          </v-btn>
        )
      }
    },
    status () {
      if (this.detecting) return 'Attempting to automatically find iTunes library file location'
      if (!this.detecting && !this.detected) return 'Please select iTunes Library XML file'
      if (!this.activity && this.detected) return false
      if (this.activity && this.detected) return `Importing...added ${this.tracksAdded} tracks`
      if (this.completed) return `Import successful. Added ${this.tracksAdded} tracks`
    }
  },
  methods: {
    autoDetectItunesLibraryPath () {
      const possible = [
        this.userHome + '/Music/iTunes/iTunes Music Library.xml',
        this.userHome + '/Music/iTunes/iTunes Library.xml',
        this.userHome + '/My Music/iTunes/iTunes Music Library.xml',
        this.userHome + '/My Music/iTunes/iTunes Library.xml'
      ]
      const success = possible.filter(path => {
        return fileExists.sync(path)
      })
      if (success.length > 0) {
        this.itunesPath = success[0]
        return true
      } else {
        return false
      }
    },
    openLibrary () {
      this.activity = true
      ipcRenderer.send('open-dialog', {
        defaultPath: this.userHome,
        filters: [
          { name: 'XML iTunes Library file', extensions: ['xml'] }
        ],
        properties: ['openFile', 'openDirectory']
      })
      ipcRenderer.once('open-dialog-reply', (event, response) => {
        this.itunesPath = response[0]
        this.detected = true
        this.activity = false
      })
    },
    importLibrary () {
      this.activity = true
      ipcRenderer.send('import-library', this.itunesPath)
      ipcRenderer.on('import-library-update', (event, response) => {
        this.$store.dispatch('addToDatabase', {
          name: response['Name'],
          artist: response['Artist'],
          album: response['Album'],
          length: response['Total Time'],
          trackNumber: response['Track Number'],
          src: {
            file: response['Location']
          },
          meta: {
            itunes: response
          }
        })
        this.tracksAdded += 1
      })
      ipcRenderer.once('import-library-complete', (event, response) => {
        this.complete = true
        this.activity = false
      })
    }
  },
  render (h) {
    return (
      <v-layout column justify-center align-center class='settings'>
        {this.complete ? this.completedButton : (this.detecting ? this.detectingButton : this.openButton) }
        <p class='subheading grey--text text--darken-1'>{this.status}</p>
      </v-layout>
    )
  }
}
