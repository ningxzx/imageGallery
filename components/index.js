import Perspective from './Perspective.vue'

function components(Vue) {
    Vue.component('Perspective', Perspective)
}
export default () => {
  Vue.use(components)
}
