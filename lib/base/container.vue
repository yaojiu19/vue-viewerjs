<template>
  <div class="vue_viewer_wrapper">
    <slot></slot>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {
      prevLen: 0,
    }
  },
  created () {
    this.prevLen = this.$slots.default.length
  },
  updated() {
    if (this.prevLen !== this.$slots.default.length) {
      this.prevLen = this.$slots.default.length
      this.$emit('update')
    }
  },
  methods: {

  },
}
</script>

<style lang='scss'>

</style>
