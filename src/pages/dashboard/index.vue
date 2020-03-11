<template>
  <div>
    <navbar :isShowMap="isShowMap" />
    <iframe class="map" src="http://pdh5.onccc.com/#/" frameborder="0"></iframe>
    <Footer @dialogVisibled="getdialogVisibled"></Footer>
    <el-dialog
      :title="$t('logon.commodity')"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <span v-html="content"></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('logon.cancel')}}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{$t('logon.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navbar from "@/layout/components/navbar";
import Footer from "@/layout/components/footer";
import apiRegister from "@/model/register";
export default {
  name: "dashboard",

  props: {},

  components: {
    navbar,
    Footer
  },

  data() {
    return {
      isShowMap: false,
      dialogVisible: false,
      content: ""
    };
  },

  computed: {
    lang() {
      return this.$store.getters["app/language"];
    }
  },

  created() {},

  mounted() {},

  watch: {
    lang: {
      handler: function(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.getPrivacy();
        }
      },
      immediate: true
    }
  },

  methods: {
    getdialogVisibled(e) {
      this.dialogVisible = e;
    },
    handleClose(done) {
      this.$confirm(this.$t("logon.closeTit"), {
        confirmButtonText: this.$t("logon.confirm"),
        cancelButtonText: this.$t("logon.cancel")
      })
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    async getPrivacy() {
      const options = {
        params: { zone: "FH" }
      };
      const res = await apiRegister.getScreet(options);
      console.log("隐私政策-----", res);

      if (this.lang == "zh") {
        this.content = res.content;
      } else {
        this.content = res.content_en;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100vh;
}
@media screen and (max-width: 500px) {
  /deep/ .el-dialog {
    width: 90% !important;
  }

  /deep/ .el-message-box__wrapper .el-message-box {
    width: 310px !important;
  }
}
</style>
