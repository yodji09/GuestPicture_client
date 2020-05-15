import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Paintable from 'vue-paintable'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Paintable, {
  setItem (key, image) {
    localStorage.setItem(key, image)
  },
  getItem (key) {
    return localStorage.getItem(key)
  },
  removeItem (key) {
    localStorage.removeItem(key)
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
