<template>
  <div class="foot">
    <div class="content">
       <img src="../../assets/logo_w.png" alt="" class="logo">
       <ul>
         <li>官方链接:</li>
         <li><a href="https://www.weibo.com/commoditiescity" target='_blank'><img src="@/assets/icon_weibo.png" alt=""></a></li>
         <li><a href="https://www.facebook.com/commoditiescity" target='_blank'><img src="@/assets/icon_facebook.png" alt=""></a></li>
         <li><a href="https://www.twitter.com/commoditiescity" target='_blank'><img src="@/assets/icon_twitter.png" alt=""></a></li>
       </ul>
       <div class="qrcode">
         <img src="../../assets/wxcode.png" alt="" class="qr">
         <p class="desc">扫码关注微信公众号</p>
       </div>
    </div>
    <div class="state">
      <img src="../../assets/emblem.png" alt="" class="icon">
      <p>备案：浙ICP备 20004072号 | ©2020 <a href="http://www.cccgroup.com.cn" target='_blank'>浙江中国小商品城集团股份有限公司</a> 版权所有 | <span href="#" @click="dialogVisibled">隐私政策</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods:{
    dialogVisibled(){
      this.$emit('dialogVisibled', true)
    }
  },
  created(){
    
  }
}
</script>

<style lang="scss" scoped>
  .content{
    max-height:148px;
    height: 18vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo{
      height: 50px;
      display: block;
    }
    ul{
      display: flex;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:20px;
      align-items: center;
      li{
        margin-right: 20px;
        img{
          width: 50px;
          height: 50px;
          display: block;
        }
      }
    }
    .qrcode{
      .qr{
      margin:auto;
        width: 100px;
        height: 100px;
        display: block;
      }
      .desc{
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:17px;
      }
    }
  }
  .state{
    height:50px;
    background:rgba(0,0,0,1);
    display: flex;
    align-items: center;
    justify-content: center;
    .icon{
      height: 20px;
      width:20px;
      margin-right: 4px;
    }
    p{
      font-size:12px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      color:rgba(204,204,204,1);
      line-height:26px;
    }
    a {
      color:#ccc;

      &:hover{
        cursor:pointer;
        color:#fff;
      }
    }

    span {
      color:#ccc;

      &:hover{
        cursor:pointer;
        color:#fff;
      }
    }
  }

/deep/ .el-dialog__wrapper{
  z-index:2008 !important;
}

  @media screen and (max-width: 500px) {
  .foot .content {
    width: 100%;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .content ul li {
    margin-right: 10px;
    font-size:10px;
  }

  .content ul li img{
    width:35px;
    height:35px;
  }

  .content .logo {
    height:25px;
  }
  .content .qrcode .qr {
    width:50px;
    height:50px;
  }
  .content .qrcode .desc {
    font-size:10px;
  }

  .state p{
    font-size:10px;
  }
}
</style>
