import apiLogin from '@/model/login'
import Cookies from 'js-cookie'
import router from '@/router'

const getUserInfo = _ => {
  let info = Cookies.get('userinfo') ? JSON.parse(Cookies.get('userinfo')) : {}
  return info
}

const state = {
  activeIndex: 0,
  userinfo: getUserInfo()
}

const goUnauthorizedUrl = _=> {
  const UnauthorizedUrl = Cookies.get('UnauthorizedUrl') || '/member/order'
  Cookies.remove('UnauthorizedUrl')
  router.push(UnauthorizedUrl)
}

const getters = {
  username: state => state.userinfo.phone,
  get_userinfo: state => state.userinfo,
  activeIndex: state => state.activeIndex,
  token: state => state.userinfo.token || ''
}
const mutations = {
  SET_ACTIVE_INDEX (state, index) {
    state.activeIndex = index
  },
  SET_USER_INFO (state, info) {
    state.userinfo = info
  }
}
const actions = {
  login({ commit }, value) {

    const options = { data: value }

    return new Promise((resolve, reject) => {
      apiLogin.login(options).then(data => {
        localStorage.setItem('name', data.phone)
        commit('SET_USER_INFO', data)
        // 设置用户信息有效时间
        value.is_seven
        ? Cookies.set('userinfo', data, { expires: 7 })
        : Cookies.set('userinfo', data)
        goUnauthorizedUrl()
        resolve(data)
      }).catch(err => {
        return reject(err)
      })

    })
  },
  async logout () {
    try {
      await apiLogin.logout()
      localStorage.removeItem('name')
      Cookies.remove('userinfo')
      router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  },

  setActiveIndex ({ commit }, value) {
    commit('SET_ACTIVE_INDEX', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
