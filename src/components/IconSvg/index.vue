<template>
  <svg class="icon-svg">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'IconSvg',

  props: {
    iconClass: {
      type: String,
      required: true
    }
  },

  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style scoped lang="scss">
.icon-svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
  overflow: hidden;
}
</style>
