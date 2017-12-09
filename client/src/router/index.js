import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/free-style'
    },
    {
      path: '/free-style',
      component: r => { import('@/components/FreeStyle').then(r) }
    }
  ]
})
