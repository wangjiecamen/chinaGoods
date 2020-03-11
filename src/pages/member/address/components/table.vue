<template>
  <el-table
    :data="tableData"
    stripe
    :header-cell-style="{background:'#E5E5E5',height:'20px',color:'#666666'}"
    style="width: 100%">
    <el-table-column
      prop="receiver_name"
      label="收件人">
    </el-table-column>
    <el-table-column
      prop="location"
      label="地址"
      width="200">
    </el-table-column>
    <el-table-column
      prop="phoneno"
      label="手机号码">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleUpdate(scope.row.id)" type="text" size="small">修改</el-button>
        <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label=""
      width="200">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="handleDefault(scope.row.id)">默认地址</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    components: {

    },
    props: {
        tableData: {
            default: Array
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
        handleUpdate(res) {
            this.$emit("updateAddress",res)
        },
        handleDelete(res) {
            this.$emit("deleteAddress",res)
        },
        handleDefault(res) {
            this.$emit("defaultAddress",res)
        }
    },
}
</script>

<style lang='scss' scoped>

</style>
