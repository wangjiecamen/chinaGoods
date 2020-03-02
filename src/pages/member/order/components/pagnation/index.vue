<!--  -->
<template>
  <div class="page">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSize"
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'Pagination',

  props: {
    total: {
      type: Number,
      required: true
    },
     layout: {
      type: String,
      default: 'sizes,total,prev,pager,next'
    },
    pageSize: {
      type: Array,
      default: _ => [2, 5, 10, 20]
    }
  },

  components: {},

  data() {
    return {
    };
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {
  },

  methods: {
    handleSizeChange (pageSize) {
      this.$emit('handleSizeChange', pageSize)
    },
    handleCurrentChange (page) {
      this.$emit('handleCurrentChange', page)
    }
  }
}
</script>
<style lang='scss' scoped>
 .page {
   float: right;
   margin: 20px 0;
 }
 /deep/.el-pagination.is-background .btn-next,
 /deep/.el-pagination.is-background .btn-prev,
 /deep/.el-pagination.is-background .el-pager li {
   background-color: rgba(255,255,255,1);
   border: 1px solid rgba(219,219,219,1);
   border-radius: 5px;
 }
 /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
   color: #606266;
 }
 /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
   background-color: rgba(255,255,255,1);
   border: 1px solid rgba(253,137,138,1);
   color: #FD898A;
 }
 /deep/.el-input.is-active .el-input__inner,
 /deep/.el-input__inner:focus {
   border-color: rgba(219,219,219,1);
 }
</style>
