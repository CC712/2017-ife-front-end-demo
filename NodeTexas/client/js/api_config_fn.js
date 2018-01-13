import api_url from './api_url.json'
function make_api( url){
	let fns = ['valid',
		'init',
		'addPlayer',
		'update',
		'btn_follow',
		'btn_add',
		'btn_allin',
		'btn_fold'
	]
	let re = {}
	fns.forEach(fn=>re[fn] = url + '/'+fn)
	return re
}
var url = '127.0.0.1/api'
exports default make_api(url)

