import { mapGetters } from 'vuex'
import './style.css'
import Sidebar from '../Sidebar'

export default {
  data () {
    return {
      drawer: false
    }
  },
  components: {
    Sidebar
  },
  created () {
    this.$store.dispatch('setupCloudRefs')
  },
  render (h) {
    return (
      <v-app id='app'>
        <Sidebar open={this.drawer} />
        { this.header() }
        <v-content>
          <v-container fluid fill-height>
            <router-view></router-view>
          </v-container>
        </v-content>
      </v-app>
    )
  },
  methods: {
    _openDrawer () {
      this.drawer = !this.drawer
    },
    header () {
      return (
        <v-toolbar id='header' color='blue darken-3' dark app clipped-left fixed>
          <v-toolbar-title style={this.$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'} class='ml-0 pl-3'>
            <v-toolbar-side-icon onClick={() => this._openDrawer()}></v-toolbar-side-icon>
            <span class='hidden-xs-only'>{this.$route.name ? this.$route.name : this.$route.path}</span>
          </v-toolbar-title>
        </v-toolbar>
      )
    }
  }
}
