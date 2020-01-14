<template>
  <div class="">
    <vue-viewer
      ref="myViewer"
      className="my_class"
      v-model="viewerVal"
      :visible.sync="isShow"
      :images="photo"
    >
    </vue-viewer>
    <div class="btn_group">
      <input type="text" v-model.number="viewerVal">
      <button @click="addPhoto">添加一张图片</button>
      <button @click="editPhoto">修改第一张图片</button>
      <button @click="view(1)">查看第2张</button>
      <button @click="prev">上一张</button>
      <button @click="next">下一张</button>
      <button @click="move(0, 1)">向下移动1px</button>
      <button @click="moveTo(0, 0)">移动到0, 0</button>
      <button @click="zoom(0.1)">放大10%</button>
      <button @click="zoomTo(2)">缩放到200%</button>
      <button @click="rotate(30)">顺时针旋转30度</button>
      <button @click="rotateTo(180)">旋转到180度</button>
      <button @click="scale(2, 2)">拉伸2倍</button>
      <button @click="scaleX(2)">水平拉伸2倍</button>
      <button @click="scaleY(2)">垂直拉伸2倍</button>
      <button @click="play">播放</button>
      <button @click="stop">暂停</button>
      <button @click="full">进入模态模式</button>
      <button @click="exit">退出模态模式</button>
      <button @click="tooltip">显示当前比例</button>
      <button @click="toggle">在自然大小和初始大小之间切换</button>
      <button @click="isShow = !isShow">显示切换{{isShow}}</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import VueViewer from './components/Viewer'
export default {
  components: {
    VueViewer
  },
  data () {
    return {
      photo: [{url: 'https://dummyimage.com/100', title: '哈哈哈'}, 'https://dummyimage.com/100', 'https://dummyimage.com/100'],
      viewerVal: 0,
      isShow: false
    }
  },
  methods: {
    addPhoto () {
      this.photo.push({
        url: 'https://dummyimage.com/100',
        title: '添加的图片'
      })
    },
    editPhoto () {
      this.photo[0].url = 'https://dummyimage.com/200'
    },
    view (index) {
      this.$refs.myViewer.view(1)
    },
    prev () {
      this.$refs.myViewer.prev()
    },
    next () {
      this.$refs.myViewer.next(true)
    },
    move (x, y) {
      this.$refs.myViewer.move(x, y)
    },
    moveTo (x, y) {
      this.$refs.myViewer.moveTo(x, y)
    },
    zoom (ratio) {
      this.$refs.myViewer.zoom(ratio, true)
    },
    zoomTo (ratio) {
      this.$refs.myViewer.zoomTo(ratio, true)
    },
    rotate (degree) {
      this.$refs.myViewer.rotate(degree)
    },
    rotateTo (degree) {
      this.$refs.myViewer.rotateTo(degree)
    },
    scale (x, y) {
      this.$refs.myViewer.scale(x, y)
    },
    scaleX (x) {
      this.$refs.myViewer.scaleX(x)
    },
    scaleY (y) {
      this.$refs.myViewer.scaleY(y)
    },
    play () {
      this.$refs.myViewer.play(true)
    },
    stop () {
      this.$refs.myViewer.stop()
    },
    full () {
      this.$refs.myViewer.full()
    },
    exit () {
      this.$refs.myViewer.exit()
    },
    tooltip () {
      this.$refs.myViewer.tooltip()
    },
    toggle () {
      this.$refs.myViewer.toggle()
    }
  }
}
</script>

<style lang="scss">
.btn_group{
  position: fixed;
  width: 100px;
  z-index: 9999;
  bottom: 60px;
  right: 20px;
}
</style>
