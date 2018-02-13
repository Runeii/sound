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
        { text: 'Title', value: 'title', align: 'left' },
        { text: 'Length', value: 'length' },
        { text: 'Artist', value: 'artist', align: 'left' },
        { text: 'Album', value: 'album', align: 'left' }
      ]
    }
  },
  methods: {
    displayTrackOptionsMenu (uuid) {
      const response = confirm('Add track to queue?') // eslint-disable-line
      if (response === true) {
        this.queueTrack(uuid)
      }
    },
    playTrack (uuid) {
      this.$store.dispatch('playTrack', uuid)
      this.$router.push('/?play=true')
    },
    queueTrack (uuid) {
      this.$store.dispatch('queueTrack', uuid)
    },
    trackRow (track) {
      return (
        <tr onClick={() => this.playTrack(track.uuid)}>
          <td>{track.name}</td>
          <td>{this.formatMilliseconds(track.length)}</td>
          <td>{track.artist.name}</td>
          <td>{track.album.name}</td>
          <td>
            <v-icon onClick={() => this.displayTrackOptionsMenu(track.uuid)}>more_horiz</v-icon>
          </td>
        </tr>
      )
    }
  },
  render (h) {
    return (
      <v-data-table hide-actions headers={this.headers} items={this.library} class='elevation-1' { ...{
        scopedSlots: {
          items: items => {
            return this.trackRow(items.item)
          }
        }
      } }></v-data-table>
    )
  }
}
