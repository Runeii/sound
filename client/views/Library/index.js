export default {
  data () {
    return {
    }
  },
  computed: {
    library () {
      return this.$store.state.library.records || []
    },
    headers () {
      if (this.library[0]) {
        return Object.keys(this.library[0]).map(key => {
          return {text: key, value: key}
        })
      }
      return []
    }
  },
  methods: {
    updateLibrary () {
      this.$store.dispatch('getTracks')
    },
    displayTrackOptionsMenu (id) {
      const response = confirm('Play immediately?') // eslint-disable-line
      if (response === true) {
        this.playTrack(id)
      } else {
        this.queueTrack(id)
      }
    },
    playTrack (id) {
      this.$store.dispatch('playTrack', id)
      this.$router.push('/?play=true')
    },
    queueTrack (id) {
      this.$store.dispatch('queueTrack', id)
    },
    renderTrackListing () {
      const rows = []
      this.library.forEach(track => {
        rows.push(<tr>
          <td>{track.Name}</td>
          <td>{track.Artist}</td>
          <td>{track.Album}</td>
          <td><button class='' onClick={() => this.displayTrackOptionsMenu(track.id)}>...</button></td>
        </tr>)
      })
      return rows
    }
  },
  render (h) {
    return (
      <v-data-table headers={this.headers} items={this.library} class="elevation-1">
      </v-data-table>
    )
  }
}
