<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
@import url('vuetify/dist/vuetify.css')
body
  margin 0
  padding 0
#app
  font-family 'PingFangSC-Regular', 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
