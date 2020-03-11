<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~reset-css/sass/_reset';
@import '~@/scss/variables';
@import '~@/scss/index';

*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  color: $--color-base;
  font-size: $--size-base;
  font-family: PingFangSC-Light, 'Microsoft YaHei', '微软雅黑', arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
}
</style>
