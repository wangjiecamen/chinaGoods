import Enum from '@/utils/enum'

const setting = Object.freeze({
  all: {
    name: '所有订单',
    value: '',
    lang: 'allOrder'
  },
  toBePaid: {
    name: '待付款',
    value: 'toPay',
    lang: 'toPay'
  },
  delivered: {
    name: '已发货',
    value: 'send',
    lang: 'send'
  },
  toBeReceiced: {
    name: '待收货',
    value: 'toCheck',
    lang: 'toCheck'
  },
  toBeComment: {
    name: '已完成',
    value: 'success',
    lang: 'success'
  }
})

export default Enum(setting)
