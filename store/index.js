import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    images: []
  },
  mutations: {
    getImages (state,payload) {
        state.images = payload.images
    }
  }
})

export default store