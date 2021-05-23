export default function $http(options) {
	const {
		url,
		data
	} = options
	const dataObj = {
		user_id:'60a27cb24b9480000118e97f',
		...data
	}
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: url,
			data:dataObj
		}).then((res) => {
			if (res.result.code === 200) {
				//  .then
				resolve(res.result)
			} else {
				// .catch
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
}