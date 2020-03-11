<!--  -->
<template>
  <div>
    <template v-if="tableData.length">
      <el-row v-for="(ele, index) in tableData" :key="index" :span="24" class="tb_card">
        <el-col :span="24" class="tb_header">
          <h5>{{ele.shop_name}}</h5>
          <span class="grey_color ">{{$t('order.orderNum')}}：{{ele.order_num}}</span>
          <span class="grey_color ">{{$t('order.creatTime')}}：{{ele.created_at}}</span>
          <div class="pull_right">
            <span>{{$t(`order.${ele.status}`)}}</span>
          </div>
        </el-col>

        <el-col :span="24" class="tb_main">
          <el-row :span="24" type="flex" align="center" justify="start" class="clearfix tb_list">
            <el-col :span="15">
              <ul v-if="ele.products">
                <li
                  class="lis"
                  :class="ele.products.length - 1 === i ? '' : 'line-bottom'"
                  v-for="(item, i) in ele.products"
                  :key="i"
                >
                  <el-image :src="item.cover[0]" fit="cover"></el-image>
                  <p>{{item.name}}</p>
                  <span>{{`￥${item.price}`}}</span>
                  <span>{{`x${item.quantity}`}}</span>
                </li>
              </ul>
            </el-col>
            <el-col class="item line_right" :span="5">
              <div class="price_">
                <p>{{`￥${ele.total}`}}</p>
                <span class="grey_color">({{$t('order.includeFare')}} ￥{{ele.freight_amount}})</span>
              </div>
            </el-col>
            <el-col class="item" :span="4">
              <div>
                <el-button
                  v-show="orderStatus.$is(ele.status, 'send')"
                  size="mini"
                  type="danger"
                  @click="confirmGoods(ele.order_num)"
                  round
                  > {{$t('order.toRecept')}}
                </el-button>

                 <el-button
                  v-show="orderStatus.$is(ele.status, 'success') && !ele.is_evaluation"
                  size="mini"
                  type="danger"
                  plain
                  round
                  @click="makeComment(ele.order_num)"
                  > {{$t('order.toEvaluate')}}
                </el-button>

                <el-button
                  size="mini"
                  type="text"
                  @click="orderMessage(ele.order_num)"
                  >{{$t('order.orderDeatil')}}
                </el-button>
                <el-button
                  size="mini"
                  v-show="orderStatus.$is(ele.status, 'toPay')"
                  type="text"
                  @click="cacelOrder(ele.order_num)"
                  >{{$t('order.cacelOrder')}}
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </template>
    <el-row v-else class="tb_card_else">
      {{$t('noData')}}
    </el-row>
    <dialog-component
      :dialogTableVisible="dialogCommentVisible"
      @close="closeModel"
      @submitComment="submitComment"
    />

  </div>
</template>

<script>

import orderStatus from '@/enums/orderStatus'
import dialogComponent from '@/pages/member/orderDetail/component/comment'
import apiOrder from '@/model/order'

export default {
  name: '',

  props: {
    tableData: {
      required: true,
      type: Array,
      default: _ => ([])
    }
  },

  components: {
    dialogComponent
  },

  data() {
    return {
      orderStatus,
      dialogCommentVisible: false,
      data: {
        order_no: null,
        score: null,
        content: ''
      }
    }
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {

  },

  methods: {
    // 确认收货
    confirmGoods (id) {

      this.$confirm(`${this.$t('order.receptConfirm')}?`, '', {
        type: 'warning'
      }).then(async () => {
        const options = {
          params: { order_num: id }
        }
        await apiOrder.updateOrder(options)
        this.$message.success(this.$t('order.receptSuc'))
        this.$emit('reGetTable')
      }).catch(() => {
        this.$message.info(this.$t('order.cancalRecpt'))
      })

    },
    // 去评价
    makeComment (id) {
      this.dialogCommentVisible = true
      this.data.order_no = id
    },
    // 订单详情
    orderMessage (res) {
      this.$router.push({path: `/member/${res}/detail`})
    },
    // 取消订单
    cacelOrder (id) {
      this.$confirm(`${this.$t('order.calcelTit')}?`, '', {
        type: 'error'
      }).then(async () => {
        const options = {
          params: { order_num: id }
        }
        await apiOrder.deleteOrder( options )
        this.$message.success(this.$t('order.cancelSuc'))
        this.$emit('reGetTable')
      }).catch(() => {
        this.$message.info(this.$t('order.cancelOprate'))
      })
    },

    closeModel(res) {
      this.dialogCommentVisible = res
    },

    // 评价
    async submitComment (res, pre) {
      if (!res) return this.$message.warning(this.$t('order.rateTit'))
      this.data.score = res
      this.data.content = pre
      try {
        await apiOrder.evaluate({data: this.data})
        this.dialogCommentVisible = false
        this.$message.success(this.$t('order.evaluateSuc'))
        this.$emit('reGetTable')
      }
      catch (err) {
        console.log(err)
      }
    }

  }
}
</script>
<style lang='scss' scoped>
  @import '@/scss/variables';
  .tb_card_else {
    padding: 20px;
    margin-top: 20px;
    border: 1px solid $--color-line-grey;
    text-align: center;
    color: #666;
  }
  .tb_card {
    width: 100%;
    margin-top: 20px;
    color: #333;
    border: 1px solid $--color-line-grey;
    font-size: 14px;
    font-family:PingFang-SC-Medium,PingFang-SC;
    .tb_header {
      position: relative;
      width: 100%;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      background-color: rgba(250,250,250,1);
      border-bottom: 1px solid $--color-line-grey;
      h5 {
        display: inline-block;
        width: 160px;
        margin-right: 30px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      >span {
        margin-right: 20px;
      }
      .pull_right {
        position: absolute;
        top: 0;
        right: 20px;
        text-align: right;
        color: $--color-base-red;
        span {
          font-weight: 500;
        }
      }
    }

    .tb_main {
      .tb_list {
        height: 100%;
        .lis {
          padding: 20px;
          height: 112px;
          border-right: 1px solid $--color-line-grey;
          .el-image {
            width: 72px;
            height: 72px;
            margin-right: 15px;
            vertical-align: middle;
          }
          >span {
            display: inline-block;
            width: 80px;
            height: 72px;
            line-height: 72px;
            margin-right: 15px;
            font-weight: 500;
            font-size: 14px;
            vertical-align: middle;
          }
          >p {
            display: inline-block;
            width: 230px;
            height: 72px;
            margin-right: 20px;
            line-height: 1.3;
            vertical-align: middle;
          }
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          .price_ {
            p {
              margin-bottom: 4px;
              font-weight: 800;
            }
          }
          .el-button {
            display: block;
            width: 105px;
            margin-left: 0;
          }
          /deep/
          .el-button--text {
            color: $--color-base;
            padding: 4px 15px;
          }
        }
      }
    }

  }

  .dialog {
    padding: 20px 50px;
    .rateBox {
      width: 400px;
      margin: auto;
      .rateHeader {
        margin-bottom: 10px;
        strong {
          font-weight: bold;
        }
        .el-rate {
          display: inline-block;
          margin-left: 10px;
        }
      }

    }
  }


  .grey_color {
    color: $--color-font-grey;
    font-size: 12px;
  }
  .line_right {
    border-right: 1px solid $--color-line-grey;
  }
  .line-bottom {
    border-bottom: 1px solid $--color-line-grey;
  }

</style>
