import Model from '@/model'
class AddressModel extends Model {
    //获取地区
  getArea(options = {}) {
    options.url = '/common/area'
    return this.get(options)
  }
  //地址列表
  getAddressList(options = {}) {
    options.url = 'address'
    return this.get(options)
  }
  //地址详情
  getAddressDetail(options = {}) {
    options.url = `address/${options.id}`
    return this.get(options)
  }
  //删除地址
  deleteAddress(options = {}) {
    options.url = `address/${options.id}`
    return this.delete(options)
  }
  //新增地址
  createAddress(options = {}) {
    options.url = 'address'
    return this.post(options)
  }
  //修改地址
  editAddress (options = {}) {
    options.url = `address/${options.id}`
    return this.put(options)
  }

}

export default new AddressModel()
