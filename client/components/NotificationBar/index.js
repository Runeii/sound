import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({
      pointer: state => state.player.pointer
    }),
    ...mapGetters(['currentTrack']) 
  },
  methods: {
    ...mapActions(['playTrack', 'pauseTrack', 'previousTrack', 'nextTrack']),
    notifications () {
      console.log(this.currentTrack)
      if ('mediaSession' in navigator) {
        console.log('test')
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.currentTrack.name,
          artist: this.currentTrack.artist.name,
          album: this.currentTrack.album.name
        })
        navigator.mediaSession.setActionHandler('play', () => this.playTrack())
        navigator.mediaSession.setActionHandler('pause', () => this.pauseTrack())
        navigator.mediaSession.setActionHandler('previoustrack', () => this.previousTrack())
        navigator.mediaSession.setActionHandler('nexttrack', () => this.nextTrack())
      }
    }
  },
  render () {
    return this.pointer !== false ? this.notifications() : <div>test</div>
  }
}