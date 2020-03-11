<template>
  <div class="register">
    <navbar :hideTop="false" :show="'register'"/>
    <!--时间线-->
    <div style="font-weight: 900;padding: 1rem;font-size: 24px;">普通商户认证</div>
    <el-container style="height: 540px;">
      <el-main  width="840px" style="border: 1px solid #E5E5E5;border-top: 2px solid #4085F5;margin-right: 2rem;">
       
        <el-steps :active="2"  align-center style="margin: 2rem;">
          <el-step title="身份确认"></el-step>
          <el-step title="确认商位"></el-step>
          <el-step title="设置账号"></el-step>
          <el-step title="认证完成"></el-step>
        </el-steps>
       <div v-show='resState == 0 '>
        <el-form label-width="120px" ref="form" :model="model" :rules="rules" style="width: 60%;margin: 2rem auto;">
          <el-form-item label="姓名" prop="name"> 
              <el-input v-model="model.name"  style="width: 334px;marginRight: 18px;"></el-input>
              <p style="color:#F56C6C;">若非身份证用户，请输入护照或居住证号码！</p>
            </el-form-item>
            <!-- <el-form-item :label="$t('logon.telephone')" prop="phone"> -->
            <el-form-item label="身份证号码" prop="idCard"> 
              <el-input v-model="model.idCard"  style="width: 334px;marginRight: 18px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="getUserboothinfo">确认无误下一步</el-button>
              <el-button type="info" @click="back">返回 </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="resState==1">
          <el-card class="box-card" style="background: #F7F7F7;font-size: 1.2rem;">
            <el-row :gutter="20" >
              <el-col :span="4" style="text-align: right;">
                 <div>姓名:<span class='b-w'>王</span></div>
              </el-col>
              <el-col :span="16" style="text-align: center;">
                 <div>身份证号:<span class='b-w'>330725196601011234</span></div>
              </el-col>
              <el-col :span="4" style="text-align: left;">
                 <div>商位个数:<span class='b-w'>3</span></div>
              </el-col>
            </el-row>
          </el-card>

            以下为您名下已采集的商位列表

            注：默认自动绑定与身份证号号码相匹配的商位，若商位信息有误，请电联 0579-85650620 进行反馈！
        </div>
        <div class="v-main" v-show="resState==2">
          <div class="mTOP60">
            <h1 style="font-size: 24px;color: #333333;">对不起，您的信息已认证！</h1>
          </div>
          <div class="main-d">
            <p class="ft16">根据系统查询显示,</p>
            <p class="ft16">您的认证信息
              <span class="iblockspan">姓名：王大拿；身份证号：330782199635874569</span>
              已被注册;
            </p>
            <p class="ft16">
              注册账号为：<span style="font-size: 20px;color: #E64340;line-height: 32px;">1352698595</span>
            </p>
            <p class="ft16">
              若是您本来注册，可直接通过该手机号码进行登录并管理你的账户信息；
            </p>
            <p class="ft16">
              若此号码并非您本人注册认证，请致电右侧对应市场区块的客服专员进行咨询；
            </p>
          </div>
          <div class="botton-d" style="margin-top: 30px;">
            <h1 style="font-size: 18px;color: #333333;">当前您还可以：</h1>
            <div class="mTOP16">
              <el-button type="primary" style="width: 120px;">立即登录</el-button>
              <el-button plain style="width: 120px;">找回密码</el-button>
              <el-button plain style="width: 160px;">返回认证中心</el-button>
            </div>
          </div>
        </div> 

        <!-- 手机已被注册 -->
     <div class="v-main" v-show="resState==3">
          <div class="mTOP60">
            <h1 style="font-size: 24px;color: #333333;">对不起，您登记预留的手机号已被认证！</h1>
          </div>
          <div class="main-d">
            <p class="ft16">根据系统查询显示,</p>
            <p class="ft16">您认证信息
              <span class="iblockspan">姓名：王大拿；身份证号：330782199635874569</span>
              的预留手机号码为；
            </p>
            <p class="ft16">
              <span style="font-size: 20px;color: #E64340;line-height: 32px;">1352698595</span>
              <span style="font-size: 16px;color: #999999;line-height: 38px;">【已被认证，认证商位为 0411A，国际商贸城一区】</span>
            </p>
            <p class="ft16">
              拨浪鼓建议您到所在市场客服大厅处更换您新手机号码后再来认证；
            </p>
            <p class="ft16">
              若此手机号码认证商位非您或您亲属所有，请致电右侧对应市场区块客服咨询解决方案；
            </p>
          </div>
          <div class="botton-d" style="margin-top: 30px;">
            <h1 style="font-size: 18px;color: #333333;">当前您还可以：</h1>
            <div class="mTOP16">
              <el-button type="primary" style="width: 120px;">立即登录</el-button>
              <el-button plain style="width: 160px;">返回认证中心</el-button>
            </div>
          </div>
        </div>

        <!-- 查无此人 -->
        <div class="v-main" v-show="resState==4">
          <div class="mTOP60">
            <h1 style="font-size: 24px;color: #333333;">对不起，暂无您登记的商位信息！</h1>
          </div>
          <div class="main-d">
            <p class="ft16">根据系统查询显示,</p>
            <p class="ft16">您认证信息
              <span class="iblockspan">姓名：王大拿；身份证号：330782199635874569</span>
            </p>
            <p class="ft16">
              <span style="font-size: 20px;color: #E64340;line-height: 32px;">暂无任何商位信息</span>
            </p>
            <p class="ft16">
              请确认您输入的认证信息是否正确；
            </p>
            <p class="ft16">
              若您有经营商位确仍查无信息，请尽量联系市场管理人员进行采集登记； 
            </p>
          </div>
          <div class="botton-d" style="margin-top: 30px;">
            <h1 style="font-size: 18px;color: #333333;">当前您还可以：</h1>
            <div class="mTOP16">
              <el-button type="primary">经营人员信息填报</el-button>
              <el-button plain style="width: 160px;">返回认证中心</el-button>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width="240px" style="border: 1px solid #E5E5E5;border-top: 2px solid #4085F5;">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="text-align: center;">
            <p>市场客服专员</p>
            <p style="font-size: 12px;color: rgb(77, 120, 176);margin-top: 1rem;">若手机无法认证，请联系客服专员</p>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            <p style="padding: 0.5rem 0px;">
            {{'客服专员 ' + o }}
            </p>
            <p>
              <i class="el-icon-phone-outline"></i>
              张三
              (0579)88885888</p>
            <el-divider></el-divider>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div> 
