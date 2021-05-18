import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

require('@/store/subscriber')

axios.defaults.baseURL = 'http://localhost:3000/api'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
var data = { token: localStorage.getItem('token') }

store.dispatch('auth/attempt', data)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
