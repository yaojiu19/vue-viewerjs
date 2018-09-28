import VueViewer from './lib/components/Viewer'

const comment = {
  install: function (Vue) {
    Vue.component(VueViewer.name, VueViewer)
  }
}

if (typeof window !== 'undefined' && window.Vue) { 
  window.Vue.use(comment)
}

export default VueViewer
