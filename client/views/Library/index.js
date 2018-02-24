import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      view: 'albums'
    }
  },
  computed: {
    ...mapGetters(['getTracksByAlbum']),
    library () {
      return this.$store.state.library[this.view]
    }
  },
  methods: {
    ...mapActions(['playTrack', 'addToQueue']),
    async getCollectionOfTracks (type, index) {
      return await this.getTracksByAlbum(index)
        .sort((a, b) => a.trackNumber > b.trackNumber)
        .map(t => { return t.uuid })
    },
    async playCollection (type, index) {
      const collection = await this.getCollectionOfTracks(type, index)
      this.playTrack(collection)
    },
    async queueCollection (type, index) {
      const collection = await this.getCollectionOfTracks(type, index)
      this.addToQueue(collection)
    }
  },
  render (h) {
    return (<v-layout row wrap>
        { this.library.map((album) => {
          return (
          <v-flex xs4 sm3><v-card light>
            <v-card-media onClick={() => this.playCollection('album', album.name)} />
            <v-card-title primary-title onClick={() => this.playCollection('album', album.name)}>
              <div>
                <div class='body-2'>{album.name}</div>
                <div class='caption grey--text'>{album.artist.name}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn icon onClick={() => this.queueCollection('album', album.name)}><v-icon>playlist_add</v-icon></v-btn>
            </v-card-actions>
          </v-card></v-flex>)
        })}
      </v-layout>)
  }
}
