<template>
  <div>
    <navbar :show="'layout'" :isShowMap="isShowMap"/>
    <div class="main-content" :key="key">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import navbar from './components/navbar'
import Footer from '@/layout/components/footer'
export default {
  name: 'layout',

  components: { navbar , Footer},

  data(){
    return{
      isShowMap:false
    }
  },

  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
