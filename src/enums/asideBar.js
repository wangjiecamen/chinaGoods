import Enum from '@/utils/enum'

const setting = Object.freeze({
  order: {
    name: '我的订单',
    url: '/member/order/index',
    lang: 'myOrder'
  },
  collect: {
    name: '收藏店铺',
    url: '/member/order/collect',
    lang: 'collectShop'
  },
  address: {
    name: '收货地址',
    url: '/member/order/address',
    lang: 'reciveAddress'
  }
})

export default Enum(setting)
