import Enum from '@/utils/enum'

const setting = Object.freeze({
  toPay: { value: 'toPay', name: '待支付，请到小程序付款', label: '待支付', lang: 'toPay' },
  send: { value: 'send', name: '已发货', label: '已发货', lang: 'send' },
  success: { value: 'success', name: '已完成', label: '已完成',lang: 'success' },
  toCheck: { value: 'toCheck', name: '待确认', label: '待确认',lang: 'toCheck' },
  cancel: { value: 'cancel', name: '已取消订单', label: '取消',lang: 'cancel' },
  toSend: { value: 'toSend', name: '待发货', label: '待发货', lang: 'toSend' },
  refundCheck: { value: 'refundCheck', name: '退款待确认', label: '退款待确认' , lang: 'refundCheck'},
  refundCancel: { value: 'refundCancel', name: '取消退款', label: '取消退款', lang: 'refundCancel' },
  refundConfirm: { value: 'refundConfirm', name: '商家已同意待退款', label: '商家已同意待退款', lang: 'refundConfirm' },
  // refundRefuse: { value: 'refundRefuse', name: '商家拒绝退款', label: '商家拒绝退款', lang: 'refundRefuse' },
  refundSuccess: { value: 'refundSuccess', name: '退款成功', label: '退款成功', lang: 'refundSuccess' }
})

export default Enum(setting)
// "toPay": "待支付",
// "toCheck": "待确认",
// "cancel": "取消",
// "toSend": "待发货",
// "send": "已发货",
// "success": "已完成",
// "refundCheck": "退款待确认",
// "refundCancel": "取消退款",
// "refundConfirm": "商家已同意待退款",
// "refundRefuse": "商家拒绝退款",
// "refundSuccess": "退款成功"
