<template>
  <div class="register" :style="formStyle">
    <navbar :hideTop="false" :show="'register'" />
    <el-form :label-width="labelWidth" ref="form" :model="model" :rules="rules">
      <!-- 联系方式-->
      <el-form-item :label="$t('logon.contact')" prop="contact">
        <el-input
          :placeholder="$t('logon.pleaseInput')"
          v-model="model.contact"
          class="input-with-select"
        >
          <el-select style="width:110px" v-model="model.contactWay" slot="prepend">
            <el-option :label="$t('logon.telephone')" value="1"></el-option>
            <el-option :label="$t('logon.email')" value="2"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <!-- 设置密码-->
      <el-form-item :label="$t('logon.password')" prop="credential">
        <el-input
          v-model="model.credential"
          type="password"
          :placeholder="$t('logon.placeholderPassword')"
          show-password
        ></el-input>
      </el-form-item>
      <!-- 验证码-->
      <el-form-item :label="$t('logon.code')" prop="code" class="identify">
        <el-input
          v-model="model.code"
          :placeholder="$t('logon.placeholderCode')"
          style="width: 284px;marginRight: 18px;"
        ></el-input>
        <el-button @click="getIdentify">{{$t('phone.getCode')}}</el-button>
      </el-form-item>
      <div class="right">
        <span @click="isOpen=!isOpen">{{isOpen?$t('logon.close'):$t('logon.open')}}</span>
        <img :src="pic" alt />
      </div>

      <div class="open" v-if="isOpen">
        <!-- 国籍-->
        <el-form-item :label="$t('logon.nationality')" prop="area">
          <el-select
            v-model="model.nationality"
            style="width: 100%"
            :placeholder="$t('logon.pleaseChoose')"
          >
            <el-option
              v-for="(item, index) in nationalityList"
              :key="index"
              :label="lang==='zh'?item.label:item.value"
              :value="lang==='zh'?item.label:item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 用户名-->
        <el-form-item :label="$t('logon.username')" prop="nikcname">
          <el-input v-model="model.nikcname" :placeholder="$t('logon.placeholderUsername')"></el-input>
        </el-form-item>

        <div class="name">
          <!-- 姓-->
          <el-form-item :label="$t('logon.surname')" prop="surname">
            <el-input :placeholder="$t('logon.placeholderSurname')" v-model="model.surname"></el-input>
          </el-form-item>
          <!-- 名-->
          <el-form-item :label="$t('logon.name')" prop="user_name">
            <el-input :placeholder="$t('logon.placeholderSurname')" v-model="model.user_name"></el-input>
          </el-form-item>
        </div>
        <!-- 采购意向-->
        <el-form-item :label="$t('logon.intention')" prop="intention">
          <el-select
            v-model="model.intention"
            style="width: 100%"
            multiple
            :placeholder="$t('logon.pleaseChoose')"
          >
            <el-option
              v-for="(item,index) in intentionList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="danger" style="width: 100%" @click="submit">{{$t('logon.register')}}</el-button>
      </el-form-item>
    </el-form>
    <div :class="lang=='zh'?'foot_cn':'foot_en'">
      <p>{{$t('logon.account')}}</p>
      <span @click="dialogVisible=true">《{{$t('logon.commodity')}}》</span>
    </div>
    <el-dialog
      :title="$t('logon.commodity')"
      :visible.sync="dialogVisible"
      :width="width"
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
import qs from "qs";
import navbar from "@/layout/components/navbar";
import { async } from "q";
import idCordStatus from "@/enums/idCordStatus";
import apiRegister from "@/model/register";
import apiArea from "@/model/area";
import u from "@/utils/utils";

