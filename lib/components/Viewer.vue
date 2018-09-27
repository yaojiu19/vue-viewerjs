<template>
  <div class="vue_viewer" ref="viewer">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <div class="vue_viewer_item" v-for="(item, index) in list" :key="index">
        <img v-if="(item instanceof Object)" :src="item.url" :alt="item.title">
        <img v-else :src="item">
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

const TOOLBAR_OPTIONS = {    // {key: Boolean | Number | String | Function}，{key: {show: Boolean | Number, size: String, click: Function }}， sizes: "small", "medium" (default) and "large"
  zoomIn: 1,
  zoomOut: 1,
  oneToOne: 1,
  reset: 1,
  prev: 1,
  play: 1,
  next: 1,
  rotateLeft: 1,
  rotateRight: 1,
  flipHorizontal: 1,
  flipVertical: 1
}

export default {
  name: 'VueViewer',
  props: {
    images: {                // 是否启用内联模式
      type: [String, Object, Array]
    },
    inline: {                // 是否启用内联模式
      type: Boolean,
      default: false
    },
    button: {                // 显示右上角的按钮
      type: Boolean,
      default: true
    },
    navbar: {                // 导航栏的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示
      type: [Boolean, Number],
      default: 1
    },
    title: {                 // 标题的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示, Function: 自定义标题内容，[Number, Function]： Function(image, imageData)
      type: [Boolean, Number, Function, Array],
      default: 1
    },
    toolbarType: {               // 工具栏的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示
      type: [Boolean, Number],
      default: 1
    },
    toolbarOptions: {        // 工具栏按钮的可见性和布局
      type: Object
    },
    tooltipShow: {               // 放大或缩小时图像比率（百分比）提示
      type: Boolean,
      default: true
    },
    movable: {               // 是否可以移动移动图像
      type: Boolean,
      default: true
    },
    zoomable: {              // 是否可以放大缩小图像
      type: Boolean,
      default: true
    },
    rotatable: {             // 是否可以旋转图像
      type: Boolean,
      default: true
    },
    scalable: {              // 是否可以翻转图像
      type: Boolean,
      default: true
    },
    transition: {            // 是否启用transition
      type: Boolean,
      default: true
    },
    fullscreen: {            // 是否可以查看原始图片大小
      type: Boolean,
      default: true
    },
    keyboard: {              // 是否启用键盘
      type: Boolean,
      default: true
    },
    backdrop:{               // 是否启用遮罩，static不可点击遮罩关闭
      type: [Boolean, String],
      default: true
    },
    loading: {               // 加载图像时是否显示加载动画
      type: Boolean,
      default: true
    },
    loop: {                  // 是否启用循环
      type: Boolean,
      default: true
    },
    interval: {              // 自动循环播放时间间隔
      type: Number,
      default: 5000
    },
    minWidth: {              // 最小宽度
      type: Number,
      default: 200
    },
    minHeight: {             // 最小高度
      type: Number,
      default: 200
    },
    zoomRatio: {             // 鼠标缩放图像时的比率
      type: Number,
      default: 0.1
    },
    minZoomRatio: {          // 最小缩放图像比率
      type: Number,
      default: 0.01
    },
    maxZoomRatio: {          // 最大缩放图像比率
      type: Number,
      default: 100
    },
    zIndex: {                // z-index值
      type: Number,
      default: 100
    },
    zIndexInline: {          // 内联模式z-index值
      type: Number,
      default: 100
    },
    url: {                   // 原始图像URL设置位置
      type: [String, Function],
      default: 'src'
    },
    container: {             // 插入位置
      type: [Element, String],
      Default: 'body'
    },
    filter: {                // 顾虑器
      type: Function
    },
    toggleOnDblclick: {      // 双击功能
      type: Boolean,
      default: true
    },
    value: {
      type: Number
    }
  },
  data () {
    return {
      list: [],
      index: 0,
      toolbar: ''
    }
  },
  watch: {
    images () {
      this.$nextTick(() => {
        this.update()
      })
    },
    index () {
      this.$emit('input', this.index)
    },
    value () {
      if (!this.value && this.value !== 0) return
      this.view(this.value)
    }
  },
  created () {
    this._optionsInit()
    this.$nextTick(() => {
      this._viewerInit()
    })
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    _optionsInit () {
      if (this.images instanceof Array) {
        this.list = this.images
      } else {
        this.list = [this.images]
      }
      this.index = this.value
      if (this.toolbarOptions) {
        this.toolbar = Object.assign(TOOLBAR_OPTIONS, this.toolbarOptions);
      } else {
        this.toolbar = this.toolbarType
      }
    },
    _viewerInit () {
      this.viewer = new Viewer(this.$refs.viewer, {
        initialViewIndex: this.index,
        inline: this.inline,
        button: this.button,
        navbar: this.navbar,
        title: this.title,
        toolbar: this.toolbar,
        tooltip: this.tooltipShow,
        movable: this.movable,
        zoomable: this.zoomable,
        rotatable: this.rotatable,
        scalable: this.scalable,
        transition: this.transition,
        fullscreen: this.fullscreen,
        keyboard: this.keyboard,
        backdrop: this.backdrop,
        loading: this.loading,
        loop: this.loop,
        interval: this.interval,
        minWidth: this.minWidth,
        minHeight: this.minHeight,
        zoomRatio: this.zoomRatio,
        minZoomRatio: this.minZoomRatio,
        maxZoomRatio: this.maxZoomRatio,
        zIndex: this.zIndex,
        zIndexInline: this.zIndexInline,
        url: this.url,
        container: this.container,
        filter: this.filter,
        toggleOnDblclick: this.toggleOnDblclick,
        ready: (event) => {                 // 初始化ready事件
          this.$emit('ready', event)
        },
        show: (event) => {                  // 显示事件-开始
          this.$emit('show', event)
        },
        shown: (event) => {                 // 显示事件-结束
          this.$emit('shown', event)
        },
        hide: (event) => {                  // 隐藏事件-开始
          this.$emit('hide', event)
        },
        hidden: (event) => {                // 隐藏事件-结束
          this.$emit('hidden', event)
        },
        view: (event) => {                  // 切换事件-开始
          this.$emit('view', event)
        },
        viewed: (event) => {                // 切换事件-结束
          this.index = event.detail.index
          this.$emit('viewed', event)
        },
        zoom: (event) => {                  // 缩放事件-开始
          this.$emit('zoom', event)
        },
        zoomed: (event) => {                // 缩放事件-结束
          this.$emit('zoomed', event)
        }
      })
    },
    // 显示 immediate = 是否立即显示
    show (immediate) {
      this.viewer.show(immediate)
    },
    // 隐藏 immediate = 是否立即隐藏
    hide (immediate) {
      this.viewer.hide(immediate)
    },
    // 切换到图像到索引的图像位置，如果未显示灯箱，将首先显示灯箱。index = 索引
    view (index) {
      this.viewer.view(index)
    },
    // 上一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环
    prev (loop) {
      this.viewer.prev(loop)
    },
    // 下一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环
    next (loop) {
      this.viewer.next(loop)
    },
    // 移动 offsetX = '在水平方向上移动尺寸（px）', offsetX = '在垂直方向移动尺寸（px）， 不填默认与offsetX相同'
    move (offsetX, offsetY) {
      this.viewer.move(offsetX, offsetY)
    },
    // 移动到 x = '在水平方向移动到（px）', y = '在垂直方向移动到（px）， 不填默认与x相同'
    moveTo (x, y) {
      this.viewer.moveTo(x, x)
    },
    // 缩放 ratio = '缩放比例，正数放大，负数缩小'， hasTooltip = '是否显示提示'
    zoom (ratio, hasTooltip) {
      this.viewer.zoom(ratio, hasTooltip)
    },
    // 缩放到 ratio = '缩放到大小'， hasTooltip = '是否显示提示'
    zoomTo (ratio, hasTooltip) {
      this.viewer.zoomTo(ratio, hasTooltip)
    },
    // 旋转 ratio = '旋转角度，正数顺时针，负数逆时针'
    rotate (degree) {
      this.viewer.rotate(degree)
    },
    // 旋转到 ratio = '旋转到角度'
    rotateTo (degree) {
      this.viewer.rotateTo(degree)
    },
    // 拉伸 scaleX = '在水平方向上拉伸比例', scaleY = '在垂直方向拉伸比例， 不填默认与scaleX相同'
    scale (scaleX, scaleY) {
      this.viewer.scale(scaleX, scaleY)
    },
    // 水平方向上拉伸 scaleX = '在水平方向上拉伸比例'
    scaleX (scaleX) {
      this.viewer.scaleX(scaleX)
    },
    // 垂直方向上拉伸 scaleY = '在垂直方向上拉伸比例'
    scaleY (scaleY) {
      this.viewer.scaleY(scaleY)
    },
    // 播放 fullscreen = '是否全屏'
    play (fullscreen) {
      this.viewer.play(fullscreen)
    },
    // 停止播放
    stop () {
      this.viewer.stop()
    },
    // 进入模态模式
    full () {
      this.viewer.full()
    },
    // 退出模态模式
    exit () {
      this.viewer.exit()
    },
    // 显示当前比例
    tooltip () {
      this.viewer.tooltip()
    },
    // 切换到在自然大小
    toggle () {
      this.viewer.toggle()
    },
    // 初始化
    reset () {
      this.viewer.reset()
    },
    // 更新
    update () {
      this.viewer.update()
    },
    // 销毁
    destroy () {
      this.viewer.destroy()
    }
  }
}
</script>

<style lang="scss">
.vue_viewer_item{
  display: inline-block;
  margin: 5px;
  img{
    width: 100px;
    height: 100px;
  }
}
</style>
