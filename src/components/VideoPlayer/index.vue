<template>
  <div class="video-player" v-if="reseted">
    <video class="video-js" ref="video"></video>
  </div>
</template>

<script>
// lib
import _videojs from '../../../static/script/video.js'
const videojs = window.videojs || _videojs
let _player = null

// pollfill
if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value(target, varArgs) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      const to = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}

// as of videojs
const DEFAULT_EVENTS = [
  'play',
  'pause',
  'waiting',
  'playing',
  'ended',
  'error'
]

window.webfireOnload = () => {
  console.log('Webfire Plugin loaded!')
  // console.log(_player.id())
  window.videojs.Webfire.onReady(_player.id())
}

// 从flash插件内部调用
window.videojs_Flash_onDlClick = (iMouseX, iMouseY, iWinW, iWinH, mIndex, mPages) => {
  console.log('videojs_Flash_onDlClick index=' + mIndex + ', page=' + mPages)
}

window.onWebfireDbClick = (iMouseX, iMouseY, iWinW, iWinH, mIndex, mPages) => {
  console.log('onDbClick:' + 'x=' + iMouseX + ',y=' + iMouseY + ',w=' + iWinW + ',h=' + iWinH + ',idx=' + mIndex + ',page=' + mPages)
}

window.onWebfireClick = (iMouseX, iMouseY, iWinW, iWinH, mIndex, mPages) => {
  console.log('onClick!')
}

export default {
  name: 'video-player',
  props: {
    crossOrigin: {
      type: String,
      default: ''
    },
    customEventName: {
      type: String,
      default: 'statechanged'
    },
    options: {
      type: Object,
      required: true
    },
    events: {
      type: Array,
      default: () => []
    },
    globalOptions: {
      type: Object,
      default: () => ({
        // autoplay: false,
        controls: true,
        // preload: 'auto',
        // muted: false,
        controlBar: {
          remainingTimeDisplay: false,
          playToggle: {},
          progressControl: {},
          fullscreenToggle: {},
          volumeMenuButton: {
            inline: false,
            vertical: true
          }
        },
        flash: {
          swf: '../../../static/script/video.js/dist/HBVideoJS.swf'
        },
        techOrder: ['flash', 'webfire', 'html5']
      })
    },
    globalEvents: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      player: null,
      reseted: true
    }
  },
  mounted() {
    if (!this.player) {
      this.initialize()
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.dispose()
    }
  },
  methods: {
    initialize() {
      // videojs options
      const videoOptions = Object.assign({}, this.globalOptions, this.options)

      // cross origin
      if (this.crossOrigin !== '') {
        this.$refs.video.crossOrigin = this.crossOrigin
        this.$refs.video.setAttribute('crossOrigin', this.crossOrigin)
      }

      // emit event
      const emitPlayerState = (event, value) => {
        if (event) {
          this.$emit(event, this.player)
        }
        if (value) {
          this.$emit(this.customEventName, { [event]: value })
        }
      }

      // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
      if (videoOptions.plugins) {
        delete videoOptions.plugins.__ob__
      }

      // videoOptions
      // console.log('videoOptions', videoOptions)

      // player
      const self = this
      _player = this.player = videojs(this.$refs.video, videoOptions, function() {
        // events
        const events = DEFAULT_EVENTS.concat(self.events).concat(self.globalEvents)

        // watch events
        const onEdEvents = {}
        for (let i = 0; i < events.length; i++) {
          if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
            (event => {
              onEdEvents[event] = null
              this.on(event, () => {
                emitPlayerState(event, true)
              })
            })(events[i])
          }
        }

        // watch timeupdate
        this.on('timeupdate', function() {
          emitPlayerState('timeupdate', this.currentTime())
        })

        // player readied
        self.$emit('ready', this)

        // Plugin autoplay
        if (this.techName_ === 'Webfire') {
          var myplayer = this
          myplayer.stop()
          myplayer.autoplay(false)
          myplayer.channelMax(32)
          myplayer.quarkMode(4)
          console.log(videoOptions.sources[0].type + ', ' + videoOptions.sources[0].src)
          myplayer.src({ type: videoOptions.sources[0].type, src: videoOptions.sources[0].src })
          // myplayer.playOne({ index: 0, value: '32_0_0_0' })
          myplayer.load()
          myplayer.play()
        }
      })
    },
    dispose(callback) {
      if (this.player && this.player.dispose) {
        if (this.player.techName_ !== 'Flash') {
          this.player.pause && this.player.pause()
        }
        this.player.dispose()
        this.player = null
        this.$nextTick(() => {
          this.reseted = false
          this.$nextTick(() => {
            this.reseted = true
            this.$nextTick(() => {
              callback && callback()
            })
          })
        })
        /*
        if (!this.$el.children.length) {
          const video = document.createElement('video')
          video.className = 'video-js'
          this.$el.appendChild(video)
        }
        */
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler(options, oldOptions) {
        this.dispose(() => {
          if (options && options.sources && options.sources.length) {
            this.initialize()
          }
        })
      }
    }
  }
}
</script>
