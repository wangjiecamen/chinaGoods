<!--  -->
<template>
  <div class='collect'>

    <div class="header">
      <h2 align="left">{{$t('collect.title')}}</h2>
      <div class="drop">
        {{$t('collect.market')}}：
        <el-select v-model="dropValue" :placeholder="$t('check')" @change="handleChange">
          <el-option value='' :label="$t('all')"></el-option>
          <el-option
            v-for="item in zoneOptions"
            :key="item.value"
            :label="$t(`collect.${item.lang}`)"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="content">
      <template v-if="tableData.length">
        <el-row
        :class="['li', i === tableData.length - 1 ? '' : 'border_none']"
        :gutter="10"
        v-for="(item, i) in tableData"
        :key="i"
        type="flex"
        align="middle"
        >
          <el-col :span="4">
            <el-image :src="item.shop.cover[0]" fit="cover"></el-image>
          </el-col>
          <el-col :span="16" class="info">
            <h4>{{item.shop.name}}  【{{item.shop.location}}】 </h4>
            <el-rate
              v-model="item.shop.score"
              disabled
              allow-half
              show-score
              text-color="#666"
              :colors="['#FF2C2C','#FF2C2C','#FF2C2C']"
              disabled-void-color="#D5D5D5"
              score-template="{value}">
            </el-rate>
            <span class="zone_type"> {{$t(`collect.${item.shop.zone}`)}} {{$t('collect.market')}} </span>
            <p class="describe">{{item.shop.describe}}</p>
            <div class="tel">
              <span>{{$t('collect.openTime')}}：{{item.shop.opening_time || '---'}}</span>
              <span>{{$t('collect.tel')}}：{{item.shop.telephone || '---'}}</span>
            </div>
          </el-col>
          <el-col :span="4" class="view">
            <el-popover
              placement="bottom"
              trigger="click">
              <el-image
                style="width: 120px; height: 120px"
                :src="item.shop.pr_code"
                fit="cover">
              </el-image>
              <p style="text-align: center">{{$t('collect.viewCode')}}</p>
              <el-button slot="reference" size="mini" type="danger" plain round>{{$t('collect.viewShop')}}</el-button>
            </el-popover>
          </el-col>
        </el-row>
      </template>
      <div v-else class="li_else">---{{$t('noData')}}---</div>

    </div>

    <pagnation
      :total="total"
      :layout="'sizes,jumper,prev,pager,next'"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script>
import zoneStatus from '@/enums/zoneStatus'
import Pagnation from '@/pages/member/order/components/pagnation'
import apiCollect from '@/model/collect'

export default {
  name: 'collect',

  components: {
    Pagnation
  },

  data() {
    return {
      zoneStatus,
      zoneOptions: zoneStatus.$getValues(),
      dropValue: '',
      rateNum: 1.2,
      total: 100,
      page: 1,
      pageSize: 10,
      tableData: []
    }
  },

  computed: {},

  watch: {},

  created() {
    this.getTableData()
  },

  mounted() {
  },

  methods: {
    async getTableData () {
      try {
        const option = {
          params: {
            page: this.page,
            page_size: this.pageSize,
            zone: this.dropValue
          }
        }
        const res = await apiCollect.getCollectList(option)
        this.total = res.total

        this.tableData = res.data.map(item => {
          if (item.shop && item.shop.score) {
            item.shop.score = Number((item.shop.score / 2).toFixed(1))
          }
          return item
        })
        console.log(res, 777);
      }
      catch (err) {
        console.log(err)
      }
    },
    handleChange (type) {
      this.page = 1
      this.getTableData()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.getTableData()
    },
    handleCurrentChange (page) {
      this.page = page
      this.getTableData()
    }
  }
}
</script>
<style lang='scss' scoped>
.collect {
  position: relative;
  .header {
    padding: 15px;
    line-height: 1.5;
    overflow: hidden;
    h2 {
      float: left;
      font-size: 18px;
      font-weight: bold;
    }
    .drop {
      float: right;
       /deep/ {
        .el-input__icon {
          line-height: 30px;
        }
        .el-select .el-input__inner {
          height: 30px;
          width: 100px;
        }
      }

    }
  }

  .content {
    .li_else {
      border: 1px solid #E5E5E5;
      text-align: center;
      padding: 20px 0;
    }
    .li {
      padding: 20px;
      height: 172px;
      border: 1px solid #E5E5E5;
      box-sizing: border-box;
      .el-image {
        width: 130px;
        height: 130px;
      }
      .info {
        h4 {
          margin-bottom: 15px;
          font-weight: bold;
          font-size: 16px;
        }
        .el-rate {
          display: inline-block;
          width: 118px;
          margin-right: 29px;
          background-color: #F7F7F7;
          vertical-align: middle;
           font-size: 12px;
          /deep/ .el-rate__icon {
            margin-right: 0;
          }
          /deep/.el-rate__text {
            font-size: 12px;
            margin-left: 5px;
          }
        }
        .zone_type {
          display: inline-block;
          padding: 4px 10px;
          background-color: #F7F7F7;
          vertical-align: middle;
          font-size: 12px;
        }
        .describe {
          margin: 35px 0 8px 0;
          font-size: 14px;
          line-height: 1.5;
          color: #999999;
        }
        .tel {
          font-size: 14px;
          color: #999999;
          span {
            margin-right: 20px;
          }
        }
      }
      .view {
        height: 130px;
        position: relative;
        .el-button {
          position: absolute;
          bottom: 0;
          right: 0;
        }
        // .el-popover {
        //   p {
        //     text-align: center;
        //   }
        // }
      }
    }
  }
  .border_none {
    border-bottom-color: transparent!important;
  }
}

</style>
