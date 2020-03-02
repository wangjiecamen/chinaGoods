<!--  -->
<template>
  <div class='dialog'>
    <el-dialog
      :class="isContentCenter ? 'contentCenter' : ''"
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :center="isTitleCenter"
      :before-close="handleClose">
      <span>
        <slot></slot>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="danger" @click="submit">发 表</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//import  from '@/components/'

export default {
  name: '',

  props: {
    title: {
      type: String,
      default: '提示'
    },
    dialogVisible: {
      default: false
    },
    width: {
      default: '50%'
    },
    isTitleCenter: {
      default: false
    },
    isContentCenter: {
      default: false
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
    handleClose () {
      this.$emit('closeDialog', false)
    },
    submit () {
      this.$emit('submitDialog')
    }
  }
}
</script>
<style lang='scss' scoped>

  /deep/ .el-dialog--center .el-dialog__footer {
    text-align: right
  }
  .contentCenter {
    /deep/.el-dialog--center .el-dialog__body {
      text-align: center;
    }
  }
</style>
