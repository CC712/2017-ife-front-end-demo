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
//[ 1，2，3，2，1] =〉 [0,1,2,1,0] 右边比自己小的个数
// [5,4,3,2,1] => [4,3,2,1,0]
function get () {
	// nlogn is better
	// can i ?  for i => for k > i   n^2
	let s = []
	
	
}
