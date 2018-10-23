# 基于viewer.js的vue灯箱

## viewer.js文档

[https://github.com/fengyuanchen/viewerjs](https://github.com/fengyuanchen/viewerjs)

## 开始

### NPM

```js
npm i vue-viewerjs --save
```

### 直接引入

```js
<script src="vue-viewer.js"></script>
```

### 使用

```JS
<vue-viewer v-model=""></vue-viewer>

<script>
    import VueViewer from 'vue-viewerjs'
    export default {
      components: {
        VueViewer
      }
    }
</script>
```

## 文档

### Attributes

| 参数             | 必填 | 说明                                                         | 类型                             | 可选值                                                       | 默认值 |
| :--------------- | :--- | ------------------------------------------------------------ | -------------------------------- | ------------------------------------------------------------ | ------ |
| images           | ✘    | 图片数据，Object{url: '图片地址', title:' 标题 '}            | String, Object, Array            | -                                                            | -      |
| visible          | ✘    | 是否显示，支持 .sync 修饰符                                  | boolean                          |                                                              | false  |
| inline           | ✘    | 是否启用内联模式                                             | Boolean                          | -                                                            | false  |
| button           | ✘    | 显示右上角的按钮                                             | Boolean                          | -                                                            | true   |
| navbar           | ✘    | 导航栏的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示 | Boolean, Number                  | 见说明                                                       | 1      |
| title            | ✘    | 标题的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示, Function: 自定义标题内容，[Number, Function]： Function(image, imageData) | Boolean, Number, Function, Array | 见说明                                                       | 1      |
| toolbarType      | ✘    | 工具栏的可见性 0/false：隐藏，1/true：显示，2：屏幕宽度大于768像素时显示，3：屏幕宽度大于992像素时显示，4：屏幕宽度大于1200像素时显示 | Boolean, Number                  | 见说明                                                       | 1      |
| toolbarOptions   | ✘    | 此参数会忽略‘toolbarType’。工具栏按钮的可见性和布局。        | Object                           | {key: Boolean \| Number} ， {key: String} ， {key: Function} ， {key: { show: Boolean \| Number, size: String, click: Function}。  keys: "zoomIn", "zoomOut", "oneToOne", "reset", "prev", "play", "next", "rotateLeft", "rotateRight", "flipHorizontal" and "flipVertical" 。 sizes: "small", "medium" (default) and "large"。 | -      |
| tooltipShow      | ✘    | 图像比率（百分比）提示                                       | Boolean                          | -                                                            | true   |
| movable          | ✘    | 是否可以移动图像                                             | Boolean                          | -                                                            | true   |
| zoomable         | ✘    | 是否可以放大缩小图像                                         | Boolean                          | -                                                            | true   |
| rotatable        | ✘    | 是否可以旋转图像                                             | Boolean                          | -                                                            | true   |
| scalable         | ✘    | 是否可以翻转图像                                             | Boolean                          | -                                                            | true   |
| transition       | ✘    | 是否启用transitiondong动画                                   | Boolean                          | -                                                            | true   |
| fullscreen       | ✘    | 是否可以查看原始图片大小                                     | Boolean                          | -                                                            | true   |
| keyboard         | ✘    | 是否启用键盘                                                 | Boolean                          | -                                                            | true   |
| backdrop         | ✘    | 是否启用遮罩                                                 | Boolean, String                  | 'static'不可点击遮罩关闭                                     | true   |
| loading          | ✘    | 加载图像时是否显示加载动画                                   | Boolean                          | -                                                            | true   |
| loop             | ✘    | 是否启用循环                                                 | Boolean                          | -                                                            | true   |
| interval         | ✘    | 播放时间间隔                                                 | Number                           | -                                                            | 5000   |
| minWidth         | ✘    | 最小宽度                                                     | Number                           | -                                                            | 200    |
| minHeight        | ✘    | 最小高度                                                     | Number                           | -                                                            | 200    |
| zoomRatio        | ✘    | 鼠标缩放图像时的比率                                         | Number                           | -                                                            | 0.1    |
| minZoomRatio     | ✘    | 最小缩放图像比率                                             | Number                           | -                                                            | 0.01   |
| maxZoomRatio     | ✘    | 最大缩放图像比率                                             | Number                           | -                                                            | 100    |
| zIndex           | ✘    | z-index值                                                    | Number                           | -                                                            | 100    |
| zIndexInline     | ✘    | 内联模式z-index值                                            | Number                           | -                                                            | 100    |
| url              | ✘    | 占位图片                                                     | String, Function                 | -                                                            | -      |
| container        | ✘    | 插入位置                                                     | Element, String                  | -                                                            | body   |
| filter           | ✘    | 顾虑器                                                       | Function                         | -                                                            | -      |
| toggleOnDblclick | ✘    | 双击功能                                                     | Boolean                          | -                                                            | true   |



### Slot

| name | 说明                   |
| ---- | ---------------------- |
| -    | 自定义，会使images失效 |

### Events

| 事件名称 | 说明                                        | 回调参数 |
| -------- | ------------------------------------------- | -------- |
| ready    | 初始化ready事件                             | event    |
| show     | 显示事件-开始                               | event    |
| shown    | 显示事件-结束，多次显示只触发最后一次的事件 | event    |
| hide     | 隐藏事件-开始                               | event    |
| hidden   | 隐藏事件-结束，多次隐藏只触发最后一次的事件 | event    |
| view     | 切换事件-开始                               | event    |
| viewed   | 切换事件-结束，多次切换只触发最后一次的事件 | event    |
| zoom     | 缩放事件-开始                               | event    |
| zoomed   | 缩放事件-结束，多次缩放只触发最后一次的事件 | event    |

### Methods

| 方法名   | 说明                                                         | 参数              |
| -------- | ------------------------------------------------------------ | ----------------- |
| view     | 切换到图像到索引的图像位置，如果未显示灯箱，将首先显示灯箱。index = 索引 | index             |
| prev     | 上一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环     | loop              |
| next     | 下一张，如果未显示灯箱，将首先显示灯箱。 loop = 是否循环     | loop              |
| move     | 移动 offsetX = '在水平方向上移动尺寸（px）', offsetX = '在垂直方向移动尺寸（px）， 不填默认与offsetX相同' | offsetX, offsetY  |
| moveTo   | 移动到 x = '在水平方向移动到（px）', y = '在垂直方向移动到（px）， 不填默认与x相同' | x, y              |
| zoom     | 缩放 ratio = '缩放比例，正数放大，负数缩小'， hasTooltip = '是否显示提示' | ratio, hasTooltip |
| zoomTo   | 缩放到 ratio = '缩放到大小'， hasTooltip = '是否显示提示'    | ratio, hasTooltip |
| rotate   | 旋转 ratio = '旋转角度，正数顺时针，负数逆时针'              | degree            |
| rotateTo | 旋转到 ratio = '旋转到角度'                                  | degree            |
| scale    | 拉伸 scaleX = '在水平方向上拉伸比例', scaleY = '在垂直方向拉伸比例， 不填默认与scaleX相同' | scaleX, scaleY    |
| scaleX   | 水平方向上拉伸 scaleX = '在水平方向上拉伸比例'               | scaleX            |
| scaleY   | 垂直方向上拉伸 scaleY = '在垂直方向上拉伸比例'               | scaleY            |
| play     | 播放 fullscreen = '是否全屏'                                 | fullscreen        |
| stop     | 停止播放                                                     | -                 |
| full     | 进入模态模式                                                 | -                 |
| exit     | 退出模态模式                                                 | -                 |
| tooltip  | 显示当前比例                                                 | -                 |
| toggle   | 切换到在自然大小                                             | -                 |
| reset    | 初始化                                                       | -                 |