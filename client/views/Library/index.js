export default {
  data () {
    return {
    }
  },
  computed: {
    library () {
      return this.$store.state.library.records
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
      this.library.tracks.forEach(track => {
        rows.push(<tr>
          <td>{track.title}</td>
          <td>{track.artist}</td>
          <td>{track.album}</td>
          <td><button class='' onClick={() => this.displayTrackOptionsMenu(track.id)}>...</button></td>
        </tr>)
      })
      return rows
    }
  },
  render (h) {
    return (
      <div class=''>
        <button onClick={this.updateLibrary}>Update</button>
        <table class=''>
          <thead>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
          </thead>
          <tbody>
            {this.renderTrackListing()}
          </tbody>
        </table>
      </div>
    )
  }
}
