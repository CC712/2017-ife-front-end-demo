// pre load 
// [data-pre]  => boolean true/false  
var preLoad = (function(window,document){
	var imgs = document.querySelectorAll('img')
	var _loadImg = new Image()
	_loadImg.src = './img/login_09.jpg'
	imgs.forEach(x=>{
		// 能重复用吗？ 不可以 一个图片对应一个 不可以的
		let midware = new Image()
		// loading
		let goal = x.src
		x.src = _loadImg.src
		//async handler
		midware.onload = function () {
			x.src  = midware.src
			console.log('预加载完成')
		}
		// do
		midware.src = goal
	})
})(window,document); 