<template>
  <div>
    <el-dialog
      :visible.sync="ishow"
      width="380px"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <div class="header_login">
        <span
          :class="['pointer',{active: isActive === 'phone'}]"
          @click="chang('phone')"
        >{{$t('phone.title')}}</span>
        |
        <span
          :class="['pointer', {active: isActive === 'acount'}]"
          @click="chang('acount')"
        >{{$t('account.title')}}</span>
      </div>
      <el-form class="form" :model="model" :rules="rules" ref="form" validate-on-rule-change>
        <template v-if="isActive === 'phone'">
          <el-form-item class="form-item" prop="phone">
            <el-dropdown placement="bottom-start" @command="handleCommand">
              <span class="item-label pointer">
                {{model.areaCode}}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in areaCodeList"
                  :key="item.code"
                  :command="item.code"
                >{{item.code}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input v-model="model.phone" :placeholder="$t('phone.placeholderPhone')"></el-input>
          </el-form-item>

          <el-form-item class="form-item verificationCode" prop="verify_code">
            <span class="item-label">{{$t('phone.code')}}</span>
            <el-input v-model="model.verify_code" :placeholder="$t('phone.placeholderVerify')"></el-input>
            <a
              v-if="enable"
              class="getCode"
              href="javacript:;"
              @click="getIdentify"
            >{{$t('phone.getCode')}}</a>
            <a v-else class="getCode" href="javacript:;">{{msg}}</a>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item class="form-item" prop="name">
            <span class="item-label-acount">
              <icon-svg iconClass="nickname" />
            </span>
            <el-input v-model="model.name" :placeholder="$t('account.placeholderUser')"></el-input>
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <span class="item-label-acount">
              <icon-svg iconClass="locking" />
            </span>
            <el-input
              type="password"
              v-model="model.password"
              :placeholder="$t('account.placeholderPassword')"
            ></el-input>
          </el-form-item>
        </template>

        <el-form-item prop="is_seven">
          <el-checkbox
            v-model="model.is_seven"
            :true-label="1"
            :false-label="0"
          >{{$t('phone.noLogin')}}</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%" class="baseRed" @click="handleLogin">{{$t('phone.submit')}}</el-button>
        </el-form-item>

        <el-form-item>
          <a class="pointer colorBlue" @click="goRegister">{{$t('phone.goRegister')}} ></a>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import apiRegister from "@/model/register";
export default {
  name: "",

  props: {
    ishow: {
      type: Boolean,
      default: false
    }
  },

  components: {},

  data() {
    return {
      model: {
        phone: "",
        verify_code: "",
        areaCode: 86,
        is_seven: 0,
        name: "",
        password: ""
      },
      areaCodeList: [{ code: 86 }, { code: 886 }, { code: 816 }],
      isActive: "phone",
      enable: true,
      msg: ""
    };
  },

  computed: {
    code() {
      return "+" + this.model.areaCode;
    },
    rules() {
      if (this.isActive === "phone") {
        return {
          phone: [
            {
              required: true,
              trigger: "blur",
              pattern: "^1[3456789][0-9]{9}$",
              message: this.$t("phone.placeholderPhone")
            }
          ],
          verify_code: [
            {
              required: true,
              trigger: "blur",
              message: this.$t("phone.placeholderVerify")
            }
          ]
        };
      } else {
        return {
          name: [
            {
              required: true,
              message: this.$t("account.placeholderUser"),
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              message: this.$t("account.placeholderPassword"),
              trigger: "blur"
            }
          ]
        };
      }
    }
  },

  created() {},

  mounted() {},

  watch: {},

  methods: {
    async handleLogin() {
      try {
        const valid = await this.$refs.form.validate();
        let data = {};
        if (this.isActive === "phone") {
          data = {
            phone: this.model.phone,
            verify_code: this.model.verify_code,
            areaCode: this.model.areaCode,
            is_seven: this.model.is_seven
          };
        } else {
          data = {
            is_seven: this.model.is_seven,
            name: this.model.name,
            password: this.model.password
          };
        }
        this.$emit("login", data);
      } catch (err) {
        console.log(err);
      }
    },
    chang(type) {
      this.isActive = type;
      this.$refs.form.resetFields();
      // this.$refs.form.clearValidate()
    },

    goRegister(e) {
      this.handleClose();
      this.$router.push({
        path: "/register"
      });
    },

    handleClose() {
      this.$emit("isShowDialog", false);
    },

    handleCommand(command) {
      this.model.areaCode = command;
    },

    getIdentify() {
      if (this.model.phone) {
        console.log("获取验证码---");
        this.enable = false;
        const options = {
          params: { phone: this.model.phone, type: "login" }
        };
        apiRegister.getverifyCode(options);

        let time = 60;
        this.msg = time + "s";
        let timer = setInterval(() => {
          if (time == 0) {
            this.enable = true;
            clearInterval(timer);
          }
          time--;
          this.msg = time + "s";
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";
.baseRed {
  background-color: $--color-base-red;
  color: #fff;
}
.header_login {
  margin: 10px 0 50px 0;
  span {
    display: inline-block;
    width: 48%;
    font-size: 18px;
    font-weight: 800;
    text-align: center;
    color: #ccc;
  }
  .active {
    color: #333;
  }
}

.form-item {
  font-weight: bold;
  &.el-form-item {
    border: 1px solid #e5e5e5;
    .el-form-item__content {
      text-align: center;
      display: flex;
    }
  }
  input {
    appearance: none;
    border: 0;
    padding: 0 10px 0 10px;
  }
  &.verificationCode {
    input {
      border-right: 1px solid #eee !important;
    }
  }
}

.form {
  .item-label {
    width: 50px;
    display: inline-block;
    flex-shrink: 0;
    font-size: 12px;
  }
  .item-label-acount {
    width: 48px;
    height: 40px;
    line-height: 50px;
    display: inline-block;
    border-right: 1px solid $--color-line-grey;
    .icon-svg {
      width: 20px;
      height: 20px;
    }
  }

  /deep/.el-button:focus,
  .el-button:hover {
    color: #fff;
    background-color: $--color-base-red;
    border-color: $--color-base-red;
  }

  .getCode {
    width: 160px;
    font-size: 13px;
    color: #4d78b0;
  }
  .colorBlue {
    color: #4d78b0;
  }
}
</style>
