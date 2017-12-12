/*翻牌前（Pre-flop）：发出底牌后,公共牌出现以前的第一轮叫注阶段
 * 翻牌（Flop）：前三张公共牌。
 * 翻牌圈（Flop-round）：前三张公共牌出现以后的押注圈。
 * 转牌（Turn）：第四牌公共牌
 * 转牌圈（Turn-round）：第四张出现以后的押注圈
 * 河牌（River）：第五张公共牌
 * 河牌圈（River-round）:第五张出现以后的押注圈
 * */

function update(game) {
  //model layer
  this.game = game
  // updating manage
  this.nowPos = 0
  //chip manage
  // game state 1 playing 0 waiting
  this.state = 0
  // last winner
  this.lastWinner = null
  //alive players
  this.alivePlayers = []
}
// 确定庄家，赢的当庄 或者初始 随机 
update.prototype.chooseBtn = function() {
  if(!this.lastWinner) {
    //随机庄
    this.btn = ~~(Math.random() * this.game.players.length)
  } else if(this.players.indexOf(this.lastWinner) != -1) {
    this.btn = this.lastWinner
  }
}
// start 
update.prototype.start = function() {
	//random 庄家
  this.chooseBtn()
  this.nowPos = this.btn
  console.log('bug start',this.btn,this.nowPos)
  //config
  this.alivePlayers = this.game.players.slice(0)
  //ask smallblind
  let sb = prompt('小盲注 下多少？', 2) - 0
 //cal
  let banker = this.game.banker
  //sb
	this.plusPos(1)  
  this.alivePlayers[this.nowPos].chip -= sb
  this.alivePlayers[this.nowPos].outchip += sb
  //bb
  let bb = prompt('大盲注下多少? 可以加', 2 * sb) - 0
  bb = bb >= 2 * sb ? bb : sb * 2
	this.plusPos(1)  
  this.alivePlayers[this.nowPos].chip -= bb
  this.alivePlayers[this.nowPos].outchip += bb
	//cal banker
	banker.chip = bb
	banker.chippool = sb + bb
}
//loop 
update.prototype.plusPos = function (num){
	for(let i = 0;i<num;i++){
		console.log(num)
  this.nowPos = this.nowPos + 1 >= this.alivePlayers.length ? 0 :  this.nowPos+1 //++this.nowPos
 }
  console.log('plus',this.nowPos)
}
update.prototype.next = function() {
	// 是否下一轮
  //loop 条件 isAlive banker.hand.length != 5 
  let isContinue = this.game.banker.hand.length < 5 && this.alivePlayers.length > 1
  //loop
  if(isContinue) {
    let nowPlayer = this.game.players[this.nowPos]
    // 询问 跟 加注 放弃 同步的  断开 Updating  用 desk 的事件触发下一步
    //dom 操作 不能够完全在Model层操作了
    // 本轮 下一个人
    this.plusPos(1)
    console.log('compare=>',this.nowPos,this.btn)
    // 回到庄的位置
    if(this.nowPos === this.btn){

    	this.nextRound()
    }
  } else {
    //compare hands
    let winner = this.alivePlayers[0]
    this.alivePlayers.reduce((o,n)=>{
    	let nval = this.game.valid(n),
    		oval = this.game.valid(winner)
    	return nval[1] < oval[1] ? nval : oval
    },winner)
    //get winner
    
    this.lastWinner = winner
    //不区分边池 全收 
    winner.changechip(this.chipBottom)
    this.chipBottom = 0
    this.chip = 0
  }
}
//next round 
update.prototype.nextRound = function () {
	this.game.banker.addHand(1)
	console.log('new turn')
}
// btn handler 
update.prototype.follow = function(player) {
	
}
update.prototype.add = function(player) {
	let _chip = parseInt(prompt('add how many ?',0))
	player.chip -= _chip
	this.game.banker.chip += _chip
	player.outchip += _chip
	
	this.game.banker.chippool += _chip
	console.log('btnhandler')
}

export default update