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
  this.chip = 0
  this.chipBottom = 0
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
  //config
  this.alivePlayers = this.game.players
  let sbPos = this.nowPos + 1 >= this.game.players.length ? 0 : this.nowPos + 1
  let bbPos = sbPos + 1 >= this.game.players.length ? 0 : sbPos + 1
  //ask smallblind
  let sb = prompt('小盲注 下多少？', 2)
  let bb = prompt('大盲注下多少? 可以加', 2 * sb)
  bb = bb >= 2 & sb ? bb : sb * 2
  this.chip = bb
  //go loop
}
//loop 
update.prototype.loop = function() {
  this.nowPos = this.game.players.indexOf(this.btn) || 0
  //loop 条件 isAlive banker.hand.length != 5 
  let isContinue = this.game.banker.hand.length < 5 && this.alivePlayers.length > 1
  //loop
  while(isContinue) {
    let nowPlayer = this.game.players[this.nowPos]
    // 询问 跟 加注 放弃 同步的 需要阻塞updating
    this.ask(nowPlayer)
    // 下一轮
    if(this.nowPos == this.game.players.length) {
      this.nowPos = 0
    } else {
      this.nowPos++
    }
    //next
  }
  //get winner
  let winner = this.alivePlayers[0]
  this.lastWinner = winner
  //不区分边池 全收 
  winner.changechip(this.chipBottom)
  this.chipBottom = 0
  this.chip = 0
}
// ask 
update.prototype.ask = function(player) {
	if(this.chip>=player.chip){
	//没钱了 只能 all in  或者 fold
	
	}else{
	// 跟 allin  fold	
	}
}