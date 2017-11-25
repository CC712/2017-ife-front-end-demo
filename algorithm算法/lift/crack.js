function crack(login) {
	let pwd=[]
	let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()`~!@#$%^&*-+=|\{}[]:;"+'"'+"'<>,.?/"
	map = map.split('')
	//console.log(map.length)
	let i = 0
	//bfs 太慢 而且有问题  会重复？ 为什么？
	let queue = []
	queue = map.slice(0) 
	while(queue.length > 0){
		let n = queue.shift()
		console.log(n)
		for(let j =0;j<n.length;j++){
			if(login(n)){
				return n[j]
			} else {
				for(let k = 0; k < map.length; k++){
					let next = n[j]+map[k]
					console.log('next==>',next)
					queue.push(next)
				}
				
			}
		}
		
	} 
}
function login(pwd) {
	return pwd === '123woshishei'
}
let a = crack(login)
