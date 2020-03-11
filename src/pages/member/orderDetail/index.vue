<template>
    <div>
        <div class="order">
            <div class="el_breadcrumb">
                <span>{{$t('orderDeatil.addrNow')}}：</span>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="(item, i) in urlList" :key="i" :to="item.path && item.path">
                      {{$t(item.lang)}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-row class="el_top">
                <el-col :span="8" class="order_left">
                    <div class="order_title">{{$t('detail')}}</div>
                    <div class="order_info">
                        <div>{{$t('orderDeatil.orderNum')}}：{{order_no}}</div>
                        <div>{{$t('orderDeatil.shop')}}：{{shop}}</div>
                        <div>{{$t('orderDeatil.createdAt')}}：{{created_at}}</div>
                        <div v-if="pay_time">{{$t('orderDeatil.payTime')}}：{{pay_time}}</div>
                        <div v-if="pay_method">{{$t('orderDeatil.payType')}}：{{$t(`orderDeatil.${pay_method}`)}}</div>
                        <!-- 此处应该为手机号 -->
                        <div v-if="pay_phone">{{$t('orderDeatil.payID')}}：{{pay_phone}}</div>
                    </div>
                </el-col>
                <el-col :span="16" class="order_right">
                    <div class="order_status">{{$t('orderDeatil.statu')}}：{{$t(`order.${orderstatus}`)}}</div>
                    <div class="order_msg" v-if="logisticStatus.$is(logistics, 'sendGoods')">
                        <div>{{$t('orderDeatil.logisticType')}}：<span>{{logistics && $t(logisticStatus.$getLang(logistics))}}</span></div>
                        <div>{{$t('orderDeatil.addr')}}：<span>{{address}}</span></div>
                        <div>
                          <div v-if="phone">
                            {{$t('orderDeatil.phone')}}：<span>{{phone}}</span>
                          </div>
                          <div class="orderUser" v-if="orderUser">
                            {{$t('orderDeatil.receiveUser')}}：<span>{{orderUser}}</span>
                          </div>
                        </div>
                    </div>
                    <div class="order_msg" v-else>
                        <div>{{$t('orderDeatil.logisticType')}}：<span>{{logistics && $t(logisticStatus.$getLang(logistics))}}</span></div>
                        <div>{{$t('orderDeatil.wareAddr')}}：<span>{{address1}}</span></div>
                        <div>
                          <div v-if="phone1">
                            {{$t('orderDeatil.phone')}}：<span>{{phone1}}</span>
                          </div>
                          <div class="orderUser" v-if="orderUser1">
                            {{$t('orderDeatil.shipper')}}：<span>{{orderUser1}}</span>
                          </div>
                        </div>
                    </div>
                    <view-button
                      :isContainer="logisticsStatus"
                      :isReceive="isReceive"
                      :isComment="isComment"
                      @goView="showLogistics"
                      @toComment="showComment"
                      @receiveGood="toSend"
                    />
                </el-col>
            </el-row>
            <el-row class="el_mid">
                <order-table :tableData="tableData"></order-table>
            </el-row>
            <el-row class="el_bot">
                <div class="float">
                    <div>{{$t('orderDeatil.shopMoney')}}：<span>￥{{product_amount}}</span></div>
                    <div>
                      {{$t('orderDeatil.fare')}}({{$t('orderDeatil.weight')}}{{weight}}g)：
                      <span>￥{{freight_amount}}</span>
                    </div>
                    <div>{{$t('orderDeatil.taxrate')}}：<span>￥{{taxrate}}</span></div>
                    <div>{{$t('orderDeatil.discount')}}：<span>￥{{shop_discount}}</span></div>
                    <div>{{$t('orderDeatil.total')}}：<span class="total">￥{{total}}</span></div>
                    <div class="cancel_order" v-show="isCancel" @click="open">
                      {{$t('order.cacelOrder')}}
                    </div>
                </div>
            </el-row>
        </div>
        <logistics-dialog :dialogTableVisible="dialogLogisticsVisible" :activities="trace" @close="closeLogistics"></logistics-dialog>
        <comment-dialog
          v-if="order_no"
          :isEvaluate="isComment"
          :orderNum="order_no"
          :dialogTableVisible="dialogCommentVisible"
          @close="closeModel"
          @submitComment="submitComment"
        />
    </div>
</template>

<script>
import orderTable from "@/pages/member/orderDetail/component/table"
import logisticsDialog from "@/pages/member/orderDetail/component/logistics"
import logisticStatus from "@/enums/logisticStatus"
import commentDialog from "@/pages/member/orderDetail/component/comment"
import viewButton from "@/pages/member/orderDetail/component/button"
import OrdersModel from "@/model/order"
import changeStatus from "@/pages/member/orderDetail/component/status"

const statusArr = ['send', 'success']
export default {
    components: {
        orderTable,
        logisticsDialog,
        commentDialog,
        viewButton
    },
    props: {

    },
    data() {
        return{
            dialogLogisticsVisible: false,
            dialogCommentVisible: false,
            isAddress: true,//默认为快递地址
            isSuccess: false,//默认不是已完成订单
            orderstatus: '',//订单状态
            logistics: '',//物流方式
            logisticsStatus: false,//物流状态,默认非快递
            order_no: '',//订单号
            created_at: '',//下单时间
            pay_time: '',//付款时间
            shop: '',//店铺
            pay_phone: '',//买家手机
            pay_method: '',//付款方式
            product_amount: '',//产品金额
            shop_discount: '',//商家优惠
            freight: 0,//快递重量 g
            freight_amount: '',//运费
            weight: '',//快递总重量
            taxrate: '',//关税
            total: '',//合计
            address: '',//快递地址
            address1: '',//仓库地址
            phone: '',
            phone1: '',//仓库电话
            orderUser: '',
            orderUser1: '',//仓库姓名
            tableData: [],
            trace: [],//物流
            isReceive: false,
            isContainer: false,
            isComment: false,
            isCancel: false,
            orderId: null,
            content: {},//评论的内容
            urlList: [
              {
                pathTitle: '个人中心',
                path: '/member/order/index',
                lang: 'selfCenter'
              },
              {
                pathTitle: '我的订单',
                path: '/member/order/index',
                lang: 'myOrder'
              },
              {
                pathTitle: '订单详情',
                lang: 'detail'
              }
            ],//路由栈
          logisticStatus
        }

    },
    computed: {

    },
    watch: {

    },
    created() {
        this.orderId = this.$route.params.id
        this.goDetail(this.orderId)
    },
    destroyed() {

    },
    methods: {
        showLogistics() {
            this.dialogLogisticsVisible = true
            this.trace = []
            this.getLogistics()
        },
        // 显示评价模态框
        showComment() {
            this.dialogCommentVisible = true
        },
        closeLogistics(res) {
            this.dialogLogisticsVisible = res
        },
        closeModel(res) {
            this.dialogCommentVisible = res
        },
        submitComment(res,pre) {
            this.content.score = res
            this.content.content = pre
            this.content.order_no = this.orderId
            this.sendComment()
        },
        toSend() {
            this.confirmGoods()
        },
        open() {
            this.$confirm(this.$t('order.calcelTit'), {
              type: 'error'
            }).then(() => {
                this.cancelOrder()
            }).catch(() => {

            })
        },
        //获取物流信息
        async getLogistics() {
          const options = {
            params:{
              order_num: this.orderId
            }
          }
          try {
            const traceList = await OrdersModel.getLogistics(options)
            traceList.list.map( item => {
              const obj = {}
              obj.time = item.time
              obj.content = item.description
              this.trace.push(obj)
            })
          } catch(err) {
            console.log(err)
          }
        },
        //发送评价
        async sendComment() {
            const options = {
                    data:this.content
                }
            try {
                const traceList = await OrdersModel.evaluate(options)
                this.$message.success(this.$t('order.evaluateSuc'))
                this.dialogCommentVisible = false
                this.goDetail(this.orderId)
            } catch(err) {
                console.log(err)
            }
        },
        //确认收货
        async confirmGoods() {
            const options = {
                    params: {
                        order_num: this.orderId
                    }
                }
            try {
                const traceList = await OrdersModel.updateOrder(options)
                this.$message.success(this.$t('order.receptSuc'))
                this.goDetail(this.orderId)
            } catch(err) {
                console.log(err)
            }
        },
        //取消订单
        async cancelOrder() {
            const options = {
                params:{
                    order_num: this.orderId
                }
            }
            try {
                const traceList = await OrdersModel.deleteOrder(options)
                this.$message.success(this.$t('order.cancelSuc'))
                this.goDetail(this.orderId)
            } catch(err) {
                console.log(err)
            }
        },
        //获取订单详情
        async goDetail(id) {
            const options = {
                 params:{
                     order_num: id
                 }
            }
            try {
                const OrdersInfo = await OrdersModel.goDetail(options)
                this.tableData = OrdersInfo.shops && OrdersInfo.shops[0].product
                // this.logistics = changeStatus.Logistics(OrdersInfo.delivery)
                this.logistics = OrdersInfo.delivery
                // this.orderstatus = changeStatus.OrderStatus(OrdersInfo.status)
                this.orderstatus = OrdersInfo.status
                // this.pay_method = changeStatus.PayMethod(OrdersInfo.pay_method)
                this.pay_method = OrdersInfo.pay_method
                this.order_no = OrdersInfo.order_num
                this.created_at = OrdersInfo.created_at
                this.pay_time = OrdersInfo.paytime_finish
                this.taxrate = OrdersInfo.tariff
                this.product_amount = OrdersInfo.product_amount
                this.shop_discount = OrdersInfo.shop_discount
                this.freight_amount = OrdersInfo.freight
                this.total = OrdersInfo.total
                this.freight = OrdersInfo.freight
                this.weight = OrdersInfo.weight
                this.pay_phone = OrdersInfo.address && OrdersInfo.address.user_number//买家电话
                this.orderUser = OrdersInfo.address && OrdersInfo.address.receiver_name
                this.phone = OrdersInfo.address && OrdersInfo.address.phone_no//收货电话
                this.shop = OrdersInfo.shops && OrdersInfo.shops[0].shop.name
                //快递地址拼接
                const country = OrdersInfo.address && OrdersInfo.address.country_name
                const province = OrdersInfo.address && OrdersInfo.address.province_name
                const city = OrdersInfo.address && OrdersInfo.address.city_name
                const district = OrdersInfo.address && OrdersInfo.address.district_name
                const sendAddress = OrdersInfo.address && OrdersInfo.address.address
                const addressArr = [country, province, city, district, sendAddress]
                let str = ''
                addressArr.map( item => {
                    if(item) {
                        str += item
                    }
                })
                this.address = str
                if (OrdersInfo.status === "toPay" && OrdersInfo.pay_way === "pos") {//未支付订单且为pos模式可退
                    this.isCancel = true
                } else if(OrdersInfo.status === "send") {//已发货状态有确认发货
                    this.isReceive = true
                    this.logisticsStatus = OrdersInfo.delivery === 2 ? true : false
                } else if(OrdersInfo.status === "success") {
                    this.isReceive = false//将完成之前的状态置空
                    this.isComment = OrdersInfo.is_evaluation === 0 ? true : false
                    this.logisticsStatus = OrdersInfo.delivery === 2 ? true : false
                } else {
                    //刷新页面，将状态设置为初始值
                    this.isCancel = false
                    this.isComment = false
                    this.isReceive = false
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
}
</script>

<style lang='scss' scoped>
.order{
    min-width: 1100px;
    .el_breadcrumb{
      span,
      .el-breadcrumb {
        display: inline-block;
        vertical-align: middle;
      }
      padding-bottom: 20px;
      color: #606266;
      font-size: 14px;
    }
    .order_left{
       font-family: "PingFang-SC";
       height: 210px;
       border: 1px solid #E5E5E5;
       border-right: none;
       .order_title{
           width: 100%;
           height: 30px;
           padding: 0px 20px;
           line-height: 30px;
           font-size: 13px;
           font-weight: 500;
           background: rgb(229, 229, 229);
       }
       .order_info{
           width: 100%;
           padding: 20px 35px;
           overflow: hidden;
           div{
               height: 25px;
               font-size: 11px;
               line-height: 25px;
               white-space: nowrap;
           }
       }
    }
    .order_right{
        height: 210px;
        border: 1px solid #E5E5E5;
        padding: 30px 60px;
        .order_status{
            font-size: 18px;
            line-height: 40px;
            height: 40px;
            font-weight: 530;
        }
        div{
            color: #000000;
            div{
                height: 25px;
               font-size: 11px;
               line-height: 25px;
               white-space: nowrap;
               span{
                   color: #333;
               }
               div{
                   display: inline;
               }
               .orderUser{
                   margin-left: 50px;
               }
            }
        }
        .my_idear {
          margin-top: 10px;
        }
    }
    .el_mid{
        margin-top: 15px;
    }
    .el_bot{
        margin-top: 15px;
        background: #F7F7F7;
        .float{
            float: right;
            font-size: 13px;
            padding: 30px 100px;
            text-align: right;
            div{
                height: 25px;
               font-size: 12px;
               line-height: 25px;
               color: #000000;
               span{
                   margin-left: 10px;
               }
               .total{
                   font-weight: 700;
                   color: #EE201D;
               }
            }
            .cancel_order{
                border: 1px solid #E5E5E5;
                text-align: center;
                width: 70px;
                float: right;
                margin-top: 20px;
            }
        }
    }
}
</style>
