import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
import app from '@/store/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    app
  }
})
