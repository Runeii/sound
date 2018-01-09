import './style.css'

export default {
  created () {
    this.$store.dispatch('getTracks')
  },
  render(h) {
    return (
      <div id="app">
        <router-view></router-view>
      </div>
    )
  }
}
