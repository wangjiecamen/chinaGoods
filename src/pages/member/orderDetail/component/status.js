function OrderStatus(res) {
    switch (res) {
        case "toPay":
            return "待支付，请到小程序付款。"
        case "send":
            return "已发货"
        case "success":
            return "已完成"
        case "toCheck":
            return "待确认"
        case "toSend":
            return "待发货"
        case "cancel":
            return "已取消"
        case "refundCheck":
            return "退款待确认"
        case "refundCancel":
            return "取消退款"
        case "refundConfirm":
            return "同意退款"
        case "refundRefuse":
            return "商家拒绝退款"
        case "refundSuccess":
            return "退款成功"
    
        default:
            return "暂无状态"
    }
}
function Logistics(res) {
    switch (res) {
        case 1:
            return "现场自提"
        case 2:
            return "快递直接发货"
        case 3:
            return "仓库自提"
    
        default:
            break;
    }
}
function PayMethod(res) {
    switch (res) {
        case "wxpay":
            return "微信支付"
        case "cash":
            return "现金支付"
        case "alipay":
            return "支付宝支付"
        case "cardpay":
            return "刷卡支付"
        default:
            break;
    }
}
export default{
    OrderStatus,
    Logistics,
    PayMethod
}