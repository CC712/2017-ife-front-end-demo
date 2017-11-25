var theLift = function(queues, capacity) {
  let f = 0
  let ceil = queues.length
  let pil=[]
  let stop = []
  let d = 1
  let canStop = new Array(ceil).fill(false)
  stop.push(0)
  while(canStop.indexOf(false) != -1){
	  console.log("f:",f)
    let fq = queues[f]
	//console.log('fq:',fq)
    let pif = fq && fq.filter(x=>(x-f) * d>0)
	let ntf = fq && fq.filter(x=>x!=f)	
	//console.log('people w lift:',pif)
	if(ntf && ntf.length == 0) canStop[f] = true
	else canStop[f] = false
    if(pil.indexOf(f) != -1 || pif.length>0) {
    stop.push(f)
	//xiaren 
    while(pil.length<capacity && pif.length>0){
      pil.push(fq.splice(fq.indexOf(pif.shift()),1)[0])
	  //console.log('shangren:',pil)
    }
	//shangren
    while(pil.indexOf(f) != -1){
    fq.push(pil.splice(pil.indexOf(f),1)[0])
	//console.log('fangren :',pil)
	}
	
	}
    if(f + d >= ceil || f + d <0) d = -1 * d
    f += d
	
  }
  if(stop[stop.length -1] !== 0)stop.push(0)
  console.log('STOP',stop,pil)
  return stop
}
var queues = [
      [], // G
      [0], // 1
      [], // 2
      [], // 3
      [2], // 4
      [3], // 5
      [], // 6
    ];
	console.time(1)
    var result = theLift(queues,5);
 console.log(result)
 console.timeEnd(1)
