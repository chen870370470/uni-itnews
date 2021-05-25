import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		historyList:[]
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		}
	},
	actions:{
		set_history({commit,state},history){
			commit('SET_HISTORY_LIST',history)
		}
	}
})
export default store