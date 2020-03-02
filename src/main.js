import 'babel-polyfill'
import Vue from 'vue'
import App from '@/layout/App'
import router from '@/router'
import store from '@/store'
import i18n from '@/lang'
import '@/filters'

import '@/icons'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)


// http://static.chinagoods.com/
// 这是css js woff png icon啥的静态cdn加速地址  prod环境
window.rootVueInstance = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
