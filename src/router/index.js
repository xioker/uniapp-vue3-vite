const PAGES = {
	'index': '/pages/index/index',
	'demo': '/pages/demo/index'
}

// 数据处理
function paramsDo(data){
	let str = ''
	for (let key in data) {
		let value = data[key]
		if (['', undefined, null].indexOf(value) >= 0) {
			continue
		}
		// 处理数组 对象 序列化
		if ([Array,Object].includes(value.constructor)) {
			value = JSON.stringify(value)
		}
		str += `${key}=${value}&`
	}
	return '?' + str.slice(0,-1)
}

export default function urlFormat(url, params = null){
	if(PAGES[url]) {
		return PAGES[url] + paramsDo(params)
	}
	return ''
}