import Model from '@/model'
class OrdersModel extends Model {
    //获取全部订单（新）
  getOrdersData(options = {}) {
    options.url = '/orders/web/list'
    return this.get(options)
  }
  //订单详情
  goDetail(options = {}) {
    options.url = '/orders/detail'
    return this.get(options)
  }
  //物流
  getLogistics(options = {}) {
    options.url = '/orders/web/logistics'
    return this.get(options)
  }
  // 评价
  evaluate (options = {}) {
    options.url = '/evaluation'
    return this.post(options)
  }

   // 获取评价
   getEvaluate (options = {}) {
    options.url = '/evaluation'
    return this.get(options)
  }

  // 取消订单
  deleteOrder (options = {}) {
    options.url = '/orders/cancel'
    return this.put(options)
  }
  // 确认订单
  updateOrder (options = {}) {
    options.url = '/orders/confirm'
    return this.post(options)
  }

}

export default new OrdersModel()