const countryList = require("@/json/coutryList.json");
export default {
  name: "register",
  components: { navbar },
  data() {
    return {
      width: "30%",
      model: {
        surname: "", // 姓
        user_name: "", // 名
        contactWay: "1", //联系方式 1:手机号。2:邮箱
        nationality: "",
        contact: "", //联系方式的值,
        intention: "", //采购意向
        code: "", // 验证码,
        credential: "", //密码
        nikcname: "" //用户名
      },

      rules: {
        contact: {
          validator: u.phoneValidator,
          trigger: "blur"
        },
        code: [
          {
            required: true,
            pattern: "^\\d{4}$",
            trigger: "blur",
            message: this.$t("logon.placeholderCode")
          }
        ],
        username: [
          {
            min: 4,
            max: 16,
            message: this.$t("logon.nameRule"),
            trigger: "blur"
          }
        ],
        credential: [
          {
            required: true,
            min: 6,
            message: this.$t("logon.passRule"),
            trigger: "blur"
          }
        ]
      },
      nationalityList: countryList.options,
      isOpen: false,
      content: "",
      dialogVisible: false,
      intentionList: [] //采购意向列表
    };
  },

  methods: {
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

    async submit() {
      const params = {
        code: this.model.code,
        ...(this.model.contactWay === "1" && { phone: this.model.contact }),
        ...(this.model.contactWay === "2" && { email: this.model.contact }),
        credential: this.model.credential,
        nationality: this.model.nationality,
        nikcname: this.model.nikcname,
        intention: this.model.intention,
        userName: this.model.surname + this.model.user_name
      };
      console.log(params);
      const options = { data: qs.stringify(params) };

      this.$refs.form.validate(valid => {
        if (valid) {
          apiRegister
            .getRegister(options)
            .then(_ => {
              setTimeout(() => {
                this.$router.push("/dashboard");
              }, 1000);
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        }
      });
    },

    async getIdentify() {
      let params;
      this.$refs.form.validateField("contact", error => {
        if (!error) {
          let params =
            this.model.contactWay === "1"
              ? { phone: this.model.contact }
              : { email: this.model.contact };

          apiRegister.getverifyCode({ params }).catch(err => {
            this.$message.error(err.msg);
          });
        }
      });
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
  },
  computed: {
    lang() {
      return this.$store.getters["app/language"];
    },

    pic() {
      if (this.isOpen) {
        return require("@/assets/icon_shang_red.png");
      } else {
        return require("@/assets/icon_xia_red.png");
      }
    },
    formStyle() {
      if (this.lang === "zh") {
        return { width: "530px" };
      }
      return { width: "600px" };
    },
    labelWidth() {
      if (this.lang === "en") {
        return "180px";
      }
      return "130px";
    }
  },
  watch: {
    "model.contactWay": {
      handler: function(newValue, oldValue) {
        if (newValue !== oldValue) {
          const rules = { ...this.rules };
          rules.contact = {
            validator: newValue === "2" ? u.emailValidator : u.phoneValidator,
            trigger: "blur"
          };
          this.rules = rules;
        }
      }
    },
    lang: {
      handler: function(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.getPrivacy();
        }
      },
      immediate: true
    }
  },
  created() {
    if (document.body.clientWidth < 500) {
      this.width = "100%";
    } else {
      this.width = "30%";
    }
  },
  mounted() {
    // this.getArea();
    //this.getPrivacy();
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.register {
  margin: 0 auto;
  padding-top: 60px;
  margin-top: $--nav-bottom-height;
  /deep/ textarea {
    height: 100px;
  }

  /deep/ .identify {
    .el-form-item__content {
      display: flex;
      justify-content: space-around;
    }
  }

  .right {
    text-align: right;
    margin-bottom: 24px;

    span {
      font-size: 12px;
      color: #ee201d;
      margin-right: 4px;
      cursor: pointer;
    }
    img {
      width: 8px;
      height: 5px;
      vertical-align: middle;
    }
  }

  .foot_cn {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #bbbbbb;
    margin-bottom: 20px;

    span {
      color: #4d78b0;
      cursor: pointer;
    }
  }

  .foot_en {
    font-size: 12px;
    display: flex;
    // justify-content: center;
    align-items: center;
    color: #bbbbbb;
    width: 160%;
    margin-bottom: 20px;

    span {
      color: #4d78b0;
      cursor: pointer;
    }
  }

  .open {
    .idNumber {
      display: flex;
      margin-bottom: 0px;
    }

    .tips {
      color: #ee201d;
      .icon-svg {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }

    .name {
      display: flex;
    }
  }
}
</style>
