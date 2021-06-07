import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		historyLists: uni.getStorageSync('__history') || []
	},
	mutations: {
		SET_HISTORY_LIST(state, history) {
			state.historyLists = history
		},
		CLEAR_HISTORY(state, history) {
			state.historyLists = []
		}
	},
	actions: {
		set_history({
			commit,
			state
		}, history) {
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync('__history',list)
			commit('SET_HISTORY_LIST', list)
		},
		clearHistory({
			commit
		}) {
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		}
	}
})
export default store
