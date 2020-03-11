<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
      v-for="orderTab in TabsList"
      :key="orderTab.value"
      :label="$t('nav.' + orderTab.lang)"
      :name="orderTab.value"
     >
      <div class="tab-header">
          <el-input class="searchInput" :placeholder="$t('order.searchTit')" v-model="query.search">
            <template slot="append">
              <span  @click="searchKeys">{{$t('order.search')}}</span>
            </template>
          </el-input>

          <div v-show="isAll" class="drop" align="right">
            {{$t('order.orderStatus')}}：
            <el-select v-model="dropValue" :placeholder="$t('check')" @change="handleChange">
              <el-option value='' :label="$t('all')"></el-option>
              <el-option
                v-for="item in ListStatus"
                :key="item.value"
                :label="$t(`order.${item.lang}`)"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

      </div>

     <table-components
        class="table"
        :tableData="tableData"
        @reGetTable="reGetTable"
     />

      <pagnation
      :total="total"
      :layout="'sizes,jumper,prev,pager,next'"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange" />

    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import tableComponents from './components/Table'
import Pagnation from './components/pagnation'
import tableListStatus from '@/enums/tableList'
import orderListStatus from '@/enums/orderStatus'
import apiOrder from '@/model/order'

export default {
  name: 'order',

  components: {
    tableComponents,
    Pagnation
  },

  data() {
    return {
      activeName: '',
      TabsList: tableListStatus.$getValues(),
      ListStatus: orderListStatus.$getValues(),
      dropValue: '',
      total: 0,
      query: {
        page: 1,
        page_size: 10,
        search: '',
      },
      tableData: [],
      isAll: true
    }
  },

  created () {
    this.getTableData()
  },

  mounted() {

  },

  watch: {
  },

  methods: {
    async getTableData () {
      const options = {
        params: {
          page: this.query.page,
          page_size: this.query.page_size,
          keywords: this.query.search && this.query.search
        }
      }
      options.params.filter = !this.activeName || this.activeName == '0'
        ? this.dropValue
        : this.activeName

      const res = await apiOrder.getOrdersData(options)

      this.tableData = res.data
      this.total = res.total
      console.log(this.tableData, 99999);
    },

    geteEaluation (data) {
      if (!data.length) {
        return []
      }
      let result = data.filter(ele => {
        return !ele.is_evaluation
      })
      return result
    },

    handleClick (tab) {
      console.log(tab, 6767);
      if (!tab.name) {
        this.isAll = true
      } else {
        this.isAll = false
        // 非所有订单时，清空右侧筛选栏
        this.dropValue = ''

      }

      this.query.page = 1
      this.getTableData()
    },

    searchKeys () {
      this.query.page = 1
      this.getTableData()
    },

    // 选择订单状态
    handleChange (type) {
      this.query.page = 1
      this.getTableData()
    },

    handleSizeChange (pageSize) {
      this.query.page_size = pageSize
      this.getTableData()
    },
    handleCurrentChange (page) {
      this.query.page = page
      this.getTableData()
    },

    reGetTable () {
      this.getTableData()
    }


  }
}
</script>

<style scoped lang="scss">
  @import '@/scss/variables';
  .tab-header {
    position: relative;
    .searchInput.el-input /deep/ {
      width: 250px;
      font-size: 12px;
     .el-input-group__append {
        padding: 0 10px;
        border-radius: 0;
      }
      span {
        cursor: pointer;
      }
    }
    /deep/.el-input-group>.el-input__inner,
    /deep/ .el-select .el-input__inner {
        height: 30px;
        border-radius: 0;
      }

    .drop {
      position: absolute;
      top: 0;
      right: 10px;
      .el-select /deep/ {
        width: 120px;
        .el-input__icon {
          line-height: 1;
        }
      }
    }
  }
  /deep/.el-tabs__item {
    font-weight: bold;
    &:hover {
      color: $--color-base-red;
    }
  }
  /deep/.el-tabs__item.is-active {
    color: $--color-base-red;
  }
  /deep/.el-tabs__active-bar {
    background-color: $--color-base-red;
  }

</style>
