import './style.css'
import NotificationBar from '../NotificationBar'

import Sidebar from '../Sidebar'
import PlayDrawer from '../PlayDrawer'
import Footer from '../Footer'

export default {
  data () {
    return {
      open: false
    }
  },
  components: {
    Sidebar,
    Footer,
    NotificationBar
  },
  created () {
    this.$store.dispatch('setupCloudRefs')
  },
  render (h) {
    return (
      <v-app id='app'>
        <NotificationBar />
        <v-navigation-drawer id='sidebar' fixed clipped app v-model={this.open}>
          <Sidebar />
        </v-navigation-drawer>
        { this.header() }
        <v-content>
          <v-container fluid fill-height>
            <router-view></router-view>
          </v-container>
        </v-content>
        <PlayDrawer />
        <Footer />
      </v-app>
    )
  },
  methods: {
    _openDrawer () {
      this.open = !this.open
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
