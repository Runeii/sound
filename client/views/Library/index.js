import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['library']),
    headers () {
      return [
        { text: 'Title', value: 'title', align: 'left'},
        { text: 'Length', value: 'length' },
        { text: 'Artist', value: 'artist', align: 'left' },
        { text: 'Album', value: 'album', align: 'left' },
      ]
    }
  },
  methods: {
    displayTrackOptionsMenu (id) {
      const response = confirm('Add track to queue?') // eslint-disable-line
      if (response === true) {
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
    trackRow (track) {
      return (
        <tr onClick={() => this.playTrack(track._id)}>
          <td>{track.title}</td>
          <td>{track.length}</td>
          <td>{track.artist}</td>
          <td>{track.album}</td>
          <td>
            <v-icon onClick={() => this.displayTrackOptionsMenu(track._id)}>more_horiz</v-icon>
          </td>
        </tr>
      )
    }
  },
  render (h) {
    return (
      <v-data-table hide-actions headers={this.headers} items={this.library} class="elevation-1" { ...{
        scopedSlots: {
          items: items => {
            return this.trackRow(items.item)
          }
        }
      } }></v-data-table>
    )
  }
}
