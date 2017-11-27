// lazy load 
// [data-lazy]  => url   
var lazyLoad =(
function (window,document){
	let store = [],
	offset,
	throttle,
	timer
	
	var init = function(obj){
		let opt = obj || {}
		offset = opt.offset || 100
		throttle = opt.throttle || 250
		let nodes = document.querySelectorAll('[data-lazy]')
		for(let i = 0; i < nodes.length; i++)
			store.push(nodes[i])
		// deep copy 
		console.log(store.length)
		
		
	}
	
	var _inView = function(el){
		let box = el.getBoundingClientRect()
		let a =(box.top >=0 && box.left >=0 && box.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset) 
		console.log(a)
		return a
	}
	
	var _throttle = function(){
		clearTimeout(timer)
		console.log('throttle')
		timer = setTimeout(_check,throttle)
	}
	
	var _check = function(){
		for(let i = 0;i < store.length; i++) {
			let self = store[i]
			if (_inView(self)) {
				console.log('i',i)
				self.src = self.getAttribute('data-lazy')
				store.splice(i,1)
				i = i-1
			}
		}
	}
	if(document.addEventListener){
		window.addEventListener('scroll',_throttle,false)
	} else {
		window.attachEvent('onscroll',_throttle)
	}
	return {
		init,
		render:_throttle
	}
}

)(window,document);