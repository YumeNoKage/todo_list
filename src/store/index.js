import { createStore } from 'vuex'
import { 
	getData as getDataService,
	postData as postDataService,
	deleteData as deleteDataService
} from '../services/services'

export default createStore({
	state: {
		email: 'ericopratama2003@gmail.com'
	},
	mutations: {
	},
	actions: {
		async getData({commit}, data) {
			try {
				const response = await getDataService(data.url, data.params)
				return response
			} catch (error) {
				console.error(error)
			}
		},

		async postData({commit, state}, data) {
			try {
				let payload = {...data.params, ...state}
				const response = await postDataService(data.url, payload)
				return response
			} catch (error) {
				console.error(error)
			}
		},

		async deleteData({commit, state}, data) {
			try {
				let payload = {...data.params, ...state}
				const response = await deleteDataService(data.url, payload)
				return response
			} catch (error) {
				console.error(error)
			}
		}
	},
	modules: {
	}
})
