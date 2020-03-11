import Model from '@/model'

class Area extends Model {
  getCountry (options = {}) {
    options.url = '/auth/web/area'
    return this.get(options)
  }
}

export default new Area()
