// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from './http'
import Vuetify from 'vuetify'

Vue.config.productionTip = false

// UI库
Vue.use(Vuetify)
// http请求库
Vue.use(Axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
