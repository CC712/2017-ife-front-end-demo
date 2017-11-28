// animation 
// scroll and triggle
// [data-from] [data-leave-to]
//参考vue transition 标签的作用是 占位，因为动画运行的时候可能会导致 重绘 总之 其实不是很高效
/*
*初始 leave-to className
*触发 in className
* init origin active 
*from:
* origin active from (pop)  
*out: 
*  origin active leave-to (push)
*/
var PA = (function(window, document){
	let s = [],
		offset = 0,
		throttle = 250
	var init = (obj={}) => {
		let conf = obj
		offset = conf.offset || 100,
		throttle = conf.throttle || 150,
		timer = null
		let nodes = document.querySelectorAll('[data-trans-name]')
		s = Array.prototype.slice.call(nodes,0)
			s = s.map(node => {
			let transName = node.getAttribute('data-trans-name')
		    let nameMap = ['-active', '-from', '-leave-to']
			let reg = new RegExp(transName + nameMap[0])
			node.className += !node.className.match(reg) ? ` ${transName + nameMap[0]} ${transName + nameMap[2]}`: ''
			return {state: false, dom: node }
		})
		//console.log(s)
		_check()
	}
		var _inView = (el) =>{
			let box = el.getBoundingClientRect()
			console.log(box.top, window.innerHeight - offset)
			return box.top <= (window.innerHeight - offset)
		}
		var _goIn = (el) => {
			el.className = el.className.replace(/\w+-leave-to/,'')
			console.log('in',el.className)
		}
		var _goOut = (el) => {
			_goIn(el)
			let np = el.getAttribute('data-trans-name')
			el.className +=''+`${np+'-leave-to'}` 
		}
		var _throttle = ()=> {
			console.log('th')
			clearTimeout(timer)
			timer = setTimeout(_check, throttle)
		}
		var _check = () => {
			//很难  先要定性是 enter 还是 leave 需要保存这个状态
			//先不做那么大，先做进的
			s.forEach(i => {
					
				if(_inView(i.dom)){
					console.log(i)
					if(i.state === false){
						_goIn(i.dom)
						i.state = !i.state
					}
				}
				if(!_inView(i.dom) && i.state === true){
					_goOut(i.dom)
					i.state = !i.state
				}
			})
		}
		
		window.addEventListener('scroll', _throttle, false)
	
	return {
		init
	}
	
})(window, document);