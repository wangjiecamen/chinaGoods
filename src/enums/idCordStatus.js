import Enum from '@/utils/enum'
const setting = Object.freeze({
  ID_CARD: { value: "ID_CARD", label: "身份证号码", lang: 'logon.idCard'},
  PASSPORT:{ value: "PASSPORT", label: "护照号", lang: 'logon.passPort'}
})

export default Enum(setting)
