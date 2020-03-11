<template>
  <div class="member">
    <aside class="aside">
      <h2 class="member-title">{{$t('memberCenter')}}</h2>
      <ul>
        <li :class="['aside-item', {active: activeIndex === index}]" v-for="(item, index) in list" :key="index" @click.stop="tabChange(index)">
          <router-link :to="item.url">{{$t(item.lang)}}</router-link>
        </li>
      </ul>
    </aside>
    <div class="member-main">
      <router-view />
    </div>
  </div>
</template>

<script>
import asideBar from '@/enums/asideBar'

export default {
  name: 'member',

  props: {
  },

  components: { },

  data() {
    return {
      list: asideBar.$getValues()
    }
  },
  computed: {
    activeIndex () {
      return this.$store.getters['user/activeIndex']
    }
  },

  methods: {
    tabChange (index) {
      this.$store.dispatch('user/setActiveIndex', index)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/scss/variables';

.member {
  .aside {
    float: left;
    width: $--member-aside-width;
    height:244px;
    border:1px solid rgba(229,229,229,1);
    padding: 30px 0 60px;
    .member-title {
      padding-left: 30px;
      font-weight: 600;
      color: #000;
      margin-bottom: 24px;
    }
    .aside-item {
      border-left: 3px solid transparent;
      &.active {
        border-left: 3px solid $--color-base-red;
        a {
          color: $--color-base-red;
        }
      }
      margin: 14px 0;
      font-size: 14px;
      a {
        color: $--color-base;
        margin-left: 30px;
      }
    }
  }

  .member-main {
    margin-left: 30px;
    padding-left: $--member-aside-width;
    padding-bottom:198px;
  }
}
</style>
