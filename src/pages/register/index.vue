<template>
  <div class="register">
    <navbar :hideTop="false" :show="'register'"/>
    <el-form :label-width="labelWidth" ref="form" :model="model" :rules="rules">
      <el-form-item :label="$t('logon.area')" prop="area">
        <el-select v-model="model.area" style="width: 100%" @change="change($event)">
          <el-option
            v-for="(item, index) in areaList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('logon.telephone')" prop="phone">
        <el-input v-model="model.phone" :placeholder="$t('logon.placeholderTelephone')"></el-input>
      </el-form-item>

      <el-form-item :label="$t('logon.code')" prop="identify" class="identify">
        <el-input
          v-model="model.identify"
          :placeholder="$t('logon.placeholderCode')"
          style="width: 284px;marginRight: 18px;"
        ></el-input>
        <el-button @click="getIdentify">{{$t('phone.getCode')}}</el-button>
      </el-form-item>

      <el-form-item :label="$t('logon.username')" prop="username">
        <el-input v-model="model.name" :placeholder="$t('logon.placeholderUsername')"></el-input>
      </el-form-item>

      <el-form-item :label="$t('logon.password')" prop="password">
        <el-input v-model="model.password" type="password" :placeholder="$t('logon.placeholderPassword')" show-password></el-input>
      </el-form-item>

      <div class="right" @click="open">
        <span>{{$t(develop)}}</span>
        <img :src="pic" alt />
      </div>

      <div class="open" v-if="isOpen">
        <el-form-item :label="$t('logon.Invitation')" prop="Invitation" v-if="isChina">
          <el-input v-model="model.Invitation" :placeholder="$t('logon.placeholderInvitation')"></el-input>
        </el-form-item>

        <el-form-item :label="$t('logon.idWord')" prop="id_card" >
          <div class="idNumber">
            <el-select v-model="model.idStyle" style="width: 40%">
              <el-option
                v-for="(item, index) in idNumberList"
                :key="index"
                :label="$t(item.lang)"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="model.id_card" :placeholder="$t('logon.placeholderIdword')"></el-input>
          </div>

          <i class="tips">
            <icon-svg iconClass="prompt" />
            {{$t('logon.tips')}}
          </i>
        </el-form-item>

        <el-form-item :label="$t('logon.address')" prop="address">
          <el-cascader
            :options="options"
            clearable
            style="width:100%"
            :placeholder="$t('logon.placeholderAddress')"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item :label="$t('logon.detailAddress')" prop="detailAddress">
          <el-input type="textarea" :rows="2" :placeholder="$t('logon.placeholderDetailAddress')" v-model="model.detailAddress"></el-input>
        </el-form-item>

        <div class="name">
          <el-form-item :label="$t('logon.surname')" prop="surname">
            <el-input :placeholder="$t('logon.placeholderSurname')" v-model="model.surname"></el-input>
          </el-form-item>

          <el-form-item :label="$t('logon.name')" prop="user_name">
            <el-input :placeholder="$t('logon.placeholderSurname')" v-model="model.user_name"></el-input>
          </el-form-item>
        </div>

        <el-form-item :label="$t('logon.company')" prop="company">
          <el-input :placeholder="$t('logon.placeholderCompany')" v-model="model.company"></el-input>
        </el-form-item>

        <el-form-item :label="$t('logon.job')" prop="job">
          <el-input :placeholder="$t('logon.placeholderJob')" v-model="model.job"></el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="danger" style="width: 100%" @click="submit">{{$t('logon.register')}}</el-button>
      </el-form-item>
    </el-form>
    <div :class="lang=='zh'?'foot_cn':'foot_en'">
      <p>{{$t('logon.account')}}</p>
      <span @click="dialogVisible = true">《{{$t('logon.commodity')}}》</span>
    </div>
    <el-dialog
      :title="$t('logon.commodity')"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="handleClose">
      <span v-html="content"></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navbar from "@/layout/components/navbar"
