<template>
  <el-table
    :data="tableData"
    stripe
    :header-cell-style="{background:'#E5E5E5',height:'20px',color:'#666666'}"
    style="width: 100%">
    <el-table-column
      prop=""
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="pic"
      :label="$t('orderDeatil.shopName')">
      <template slot-scope="scope">
        <img :src="scope.row.cover ? scope.row.cover[0] : ''" class="pic"/>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label=""
      width="300">
    </el-table-column>
    <el-table-column
      prop="weight"
      :label="$t('orderDeatil.weight')">
      <template slot-scope="scope">
        <span>{{scope.row.quantity}}g</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="quantity"
      :label="$t('orderDeatil.num')">
      <template slot-scope="scope">
        <span>x{{scope.row.quantity}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="price"
      :label="$t('orderDeatil.price')">
      <template slot-scope="scope">
        <span>￥{{scope.row.price}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop=""
      :label="$t('orderDeatil.money')">
      <template slot-scope="scope">
        <span>{{scope.row.quantity*Number(scope.row.price)}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    components: {

    },
    props: {
        tableData:{
            type: Array
        }
    },
    data() {
        return{

        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    destroyed() {

    },
    methods: {

    },
}
</script>

<style lang='scss' scoped>
.pic{
  width: 80px;
  height: auto;
}
</style>
