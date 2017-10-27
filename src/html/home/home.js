import 'babel-polyfill'
import Vue from 'vue'
import router from './router/router.js'
import App from './App'
import store from './store'
import iView from 'iview'
import 'assets/my-theme/home.less'

Vue.use(iView)

const bus = new Vue()
Vue.prototype.$bus = bus

new Vue({
	el: '#app',
  	store,
  	router,
	template: '<App/>',
	components: { App }
})