import Model from '@/model'

class Register extends Model {
  getverifyCode(options = {}) {
    options.url = '/auth/web/verify_code'
    return this.post(options)
  }

  getRegister(options = {}) {
    options.url = '/auth/web/register'
    return this.post(options)
  }

  getMap(options = {}) {
    options.baseURL = 'http://pdh5.onccc.com/#/'
    return this.get(options)
  }

  getScreet(options = {}) {
    options.url = '/auth/dictionary'
    return this.get(options)
  }


}

export default new Register()
