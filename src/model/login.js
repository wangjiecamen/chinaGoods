import Model from '@/model'

class Login extends Model {
  login (options = {}) {
    options.url = 'auth/web/login'
    return this.post(options)
  }

  logout (options = {}) {
    options.url = 'auth/web/logOut'
    return this.post(options)
  }
}

export default new Login()
