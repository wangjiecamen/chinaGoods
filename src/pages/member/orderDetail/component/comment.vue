<template>
    <el-dialog :title="$t(`rate.${title}`)" :visible="dialogTableVisible" @close="close" width="30%">
        <div class='container'>
            <div>{{$t('rate.allRate')}}</div>
            <ul class="StarsWrap">
                <li v-for="(i,index) in list" :key="index" @click="clickStars(index)">
                    <img :src="xing>index?stara:starb"/>
                </li>
            </ul>
        </div>

        <template v-if="isEvaluate">
          <div>
            <el-input
              type="textarea"
              :placeholder="$t('rate.textTit')"
              v-model="textarea"
              maxlength="120"
              :autosize="{ minRows: 6, maxRows: 6}"
              show-word-limit>
            </el-input>
          </div>

          <div slot="footer" class="dialog-footer">
              <el-button @click="close">{{$t('rate.cancel')}}</el-button>
              <el-button type="danger" @click="submitComment">{{$t('rate.publish')}}</el-button>
          </div>
        </template>


        <div class="detail_info" v-else>
          <template v-if="evaluate && evaluate.user.length">
            <div class="info_content" v-for="(item, i) in evaluate.user" :key="i">
              <p>{{item.content}}</p>
              <div class="info_shops" v-if="evaluate.shop && evaluate.shop.length">
                {{$t('rate.shopReply')}}：
                <p>{{evaluate.shop[i].content}}</p>
              </div>
            </div>
          </template>
          <p v-else>{{$t('rate.noRate')}}</p>
        </div>
    </el-dialog>
</template>

<script>
import apiOrder from '@/model/order'

export default {
    components: {

    },
    props: {
      dialogTableVisible: {
          type: Boolean,
          default: false
      },
      orderNum: {
        default: ''
      },
      // 未评价为true
      isEvaluate: {
        type: Boolean,
        default: true
      }
    },
    data() {
        return{
            title: 'title',
            textarea: '',
            starNum: '',
            xing: 0,
            stara:require("@/assets/star_liang.png"),//亮星星
            list:[0,1,2,3,4],
            starb:require("@/assets/star_an.png"),//暗星星
            evaluate: null
        }
    },
    computed: {
      orderId () {
        return this.orderNum ? this.orderNum : ''
      }
    },

    mounted() {
      this.title = this.isEvaluate ? 'title' : 'myTitle'
      !this.isEvaluate && this.getEvaluate()
    },

    destroyed() {},

    watch: {

    },

    updated () {
      if (this.dialogTableVisible && this.evaluate) {
        this.xing = this.evaluate.user.length ? this.evaluate.user[0].score / 2 : 0
      }
    },

    methods: {
        async getEvaluate () {
          try {
            const options = {
              params: {
                order_no: this.orderNum
              }
            }
            const data = await apiOrder.getEvaluate(options)
            this.evaluate = data
            this.xing = data.user.length ? data.user[0].score / 2 : 0
            console.log(data, '评价内容');
          }
          catch (err) {
            this.$message.error(err.message)
          }
        },
        //将评论内容置空
        close() {
            this.$emit("close", false)
            this.textarea = ''
            this.xing = 0
            this.starNum = ''
        },
        submitComment() {
            this.$emit("submitComment", this.starNum, this.textarea )
            this.textarea = ''
            this.xing = 0
        },
        clickStars(i){
            this.xing = i + 1
            this.starNum = this.xing*2
        }
    },
}
</script>

<style lang='scss' scoped>
.container{
    width: 100%;
    div{
        font-size: 15px;
        line-height: 30px;
        height: 30px;
        float: left;
        font-weight: 700;
    }
    .StarsWrap{
        height: 30px;
        margin: 10px 0 10px 80px;
        padding: 4px 0;
        li{
            float: left;
            width: 23px;
            margin-right: 10px;
            img{
                width: 100%;
                height: auto;
            }
        }
    }
}

.detail_info {
  min-height: 200px;
  margin-bottom: 20px;
    >p {
      min-height: 20px;
    }

  .info_shops {
    padding: 15px;
    margin-top: 15px;
    min-height: 180px;
    background-color: #F7F7F7;
    p {
      margin-top: 10px;
    }
  }
}
/deep/{
    .el-dialog__header{
        text-align: center;
    }
    .el-dialog__body{
        padding: 10px 20px;
    }
}
</style>
