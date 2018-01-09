export default {
  data () {
    return {
      itunesFile: ''
    }
  },
  render (h) {
    return (
      <div class='settings'>
        <div class='settings__uploader'>
          <button>Upload iTunes</button>
          <div class='settings__uploader-log'></div>
        </div>
      </div>
    )
  }
}