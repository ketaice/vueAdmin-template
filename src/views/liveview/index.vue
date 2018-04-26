<template>
  <div class="liveview-container">
      <div class="liveview-text">Name: {{pageTitle}}</div>
      <div class="liveview-text">Channel: {{channel}}</div>
      <video-player class="vjs-default-skin vjs-big-play-centered" :options="playerOptions">
      </video-player>
  </div>
</template>

<script>
import '../../../static/script/video.js/dist/video-js.css'
import videoPlayer from '@/components/VideoPlayer'

export default {
  name: 'liveview',
  components: {
    videoPlayer
  },
  data() {
    return {
      pageTitle: 'Live View Page.',
      channel: 1,
      playerOptions: {
        height: '360',
        /* sources: [{
          type: 'rtmp/flv',
          src: 'rtmp://192.168.30.248:8935/0_32_0_0_C7E3DD621CE000014BA01D3372802DF0_admin_Hb888888_0'
        }],
        techOrder: ['flash', 'webfire', 'html5'], */
        /* sources: [{
          type: 'rtmp/flv',
          src: 'rtmp://192.168.30.248:8935/HBMultiStream?username=admin&password=Hb888888&streamtype=1'
        }],
        techOrder: ['flash', 'webfire', 'html5'], */
        sources: [{
          type: 'video/hbv',
          src: 'hbv://admin:Hb888888@192.168.30.248:8101'
        }],
        techOrder: ['webfire', 'flash', 'html5'],
        autoplay: false,
        controls: true
      }
    }
  },
  mounted() {
    this.$on('live-play', function(val) {
      this.channel = val
      this.playChannel(val)
    })
  },
  methods: {
    playChannel(data) {
      console.log(data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.liveview {
    &-container {
        margin: 30px
    }
    &-text {
        font-size: 60px;
    }
}
</style>
