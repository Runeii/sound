webpackJsonp([1],{118:function(t,e,r){"use strict";t.exports=function(){return new Worker(r.p+"b3ff83271d61385337da.worker.js")}},178:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.deviceId=function(){return device.uuid}},200:function(t,e,r){"use strict"},201:function(t,e){},203:function(t,e,r){"use strict";var n,a=r(204),i=(n=a)&&n.__esModule?n:{default:n};i.default.install({onUpdateReady:function(){console.log("update ready"),i.default.applyUpdate()},onUpdated:function(){console.log("updated"),location.reload()}})},82:function(t,e,r){"use strict";r(83);var n=r(85);r(201),r(202);var a=!!window.cordova;r(203),n.app.$mount("#app"),document.addEventListener("deviceready",function(){console.log("Device is ready!"),console.log(a)},!1),a&&(console.log("This is cordova"),document.addEventListener("deviceready",n.app.$mount("#app"),!1))},83:function(t,e,r){"use strict";var n,a=r(57),i=(n=a)&&n.__esModule?n:{default:n};window.Promise=window.Promise||i.default},85:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.store=e.router=e.app=void 0;var n=d(r(31)),a=r(86),i=d(r(87)),o=d(r(89)),s=d(r(97)),u=d(r(179)),l=d(r(198)),c=d(r(199));function d(t){return t&&t.__esModule?t:{default:t}}var f=r(200);(0,a.sync)(s.default,o.default),n.default.mixin({methods:{convertTimeHHMMSS:function(t){var e=new Date(1e3*t).toISOString().substr(11,8);return 0===e.indexOf("00:")?e.substr(3):e},formatMilliseconds:function(t){var e=t/6e4,r=Math.floor(e),n=Math.floor(60*(e-r));return(r>9?r:"0"+r)+":"+(n>9?n:"0"+n)}}}),n.default.use(l.default,u.default),n.default.use(c.default),n.default.use(f);var p=new n.default(Object.assign({router:o.default,store:s.default},i.default));e.app=p,e.router=o.default,e.store=s.default},87:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,a=r(39),i=(n=a)&&n.__esModule?n:{default:n},o=r(22);r(88),e.default={data:function(){return{drawer:!1}},created:function(){this.$store.dispatch("setupCloudRefs")},computed:Object.assign({},(0,o.mapGetters)(["currentTrack"]),{sidebar:function(){var t=this,e=this.$createElement;return e("v-navigation-drawer",(0,i.default)([{attrs:{id:"sidebar",fixed:!0,clipped:!0,app:!0,value:t.drawer},on:{input:function(e){t.drawer=e}}},{directives:[{name:"model",value:t.drawer}]}]),[e("v-list",{attrs:{"two-line":!0,subheader:!0}},[e("v-subheader",null,["Music"]),e("v-list-tile",(0,i.default)([{attrs:{avatar:!0}},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.$router.push({name:"Now Playing"})}).apply(void 0,[e].concat(n))}}}]),[e("v-list-tile-action",null,[e("v-icon",null,["play_arrow"])]),this.currentTrack._id?e("v-list-tile-content",null,[e("v-list-tile-title",null,["Now Playing"]),e("v-list-tile-sub-title",null,[this.currentTrack.title," - ",this.currentTrack.artist])]):e("v-list-tile-content",{style:"opacity:0.5"},[e("v-list-tile-title",null,["Now Playing"]),e("v-list-tile-sub-title",null,["Nothing playing"])])]),e("v-list-tile",(0,i.default)([{attrs:{avatar:!0}},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.$router.push({name:"Library"})}).apply(void 0,[e].concat(n))}}}]),[e("v-list-tile-action",null,[e("v-icon",null,["library_music"])]),e("v-list-tile-content",null,[e("v-list-tile-title",null,["Library"]),e("v-list-tile-sub-title",null,["View music library"])])])]),e("v-list",{attrs:{subheader:!0}},[e("v-subheader",null,["Settings"]),e("v-list-tile",(0,i.default)([{attrs:{avatar:!0}},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.$router.push({name:"Sync"})}).apply(void 0,[e].concat(n))}}}]),[e("v-list-tile-action",null,[e("v-icon",null,["import_export"])]),e("v-list-tile-content",null,[e("v-list-tile-title",null,["Cloud sync"]),e("v-list-tile-sub-title",null,["Cloud library settings"])])]),e("v-list-tile",(0,i.default)([{attrs:{avatar:!0}},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.$router.push({name:"Import"})}).apply(void 0,[e].concat(n))}}}]),[e("v-list-tile-action",null,[e("v-icon",null,["library_add"])]),e("v-list-tile-content",null,[e("v-list-tile-title",null,["Import iTunes"]),e("v-list-tile-sub-title",null,["Import local iTunes library"])])])])])}}),render:function(t){return t("v-app",{attrs:{id:"app"}},[this.sidebar,this.header(),t("v-content",null,[t("v-container",{attrs:{fluid:!0,"fill-height":!0}},[t("router-view",null,[])])])])},methods:{_openDrawer:function(){this.drawer=!this.drawer},header:function(){var t=this,e=this.$createElement;return e("v-toolbar",{attrs:{id:"header",color:"blue darken-3",dark:!0,app:!0,"clipped-left":!0,fixed:!0}},[e("v-toolbar-title",{style:this.$vuetify.breakpoint.smAndUp?"width: 300px; min-width: 250px":"min-width: 72px",class:"ml-0 pl-3"},[e("v-toolbar-side-icon",{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t._openDrawer()}).apply(void 0,[e].concat(n))}}},[]),e("span",{class:"hidden-xs-only"},[this.$route.name?this.$route.name:this.$route.path])])])}}}},88:function(t,e){},89:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=u(r(31)),a=u(r(90)),i=u(r(91)),o=u(r(95)),s=u(r(96));function u(t){return t&&t.__esModule?t:{default:t}}n.default.use(a.default),e.default=new a.default({mode:"hash",routes:[{path:"/",component:i.default,name:"Now Playing"},{path:"/library",component:o.default,name:"Library"},{path:"/import",component:s.default,name:"Import"},{path:"/sync",component:s.default,name:"Sync"}]})},91:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(r(39)),a=o(r(60)),i=r(22);function o(t){return t&&t.__esModule?t:{default:t}}function s(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,r){return function n(a,i){try{var o=e[a](i),s=o.value}catch(t){return void r(t)}if(!o.done)return Promise.resolve(s).then(function(t){n("next",t)},function(t){n("throw",t)});t(s)}("next")})}}r(94),e.default={data:function(){return{timings:{progressStyle:"",currentTime:"0:00",totalDuration:{raw:0,pretty:"0:00"}}}},computed:Object.assign({},(0,i.mapState)(["theTrack"]),(0,i.mapGetters)(["deviceId"]),{audioObject:{get:function(){return this.theTrack},set:function(t){this.$store.commit("THE_TRACK_SETTER",t)}},source:function(){var t=s(a.default.mark(function t(){return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.deviceId||!this.track.src[this.deviceID]){t.next=4;break}return t.abrupt("return",this.track.src[this.deviceId]);case 4:if(!this.track.src.cloud){t.next=8;break}return t.next=7,this.getTrackCloudSrc(this.track.uuid);case 7:return t.abrupt("return",t.sent);case 8:return t.abrupt("return",!1);case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),track:function(){return this.$store.getters.currentTrack}}),created:function(){this.audioObject.src&&(this._handleLoaded(),this._handlePlayingUI()),this.audioObject.addEventListener("timeupdate",this._handlePlayingUI),this.audioObject.addEventListener("loadeddata",this._handleLoaded)},methods:Object.assign({},(0,i.mapActions)(["getTrackCloudSrc"]),{_handlePlayingUI:function(){var t=parseInt(this.audioObject.currentTime),e=(t/this.timings.totalDuration.raw*100).toFixed(1);this.timings.progressStyle="right:"+(100-e)+"%;",this.timings.currentTime=this.convertTimeHHMMSS(t)},_handleLoaded:function(){var t=parseInt(this.audioObject.duration);this.timings.totalDuration={raw:t,pretty:this.convertTimeHHMMSS(t)}},_jumpToTime:function(t){var e=t.layerX/t.target.clientWidth*100,r=this.audioObject.duration/100*e;this.audioObject.currentTime=r},_onPlay:function(){navigator&&"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:this.track.name,artist:this.track.artist.name,album:this.track.album.name}),navigator.mediaSession.setActionHandler("play",this.play),navigator.mediaSession.setActionHandler("pause",this.pause),navigator.mediaSession.setActionHandler("seekbackward",function(){}),navigator.mediaSession.setActionHandler("seekforward",function(){}),navigator.mediaSession.setActionHandler("previoustrack",function(){}),navigator.mediaSession.setActionHandler("nexttrack",function(){}))},play:function(){var t=s(a.default.mark(function t(){return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.source||this.audioObject.src===this.source){t.next=4;break}return t.next=3,this.source;case 3:this.audioObject.src=t.sent;case 4:this.audioObject.play(),this._onPlay();case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),pause:function(){this.audioObject.pause()},stop:function(){this.audioObject.pause(),this.audioObject.currentTime=0},testUpdate:function(){this.$store.dispatch("updateTrack",[1,{artwork:"https://i.scdn.co/image/31ff32e07215e719fe738d209d586ffe629b8425"}])}}),render:function(t){var e=this;return t("div",{class:"player__holder"},[t("img",{class:"player__artwork",attrs:{src:this.track.artwork}},[]),t("div",{class:"player__controls"},[t("button",(0,n.default)([{class:"player__controls-button player__controls-play"},{on:{click:function(t){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];e.play.apply(e,[t].concat(n))}}}]),["Play"]),t("button",(0,n.default)([{class:"player__controls-button player__controls-pause"},{on:{click:function(t){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];e.pause.apply(e,[t].concat(n))}}}]),["Pause"]),t("button",(0,n.default)([{class:"player__controls-button player__controls-stop"},{on:{click:function(t){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];e.stop.apply(e,[t].concat(n))}}}]),["Stop"]),t("button",{on:{click:function(t){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];e.testUpdate.apply(e,[t].concat(n))}}},["Update artwork"])]),t("div",{class:"player__details"},[t("span",{class:"player__details-title"},[this.track.name]),t("span",{class:"player__details-artist"},[this.track.artist.name]),!!this.track.album&&t("span",{class:"player__details-album"},[this.track.album.name])]),t("div",{class:"player__progress"},[t("div",(0,n.default)([{class:"player__progress-bar"},{on:{click:function(t){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];e._jumpToTime.apply(e,[t].concat(n))}}}]),[t("div",{class:"player__progress-bar-fill",style:this.timings.progressStyle},[])]),t("span",{class:"player__progress-now"},[this.timings.currentTime]),t("span",{class:"player__progress-total"},[this.timings.totalDuration.pretty])])])}}},94:function(t,e){t.exports={holder:"holder",artwork:"artwork",details:"details",progress:"progress","progress-bar":"progress-bar","progress-bar-fill":"progress-bar-fill","progress-total":"progress-total"}},95:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,a=r(39),i=(n=a)&&n.__esModule?n:{default:n},o=r(22);e.default={data:function(){return{}},computed:Object.assign({},(0,o.mapGetters)(["library"]),{headers:function(){return[{text:"Title",value:"title",align:"left"},{text:"Length",value:"length"},{text:"Artist",value:"artist",align:"left"},{text:"Album",value:"album",align:"left"}]}}),methods:{displayTrackOptionsMenu:function(t){!0===confirm("Add track to queue?")&&this.queueTrack(t)},playTrack:function(t){this.$store.dispatch("playTrack",t),this.$router.push("/?play=true")},queueTrack:function(t){this.$store.dispatch("queueTrack",t)},trackRow:function(t){var e=this,r=this.$createElement;return r("tr",{on:{click:function(r){for(var n=arguments.length,a=Array(n>1?n-1:0),i=1;i<n;i++)a[i-1]=arguments[i];(function(){return e.playTrack(t.uuid)}).apply(void 0,[r].concat(a))}}},[r("td",null,[t.name]),r("td",null,[this.formatMilliseconds(t.length)]),r("td",null,[t.artist.name]),r("td",null,[t.album.name]),r("td",null,[r("v-icon",{on:{click:function(r){for(var n=arguments.length,a=Array(n>1?n-1:0),i=1;i<n;i++)a[i-1]=arguments[i];(function(){return e.displayTrackOptionsMenu(t.uuid)}).apply(void 0,[r].concat(a))}}},["more_horiz"])])])}},render:function(t){var e=this;return t("v-data-table",(0,i.default)([{attrs:{"hide-actions":!0,headers:this.headers,items:this.library},class:"elevation-1"},{scopedSlots:{items:function(t){return e.trackRow(t.item)}}}]),[])}}},96:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={render:function(){return(0,arguments[0])("p",null,["Dummy"])}}},97:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(r(31)),a=s(r(22)),i=s(r(98)),o=r(178);function s(t){return t&&t.__esModule?t:{default:t}}n.default.use(a.default);var u={deviceId:o.deviceId,theTrack:new Audio,currentTrackId:2,queuedTracks:[]},l=new a.default.Store({state:u,getters:{library:function(t){return t.library.tracks||!1},getTrackFromLibrary:function(t,e){return function(t){return e.library.find(function(e){return e.uuid===t})||!1}},currentTrack:function(t,e){var r=e.getTrackFromLibrary(t.currentTrackId);return r||{album:{},artist:{}}},deviceId:function(t){return t.deviceId()}},mutations:{THE_TRACK_SETTER:function(t,e){t.theTrack=e},PLAY_TRACK:function(t,e){t.currentTrackId=e},QUEUE_TRACK:function(t,e){t.queuedTracks.push(e)}},actions:{playTrack:function(t,e){(0,t.commit)("PLAY_TRACK",e)},queueTrack:function(t,e){var r=t.commit;t.getters,r("QUEUE_TRACK",e)}},modules:{library:i.default}});e.default=l},98:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=l(r(60)),a=l(r(31)),i=l(r(22)),o=r(99),s=l(r(100)),u=l(r(118));function l(t){return t&&t.__esModule?t:{default:t}}r(119);r(122),r(161);var c=s.default.initializeApp({apiKey:"AIzaSyB6ozpHjiBNQx1OahIpcnFYGPIEHw_VxMc",authDomain:"soundplayer-55578.firebaseapp.com",databaseURL:"https://soundplayer-55578.firebaseio.com",projectId:"soundplayer-55578",storageBucket:"gs://soundplayer-55578.appspot.com",messagingSenderId:"506304420571"}),d=c.firestore(),f=c.storage(),p={tracks:d.collection("tracks"),albums:d.collection("albums"),artists:d.collection("artists")};a.default.use(i.default);var h=Object.assign({},o.firebaseMutations,{TOGGLE_CLOUD_LIBRARY:function(t,e){t.cloud=e},STORE_UPLOAD_WORKER:function(t,e){t.uploadWorker=e}}),v={setupCloudRefs:(0,o.firebaseAction)(function(t){var e=t.bindFirebaseRef;e("tracks",p.tracks),e("albums",p.albums),e("artists",p.artists)}),importItunesLibraryFile:function(t,e){t.commit;var r=new u.default;r.postMessage(e),r.addEventListener("message",function(t){var e=t.data,r=e.type,n=e.data;"update"===r?console.log("UPDATE",n):"error"===r?console.log("ERROR",n):"end"===r&&console.log("END",n)})},toggleCloudLibrary:function(t,e){(0,t.commit)("TOGGLE_CLOUD_LIBRARY",e)},uploadLibraryFiles:function(t){var e=t.dispatch,r=t.commit,n=t.getters,a=new u.default;return r("STORE_UPLOAD_WORKER",a),a.postMessage(n.uploadQueue),a.addEventListener("message",function(t){var r=t.data,n=r.type,a=r.data;"success"===n?e("updateTrack",a):"message"===n?console.log(a):"error"===n?console.log("ERROR",a):"end"===n&&console.log("END")}),!0},updateTrack:function(t,e){t.commit;p.tracks.doc(escape(e.name)).update({"src.cloud":!0})},getTrackCloudSrc:function(){var t,e=(t=n.default.mark(function t(e,r){e.commit;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.ref(r).getDownloadURL();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,r){return function n(a,i){try{var o=e[a](i),s=o.value}catch(t){return void r(t)}if(!o.done)return Promise.resolve(s).then(function(t){n("next",t)},function(t){n("throw",t)});t(s)}("next")})});return function(t,r){return e.apply(this,arguments)}}()};e.default={state:{tracks:[],artists:[],albums:[],cloud:!1,uploadWorker:!1},getters:{tracks:function(t){return t.tracks},artists:function(t){return t.artists},albums:function(t){return t.albums},recordExists:function(t){return function(e,r){var n=t[e].filter(function(t){return t.name===r});return n.length>0&&n}},uploadQueue:function(t){return t.tracks.filter(function(t){return!0!==t.src.cloud})},uploadWorker:function(t){return t.uploadWorker}},mutations:h,actions:v}}},[82]);
//# sourceMappingURL=client.f23cfd9c.js.map