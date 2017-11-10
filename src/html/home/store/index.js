import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import data from './modules/data'
import visual from './modules/visual'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		data,
		visual
	}
})