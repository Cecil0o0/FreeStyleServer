<template lang="pug">
  .c-wrapper
    v-subheader 中文韵脚搜词插件
    v-text-field(
      label="请输入要查询的中文词组"
      v-model="keyWordParam"
    )
    v-btn(
      class="primary--btn"
      @click="search"
    ) 点击查询
    .list
      v-chip(label color="pink" text-color="white" v-for="item in limitList" :key="item")
        | {{item}}
    v-snackbar(
      :timeout="timeout"
      :color="color"
      :top="true"
      :multi-line="mode === 'multi-line'"
      :vertical="false"
      v-model="snackbar"
    )
      | 请输入内容
      v-btn(dark flat @click.native="snackbar = false") Close
</template>

<script>
export default {
  name: 'c-free-style',
  data () {
    return {
      keyWordParam: '富足',
      result: [],
      snackbar: false
    }
  },
  computed: {
    limitList () {
      return this.result.slice(0, 10)
    }
  },
  methods: {
    search () {
      if (!this.keyWordParam) {
        this.snackbar = true
        return
      }
      this.$axios(`/free-style/${this.keyWordParam}/single`).then(res => {
        if (res.state === 1000) {
          this.result = res.data
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.c-wrapper
  position relative
  .primary--btn
    background-color #555
    color #ffffff
    width 100%
  .btn
    margin 0
</style>

