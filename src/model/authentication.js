import Model from '@/model'

class Authentication extends Model {
  userboothinfo(options = {}) {
    options.url = '/authentication/userboothinfo'
    return this.get(options)
  }
  addbooth(options = {}) {
    options.url = '/authentication/addbooth'
    return this.post(options)
  }
}

export default new Authentication()
