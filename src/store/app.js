import { getLanguage } from '@/lang/index'
import Cookies from 'js-cookie'

const state = {
  language: getLanguage(),
}

const getters = {
  language: state => state.language
}

const mutations = {
  SET_LANGUAGE (state, lang) {
    state.language = lang
  },
}

const actions = {
  setLanguage ({ commit }, lang) {
    Cookies.set('language', lang)
    commit('SET_LANGUAGE', lang)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
