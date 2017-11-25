//reverse=a=>aaaaaaaaaaaaaaaaaaa
//rrrrrrrrrrrrrrrrrrrrrrrrrrrr
  //weirdReverse=a=>a.slice()[2]
//console.log(weirdReverse(['a','b','c','d']))
function multiply (a, b) {
	let as = a.replace(/^0+/,'').split('').reverse()
	let bs = b.replace(/^0+/,'').split('').reverse()
	let ans = []
	let n =0
	for(let j =0;j<bs.length;j++){
	for(let i = 0;i<as.length;i++){
		let m = ''
		if (!ans[i + j]) {
		m = `${(as[i] - 0)*(bs[j] - 0)}`
		} else {
		m = `${(ans[i+j]-0)+(as[i]-0)*(bs[j]-0)}`
		}
		console.log('m==>>',m,ans[i+j+1])
		ans[i + j] = m.length > 1 ? m.slice(-1) : m
		ans[j+i+1] = m.length > 1 ? 
			ans[j+i+1] ? `${(+ans[i+j+1])+(+m.slice(0,1))}`
					:m.slice(0,1)
			:ans[j+i+1] ? ans[i+j+1]
					:'0'
		
		console.log('No-->',i+j)
		console.log(ans,as[i],bs[j])
	}
	}
	return ans.reverse().join('').replace(/^0+/,'')||'0'
}
//let a =multiply('98765','56894')
let b = multiply('30','69')
console.log(b)