import { async } from "q"
import idCordStatus from '@/enums/idCordStatus'
import apiRegister from "@/model/register"
import apiAddress from "@/model/address"
import apiArea from "@/model/area"
export default {
  name: "register",

  components: { navbar },

  data() {
    return {
      width: '30%',
      model: {
        phone: "", // 手机号码
        // num: '',
        // name: '',
        area: 1, // 地区
        address: "", // 收货地址
        identify: "", // 验证码
        name: "", // 用户名
        password: "", // 密码
        idStyle: "ID_CARD", // 证件类型
        id_card: "", // 证件号码
        Invitation: "", // 邀请函标号
        detailAddress: "", //详细地址
        surname: "", // 姓
        user_name: "", // 名
        company: "", // 所属公司
        job: "", //所属头衔
        country_id: 1, // 国际/地区id
        province_id: "", // 省份id
        city_id: "", // 城市id
        district_id: "" // 区id
      },
      rules: {
        phone: [{ required: true, trigger: "blur", message: this.$t('logon.placeholderTelephone') }],
        // num: [{required: true, trigger: 'blur', message: '请输入证件号码'}],
        // name: [{required: true, trigger: 'blur', message: '请输入收货人姓名'}],
        area: [{ required: true, trigger: "blur", message: this.$t('logon.areaRule') }],
        // address: [{required: true, trigger: 'blur', message: '请输入详细地址'}],
        identify: [
          { required: true, trigger: "blur", message: this.$t('logon.placeholderCode') }
        ],
        username: [
          { min: 4, max: 16, message: this.$t('logon.nameRule'), trigger: "blur" }
        ],
        password: [{ min: 6, message:  this.$t('logon.passRule'), trigger: "blur" }]
      },
      areaList: [],
      idNumberList: idCordStatus.$getValues(),
      options: [],
      isOpen: false,
      content:"",
      dialogVisible: false,
      lang:""
    };
  },

  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },

    explain() {
      console.log("隐私政策---");
    },

    service() {
      console.log("用户服务协议----");
    },

    changeArr(arr) {
      if (arr.length > 0) {
        arr.map(item => {
          item.value = item.id;
          item.label = item.name;
          if (item.sub) {
            item.children = item.sub;
            this.changeArr(item.children);
          }
        });
      } else {
        return;
      }
    },

    change(e) {
      this.model.area = e;
      this.country_id = e;
      this.getArea();
      if (e == 1) {
        this.model.idStyle = "ID_CARD";
      } else {
        this.model.idStyle = "PASSPORT";
      }
    },

    handleChange(e) {
      console.log(e);
      this.model.province_id = e[0];
      this.model.city_id = e[1];
      this.model.district_id = e[2];
    },

    handleClose(done) {
      this.$confirm(this.$t('logon.closeTit'))
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    async submit() {
      const params = {
        phone: this.model.phone,
        verify_code: this.model.identify,
        id_card: this.model.id_card,
        surname: this.model.surname,
        company: this.model.company,
        job: this.model.job,
        user_name: this.model.user_name,
        address: this.model.detailAddress,
        invite_code: this.model.Invitation,
        country_id: this.model.country_id,
        province_id: this.model.province_id,
        city_id: this.model.city_id,
        district_id: this.model.district_id,
        card_type: this.model.idStyle,
        name: this.model.name,
        password: this.model.password
      };
      const options = { data: params };
      try {
        await this.$refs.form.validate();
        await apiRegister.getRegister(options);
        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 1000);
      } catch (err) {
        // this.$message.info('该账号已注册')
      }
    },

    async getIdentify() {
      if (this.model.phone) {
        console.log("获取验证码---");
        const options = {
          params: { phone: this.model.phone, type: "register" }
        };
        await apiRegister.getverifyCode(options);
      }
    },

    async getArea() {
      const options = {};
      const res = await apiArea.getCountry(options);
      this.areaList = res;
      this.areaList.map(item => {
        if (item.id == this.model.area) {
          const areaList = item.sub;
          this.changeArr(areaList);
          this.options = areaList;
        }
      });
    },

    async getPrivacy(){
      const options = {
        params: {zone: 'FH'}
      }
      const res = await apiRegister.getScreet(options)
      console.log('隐私政策-----',res)
      let lang = this.$store.getters['app/language']
      if(lang == "zh"){
        this.content = res.content
      }else {
        this.content = res.content_en
      }

    }
  },
  computed: {
    isChina() {
      return this.model.area == 1 ? false : true;
    },
    develop() {
      if (this.isOpen) {
        return "logon.close"
      } else {
        return "logon.open"
      }
    },
    pic() {
      if (this.isOpen) {
        return require("@/assets/icon_shang_red.png");
      } else {
        return require("@/assets/icon_xia_red.png");
      }
    },
    labelWidth () {
      let lang = this.$store.getters['app/language']
      if (lang === 'zh') {
        return '120px'
      } else if(lang === 'en') {
        return '180px'
      }
    }
  },
  watch: {
    model: {
      handler: function(val) {},
      deep: true
    }
  },
  created(){
    this.lang = this.$store.getters['app/language']
    if(document.body.clientWidth<500) {
      this.width = '100%'
    } else {
      this.width = '30%'
    }
  },
  mounted() {
    this.getArea();
    this.getPrivacy()
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.register {
  width: 530px;
  margin: 0 auto;
  padding-top: 40px;
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

    span {
      color: #4d78b0;
    }
  }

  .foot_en {
    font-size: 12px;
    display: flex;
    // justify-content: center;
    align-items: center;
    color: #bbbbbb;
    width: 160%;

    span {
      color: #4d78b0;
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
