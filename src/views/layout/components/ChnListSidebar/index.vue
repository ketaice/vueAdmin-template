<template>
  <div>
      <el-tree :data="channelList" :props="defaultProps" default-expand-all @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import { getDigitalChnList } from '@/api/ContentMgmt'
import { getAllChnList } from '@/api/System'
var xmlParse = require('fast-xml-parser')

export default {
  props: {
    navActiveIndex: {
      type: String,
      default: '1'
    }
  },

  data() {
    return {
      navIndex: this.navActiveIndex,
      channelList: [],
      channelCount: 0,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
      this.$emit('clickChannel', data.id)
    },
    loadChannelList() {
      var self = this
      console.log('navActiveIndex: ' + self.navIndex)
      Promise.all([getAllChnList(), getDigitalChnList()])
        .then(([allList, digitalList]) => {
          // console.log(allList)
          // console.log(digitalList)
          if (xmlParse.validate(allList) !== true ||
              xmlParse.validate(digitalList) !== true) {
            return
          }
          var jsonAllList = xmlParse.parse(allList)
          self.channelCount = jsonAllList.VideoInput.VideoInputNum
          var jsonChnList = jsonAllList.VideoInput.VideoInputChannelList.VideoInputChannel
          var tmpChannelList = [
            {
              id: 1,
              label: 'NVR',
              children: []
            }
          ]
          jsonChnList.forEach(element => {
            // console.log(element)
            var name = element.name
            var id = element.id
            if (element.channelType === 'local') {
              if (name === '') {
                name = 'CH '
                name += (parseInt(id) < 10) ? ('0' + id) : id
              }
            } else if (element.channelType === 'ipc') {
              if (name === '') {
                name = 'IP '
                name += (parseInt(id) < 10) ? ('0' + id) : id
              }
              if (element.channelStatus !== 'added') {
                return false
              }
            }
            var channelItem = { id: id, label: name }
            tmpChannelList[0].children.push(channelItem)
          })
          // Live view.
          if (self.navIndex === '1') {
            tmpChannelList[0].children.push({
              id: (self.channelCount + 1),
              label: '复合通道'
            })
          }
          self.channelList = tmpChannelList
        })
        .catch(e => console.log(e))
    }
  },

  created: function() {
    // console.log('List Created')
    this.loadChannelList()
  }
}
</script>

