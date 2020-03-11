import Model from '@/model'

class Login extends Model {
  getCountry (options = {}) {
    options.url = '/foreign/area'
    return this.get(options)
  }

  submitform (options = {}) {
    options.url = '/foreign'
    return this.post(options)
  }
}

export default new Login()
