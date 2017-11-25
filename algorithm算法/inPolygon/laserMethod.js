function pointInPoly (poly, point) {
let lines = poly.reduce((o,n,i)=>{
		if (i + 1 < poly.length){
			o.push ([n, poly[i + 1]])
		}else{
			o.push([n, poly[0]])
		}
		return o
	},[])
		let x = point[0], y = point[1]
	return lines.reduce((o,l)=>{
		console.log(l)
		// x+1     y = y
	//if((y>=l[1][1]&&y<=l[0][1])||(y>=l[0][1]&&y<=l[1][1]))
		o += !!isCross(point, l)
		console.log('isc:',isCross(point,l))
		return o
	},0)%2 !== 0
}

function isCross (point,line) {
	 let y = point[1], x = point[0]
	//判断首点 是否在线段上方
	
	// T
	if(line[1][0] == line[0][0]&& x<line[1][0]){ 
	return line[0][1]>line[1][1]
	? line[0][1]>=y && y>=line[1][1] 
	: line[0][1]<=y && y<=line[1][1]
	}
	// //
	let xl = line[0][0]>line[1][0]?line[1][0]:line[0][0]
	if(line[1][1] == line[0][1]){
		return x<xl && y ==line[1][1]
	}
	// general
	if (isInRange(y,line[0][1],line[1][1])){
			let rex = getLineX(y,line)
			console.log(x,rex)
			return rex > x
	}
	return  false
}
function isInRange(x,n1,n2){
	let min = Math.min(n1,n2)
	let max = Math.max(n1,n2)
	return x>=min && x <= max
}
function getLineX(y,line) {
	//k = Inf
	let reX = 0
	//k != Inf
	let k =( line[1][1] - line[0][1] ) / ( line[1][0] - line[0][0] )
	let b = line[1][1] - k * line[1][0]
	console.log('k',k,b)
	reX = (y - b) / k
	return reX
}
let a = pointInPoly([[-1,0],[0,1],[1,0],[0,-1]],[-0.7,0.2])