import Enum from '@/utils/enum'

const setting = Object.freeze({
  warehouse: { value: 3, name: '仓库自提', lang: 'orderDeatil.warehouse' },
  sendGoods: { value: 2, name: '快递直接发货' , lang: 'orderDeatil.sendGoods'},
  selfTake: { value: 1, name: '现场自提' , lang: 'orderDeatil.selfTake'}
})

export default Enum(setting)
