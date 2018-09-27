import VueViewer from './lib/components/Viewer'

const comment = {
  install (Vue) {
    Vue.component(VueViewer.name, VueViewer)
  }
}
export default comment