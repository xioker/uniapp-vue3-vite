
function request({method, url, data, header, timeout = 6000, loading = false}){
	return new Promise((resolve,reject) => {
		loading && uni.loading({ title: '加载中', mask: true })
		header.token = 'token'
		uni.request({
			method,
			url: import.meta.env.VITE_BASE_URL + url,
			data,
			header,
			timeout,
			success: (res) => {
				const { code, data, message } = res.data || {}
				// switch (res.status){
				// 	case value:
				// 		break;
				// 	default:
				// 		break;
				// }
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({title: '请求出错', icon: 'none', duration: 2000, mask: true})
				reject(err)
			},
			complete: ()=> loading && uni.hideLoading()
		})
	})
}

// 接口请求函数
export default http{
	function post({url, data, header = {'content-tpe':'application/json;charset=utf-8'}, loading}){
		return request({method:'POST', url, data, header,loading})
	},
	function get({url, data, header = {'content-tpe':'application/x-www-form-urlencoded'}, loading}){
		return request({method:'GET', url, data, header,loading})
	}
}

// 文件上传函数
export default uploadFile({url, filePath, formData = {}, loading = true, name = 'file' }){
	loading && uni.loading({ title: '上传中', mask: true })
	return new Promise((resolve,reject) => {
		uni.uploadFile({
			url: import.meta.env.VITE_BASE_URL + url,
			formData,
			filePath,
			name,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({title: '上传失败', icon: 'none', duration: 2000, mask: true})
				reject(err)
			},
			complete: () => loading && uni.hideLoading(),
		})
	})
}