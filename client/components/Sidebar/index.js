import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  props: ['open'],
  computed: {
    ...mapGetters(['currentTrack'])
  },
  render () {
    return (
        <v-list two-line subheader>
          <v-subheader>Music</v-subheader>
          <v-list-tile avatar on-click={() => this.$router.push({ name: 'Now Playing' })}>
            <v-list-tile-action>
              <v-icon>play_arrow</v-icon>
            </v-list-tile-action>
            { this.currentTrack
              ? <v-list-tile-content>
                  <v-list-tile-title>Now Playing</v-list-tile-title>
                  <v-list-tile-sub-title>{this.currentTrack.name} - {this.currentTrack.artist.name}</v-list-tile-sub-title>
                </v-list-tile-content>
              : <v-list-tile-content style='opacity:0.5'>
                  <v-list-tile-title>Now Playing</v-list-tile-title>
                  <v-list-tile-sub-title>Nothing playing</v-list-tile-sub-title>
                </v-list-tile-content> }
          </v-list-tile>
          <v-list-tile avatar on-click={() => this.$router.push({ name: 'Library' })}>
            <v-list-tile-action>
              <v-icon>library_music</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Library</v-list-tile-title>
              <v-list-tile-sub-title>View music library</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-subheader>Settings</v-subheader>
          <v-list-tile avatar on-click={() => this.$router.push({ name: 'Sync' })}>
            <v-list-tile-action>
              <v-icon>import_export</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Cloud sync</v-list-tile-title>
              <v-list-tile-sub-title>Cloud library settings</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar on-click={() => this.$router.push({ name: 'Import' })}>
            <v-list-tile-action>
              <v-icon>library_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Import iTunes</v-list-tile-title>
              <v-list-tile-sub-title>Import local iTunes library</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    )
  }
}