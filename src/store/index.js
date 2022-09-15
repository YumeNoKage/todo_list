import { createStore } from 'vuex'
import { 
	getData as getDataService,
	postData as postDataService,
	deleteData as deleteDataService,
	updateData as updateDataService
} from '../services/services'

export default createStore({
	state: {
		email: 'ericopratama2003@gmail.com'
	},
	mutations: {
	},
	actions: {
		async getData({commit, state}, data) {
			try {
				let payload = {...data.params, ...state}
				const response = await getDataService(data.url, payload)
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
		},

		async updateData({commit, state}, data) {
			try {
				let payload
				if (data.params.activity_group_id) {
					payload = {...data.params}
				} else {
					payload = {...data.params, ...state}
				}
				const response = await updateDataService(data.url, payload)
				return response
			} catch (error) {
				console.error(error)
			}
		}
	},
	modules: {
	}
})
