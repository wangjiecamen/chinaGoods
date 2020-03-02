import Model from '@/model'
class Collect extends Model {
  getCollectList (options = {}) {
    options.url = '/auth/collection'
    return this.get(options)
  }

}

export default new Collect()
