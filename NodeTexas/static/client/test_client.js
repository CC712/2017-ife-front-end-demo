// token 自动登录
(function(){
	let _isLogin = document.cookie.isLogin,
		_token = document.cookie.token
	console.log('*COOKIES*',_isLogin,_token)
	// get 自动登录
	// url 或者 http 头 后端要求带 cookie
		ajax({
			url: '//localhost:8080/api/v1/login'
		}).then(r => {
			console.log('auto login:'+r)
		}).catch(r=>{
			console.log('error in auto login')
		})
})()
