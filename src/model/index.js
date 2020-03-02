import axios from 'axios'
import store from '@/store'
import Cookie from 'js-cookie'
import router from '@/router'
import i18n from '@/lang'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'

const APP_API = process.env.VUE_APP_API

class Model {
  constructor(options = {}) {
    this.baseURL = APP_API + '/v1'
    this.axiosInstance = axios.create({
      baseURL: options.baseURL ? options.baseURL : this.baseURL,
      // timeout: 5000,
      withCredentials: true
    })
  }

  api(options = {}) {
    return new Promise((resolve, reject) => {
      NProgress.start()

      this.axiosInstance.interceptors.request.use(config => {
        let token = store && store.getters['user/token']
        let isBear = (config.url.indexOf('logOut') || config.url.indexOf('logout')) === -1
          && !!localStorage.getItem('name')
          && token

        if (isBear) {
          config.headers.Authorization = 'Bearer ' + token
        }
        return config
      }, err => {
        return reject(err)
      })

      this.axiosInstance.request(options).then(response => {
        NProgress.done()
        resolve(response.data)
        return response
      }).catch(error => {
        NProgress.done()

        const message = error.response && error.response.data && error.response.data.errors
        const status = error.response && error.response.status

        switch (status) {
          case 401:
            localStorage.removeItem('name')
            Cookie.remove('userinfo')
            Message({
              message: i18n.$t('token'),
              type: 'error',
              duration: 3 * 1000
            })
            router.push('/')
            break;
          case 422:
            Message({
              message: message,
              type: 'error',
              duration: 3 * 1000
            })
            break;
          case 400:
            Message({
              message: message || "验证码错误",
              type: 'error',
              duration: 3 * 1000
            })
            break;
          default:
            Message({
              message: message || i18n.$t('error'),
              type: 'error',
              duration: 3 * 1000
            })
            break;
        }

        return reject(error)
      })
    })
  }

  get(options = {}) {
    options.method = 'get'
    return this.api(options)
  }

  post(options = {}) {
    options.method = 'post'
    return this.api(options)
  }

  put(options = {}) {
    options.method = 'put'
    return this.api(options)
  }

  delete(options = {}) {
    options.method = 'delete'
    return this.api(options)
  }
}

export default Model
