const db = global.resolvePath('server/db.js')
const Player = require('./logic/js/player')
const Poker = require('./logic/js/poker')
const scene = require('./logic/js/scene')
const valid = require('./logic/js/valid')
const makehand = require('./logic/js/testHands')
var ndb = db.getDB()
//游戏主函数
var model = function() {
  // 初始化本地数据

  //卡池 应当是对客户端不可见
  this.cardPool = []
  //玩家
  this.players = []
  //NPC
  this.banker = new Player({
  	name: 'Banker'
  }, this)
  this.banker.chip = 0
  this.banker.chippool = 0
  this.state = 'start'
  this.stateMap = {}
  //game params
  this.aBlindChip = 4
  this.btn = 0
  //position 
  this.pos = 0
  this.init()
}
model.prototype.init = function() {
  //state machine init 
  this.stateMap = {
    'start': scene.scene_start(this),
    'turn': scene.scene_turn(this),
    'deal': scene.scene_deal(this),
    'end': scene.scene_end(this),
  }
  //初始化

  this.cardPool = []
  this.state = 'start'
  //this.players = []
  this.banker.init()
  this.banker.chippool = 0
  this.pos = 0
  this.cardPool = new Array(52)
//this.cardPool.map((x, i) => new Poker(i))
//map and foreach will pass the invalid block
// also in of operate notation are the same
  for(let i = 0 ; i < 52;i++){
  	this.cardPool[i] = new Poker(i)
  }

  //初始化玩家手牌
  this.players.forEach(p => p.init())
  // this.update()
}
const playerFn = require('./playerFn')
model.prototype.playerFn = function(name, uid, args = []){
	var p = this.findPlayer(uid),
			fn = playerFn[name]
			console.log('% function %', name)
			fn.apply(this,args)
//			this.update()
}
// start 
model.prototype.start = function (){
	this.init()
	this.update()
}
model.prototype.update = function() {
  this.stateMap[this.state].doing()
  console.log('^ yes update do ^')
}
model.prototype.validHand = function() {
  this.players.forEach(p => p.Valid())
}
model.prototype.findPlayer = function (uid){
	return this.players.find(p => p.uid == uid)
}
model.prototype.insertPlayer = function(uid) {
	ndb = db.getDB()
  return ndb.find('player', {
    uid: Number(uid)
  }).then(r => {
  	console.log('insert confirm', r)
    typeof r == 'array' ? r = r[0] : r = r
    if(r.length > 0){
    	console.log('* get player uid *     ', uid , r)
    let p = new Player(r, this)
    p.uid = uid
    this.players.push(p)
    return true
    }
  })
}
model.prototype.removePlayer = function(uid) {
  let item = this.players.find(x => x.id == uid)
  if(item) {
    delete this.players[item]
  }
  if(this.players.length == 0) {
    //如果人数 == 0
    // 房间不删除
    db.log('该房间已经空')
  }
}
model.prototype.dropChip = function(p, num) {
  num = parseInt(num)
  p.outChip += num
  p.changeChip(0 - num)
  this.banker.chippool += num
}
//util
model.prototype.plusPos = function(num) {
  let pos = this.pos != undefined ? this.pos : this.btn
  pos = parseInt(pos)
  for(let i = 0; i < num; i++)
    pos = pos + 1 == this.players.length ? 0 : pos + 1
  this.pos = pos
  return pos
}

module.exports = model