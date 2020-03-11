<template>
  <div class="navbar">
    <div class="nav-top" v-if="!hideTop">
      <div class="nav-top-core">
        <div class="nav-top-left" v-if="!successLogin">
          <div class="nav-top-left-item">{{$t('title')}}!</div>
          <a class="nav-top-left-item" @click="isShowLoginDialog = true">{{$t('login')}}</a>
          <a class="nav-top-left-item" @click="register" v-if="show != 'register'">{{$t('register')}}</a>
        </div>
        <div class="nav-top-left" v-if="successLogin">
          <div class="nav-top-left-item"> {{$t('hello')}}, {{username}} {{$t('user')}}</div>
          <a class="nav-top-left-item" @click="loginout">{{$t('logout')}}</a>
        </div>
        <div class="nav-top-right">
          <ul>
            <li v-show="!isShowMap&&show=='application' || !isShowMap&&show=='layout'" @click="toMap" class="map">{{$t('map')}}</li>
            <li class="laguages" v-if="show != 'register'">
              <el-dropdown @command="handleCommand">
                <span class="dropdown-title">
                  {{$t('member')}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="order">{{$t('myOrder')}}</el-dropdown-item>
                  <el-dropdown-item command="collect">{{$t('collectShop')}}</el-dropdown-item>
                  <el-dropdown-item command="address">{{$t('reciveAddress')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
              <el-dropdown @command="toggleLanguage">
                <span class="dropdown-title">
                  中|En|한
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="zh">简体中文</el-dropdown-item>
                  <el-dropdown-item command="en">English</el-dropdown-item>
                  <el-dropdown-item command="ko">한국어</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="nav-bottom">
      <div class="nav-bottom-core clearfix">
        <router-link to="/dashboard">
          <a href class="logo pull-left">
            <img src="@/assets/logo.png" alt />
          </a>
        </router-link>
        <div class="goLogin pull-right" v-if="show == 'home'||show == 'register'">
          <!-- <span>{{$t('ExistAccount')}}？</span> -->
          <router-link to="/dashboard">{{$t('toLogin')}} ></router-link>
        </div>
        <div class="pull-right btn-wp" v-if="show == 'application'">
          <router-link to="/freetoyiwu">{{$t('application.Application')}} <br/>{{$t('application.word')}}</router-link>
        </div>
      </div>
    </div>

    <loginDialog :ishow="isShowLoginDialog" @isShowDialog="toggleLoginDialog" @login="login" />
  </div>
</template>

<script>
import loginDialog from "./loginDialog"
import api from '@/model/register'
import Cookie from 'js-cookie'

export default {
  name: "navbar",

  props: {
    hideTop: {
      type: Boolean,
      default: false
    },
    isShowMap: {
      type: Boolean,
      default: true
    },
    show:{
      type:String,
      default: 'application'
    }
  },

  components: { loginDialog },

  data() {
    return {
      isShowLoginDialog: false
    }
  },

  created() {
    console.log('hideTop',this.hideTop,'show',this.show,'isshowmap',this.isShowMap)
  },

  mounted() {

  },

  watch: {

  },

  computed: {
    successLogin () {
      return localStorage.getItem('name') ? true : false
    },
    username () {
      return  this.$store.getters['user/username']
    },
    language () {
      return this.$store.getters['app/language']
    }
  },

  methods: {
    toggleLoginDialog(isShow) {
      this.isShowLoginDialog = isShow;
    },

    toMap () {
      this.$router.push('/dashboard')
    },

    toggleLanguage (lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
    },

    handleCommand(type) {
      if (!this.successLogin) {
        this.isShowLoginDialog = true
        return
      }
      if (type === "order") {
        this.$router.push("/member/order/index");
      } else if (type === "collect") {
        this.$router.push("/member/order/collect");
      } else {
        this.$router.push("/member/order/address");
      }
    },

    login(options) {
      this.$store.dispatch('user/login', options).then(_ => {
        this.isShowLoginDialog = false
      }).catch(err => {
        console.log(err)
      })
    },

    register () {
      this.$router.push('/register')
    },

    async loginout(){
      this.$store.dispatch('user/logout')
    }

  }
};
</script>

<style scoped lang="scss">
.btn-wp {
  background: #F1F9F5;
  // width: 120px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  a {
    display: inline-block;
    color: #189D50;
    // width: 93px;
    font-size: 12px;
  }
}

.laguages {
  cursor:pointer;
}
@media screen and (max-width: 500px) {
  .nav-top{
    height: 72px;
    font-size: 12px;
    background: #f6f6f6;
    padding: 0 10px;
  }

  .nav-top-right {
    float: none !important;
  }

  .nav-top-core {
    height:100%;
    display:flex;
    align-items: center;
  }

  .nav-top-right li{
    padding-left: 0px !important;
    text-align: center;
  }

  .nav-bottom {
    height:80px;
  }

  .nav-bottom-core {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .btn-wp {
    margin-left: 5px;
    padding: 5px;
    height: auto;
  }

  .state p{
    font-size: 10px;
  }

  .map {
    display:none !important;
  }
}
</style>