</template>

<script>
import navbar from "@/layout/components/navbar"
import { async } from "q"
import idCordStatus from '@/enums/idCordStatus'

import authentication  from '@/model/authentication'

// import apiRegister from "@/model/register"
// import apiAddress from "@/model/address"
// import apiArea from "@/model/area"
export default {
  name: "authentication",
  components: { navbar },
  data() {
    return {
      width: '30%',
      model: {
        phone: "", // 手机号码
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
      resState:1,
      rules: {
        //phone: [{ required: true, trigger: "blur", message: this.$t('logon.placeholderTelephone') }],
        // num: [{required: true, trigger: 'blur', message: '请输入证件号码'}],
         name: [{required: true, trigger: 'blur', message: '请输入收货人姓名'}],
         idCard: [{required: true, trigger: 'blur', message: '请输入收货人姓名'}],
        // area: [{ required: true, trigger: "blur", message: this.$t('logon.areaRule') }],
        // // address: [{required: true, trigger: 'blur', message: '请输入详细地址'}],
        // identify: [
        //   { required: true, trigger: "blur", message: this.$t('logon.placeholderCode') }
        // ],
        // username: [
        //   { min: 4, max: 16, message: this.$t('logon.nameRule'), trigger: "blur" }
        // ],
        // password: [{ min: 6, message:  this.$t('logon.passRule'), trigger: "blur" }]
      },

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
back() {
      console.log("返回");
    },
    async getUserboothinfo() {
     
      const params = {
        name: this.model.name,
        idCard:this.model.idCard
      };
      const options = { data: params };
       console.log(111)
      try {
        await this.$refs.form.validate();
        const res = await authentication.userboothinfo(options);
        console.log(res)
      } catch (err) {
         console.log('err')
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

    // async getArea() {
    //   const options = {};
    //   const res = await apiArea.getCountry(options);
    //   this.areaList = res;
    //   this.areaList.map(item => {
    //     if (item.id == this.model.area) {
    //       const areaList = item.sub;
    //       this.changeArr(areaList);
    //       this.options = areaList;
    //     }
    //   });
    // },

    // async getPrivacy(){
    //   const options = {
    //     params: {zone: 'FH'}
    //   }
    //   const res = await apiRegister.getScreet(options)
    //   console.log('隐私政策-----',res)
    //   let lang = this.$store.getters['app/language']
    //   if(lang == "zh"){
    //     this.content = res.content
    //   }else {
    //     this.content = res.content_en
    //   }

    // }
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
    //this.getArea();
   //this.getPrivacy()
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";
.b-w{
  color: #4085F5;
}
.register {
  width: 1100px;
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
}

 .v-main{
    width:630px;
    margin:0px auto;
  }
  .mTOP60{
    margin-top:60px;
  }
  .main-d{
    width:630px;margin-top:20px;
  }
  .main-d>p{
    color: #333333;line-height: 38px;
  }
  .iblockspan{
    display:inline-block;
    font-size:16px;
    color: #4085F5;
    line-height: 36px;
    background-color:#F7F7F7;
  }
  .mTOP16{
    margin-top:16px;
  }
  .ft16{
    font-size:16px;
  }

</style>
