import Enum from '@/utils/enum'

const setting = Object.freeze({
  FH: { value: 'FH', name: '孵化区', lang: 'FH' },
  HY: { value: 'HY', name: '篁园' , lang: 'HY'},
  BW: { value: 'BW', name: '宾王' , lang: 'BW'}
})

export default Enum(setting)
