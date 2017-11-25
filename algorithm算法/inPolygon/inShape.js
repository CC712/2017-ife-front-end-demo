// 判断 点 是否在 一个 凸多边形内部
// 算法原理   点 与 每条边 组成的 三角形面积之和  = 原图 面积 时  内部 否则 外部 。
// 面积法
/*
*
*param array point 
*param array poly 
*return boolean true/false	
*/
// poly 里面的点是有规律的， 按顺序连线 然后首尾相连
function pointInPoly (poly, point) {
	// 求线段长度
	let lines = poly.reduce((o,n,i)=>{
		if (i + 1 < poly.length){
			o.push ([n, poly[i + 1]])
		}else{
			o.push([n, poly[0]])
		}
		return o
	},[])
	// 求面积和
	let originArea = sumAreas(poly[0],lines)
	let questArea = sumAreas(point,lines)
	console.log('origin:',originArea,' quest:',questArea)
	return originArea >= questArea
}
//求面积和
function sumAreas (point,lines) {
	//console.log('lines',lines)
	return lines.reduce((o,l)=>{
		let d = getDistance2Line(point, l)
		let length = getLengthOfLine(l)
		return o += getTriangleArea(d, length)
	},0)
}
//三个点
function getDistance2Line (point,line) {
	//k = Inf
	if( line[1][1] == line[0][1] || line[1][0] == line[0][0])
	{
		return Math.abs(line[1][1] == line[0][1]? 
		  point[0] - line[1][0]
		: point[1] - line[0][1])
	} 
	//k != Inf
	let p1 = point
	let length = getLengthOfLine(line)
	let k =( line[1][1] - line[0][1] ) / ( line[1][0] - line[0][0] )
	let b = line[1][1] - k * line[1][0]
	// 点到直线距离的公式
	let d =  Math.abs( p1[1] - k * p1[0] - b ) / Math.sqrt( 1 + Math.pow(k,2))
	//console.log(length , k ,b ,d)
	return d
}
function getLengthOfLine ([a, b]) {
	return Math.sqrt( Math.pow(a[1] - b[1], 2) + Math.pow(a[0] - b[0], 2))
}
function getTriangleArea(d, l){
	console.log('d',d,'l',l)
	return d * l / 2
}
//TDD
//let a = getLengthOfLine([[-1,1],[1,1]])
//let b = getDistance2Line([1,1],[[-1,0],[1,0]])
//let c = getTriangleArea(a,b)
var poly = [
  [-5, -5], [5, -5],
  [5, 5], [-5, 5]
];
var poly1=[
[-1,0],[1,0],
[0,Math.sqrt(3)]
]
console.time(1)
let d = pointInPoly(poly1,[0,1])
console.timeEnd(1)
console.log(d)