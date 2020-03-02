<template>
  <div class="wp">
    <navbar :hideTop="true" />
    <div class="ct">
      <p>Welcom home dear foreign buyers friends.</p>
      <p>FREE flight back to YIWU, Application will open from Feb.21 00:00 (Beijing time).</p>
      <p>北京时间2月21日开放申请，敬请期待！</p>
    </div>
  </div>
</template>
<script>
import navbar from "@/layout/components/navbar"
export default {
  name: 'freetoyiwu',
  data() {
    return {}
  },
  components: {
    navbar
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.wp {
  width: 100%;
  background: #F7F7F7;
}
  .ct {
    max-width: 800px;
    padding: 200px 0 450px;
    color: #189D50;
    background: #fff;
    margin: 0 auto;
    position: relative;
    top: 100px;
    p {
      line-height: 25px;
      text-align: center;
    }
  }
</style>
