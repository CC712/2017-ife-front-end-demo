import Poker from './poker'
import Player from './player'
import arange from './10ChangeAlgorithem'
import valid from './valid'
import makehand from './testHands'
var Texas = (function() {
  //封装
  //游戏主函数
  function Texas() {
    //卡池
    this.cardPool = []
    //玩家
    this.players = []
    //NPC
    this.banker = new Player('Banker', this)
    this.banker.chip = 0
    this.banker.chippool = 0
    //updating loop
    //观察者模式的池
    this.playersObservers = []
    this.bankerObservers = []
    this.stateObservers = []
    this.askObservers = []
    // state 0 waiting 1 playing
    this.state = 0
    this.stateMap = ['start', 'turn', 'deal']
    //session 
    this.aBlindChip = 4
    this.btn = 0
    this.sb = 0
    this.bb = 0
    this.pos = undefined
    //obs
  }
  Texas.prototype = {
    init: function(isTest) {
      //初始化
      this.cardPool = []
      //this.players = []
      this.banker.hand = []
      this.pos = undefined
      this.sb = undefined
      this.bb = undefined
      for(let i = 0; i < 52; i++) {
        this.cardPool[i] = new Poker(i)
      }
      //初始化玩家手牌
      this.players.forEach(p => p.init())
      //测试玩家
      if(isTest) {
        let tp = this.players[0] || this.addPlayer()
        tp.hand = makehand(4)
        this.cardPool = this.cardPool.filter(x => {
          let fg = true
          tp.hand.forEach(k => {
            fg = k.key == x.key ? false : fg
          })
          return fg
        })
      }
      //notify
      this.notifyBankerObs()
    },
    start: function() {
      this.init()
      // 加入玩家
      while(this.players.length < 5) {
        this.addPlayer()
      }
      //发公牌
      this.banker.addHand(3)
      this.players.forEach(p => {
      	p.addHand(2)
      	p.state = 1
      })
      //盲注
      this.btn = ~~(Math.random() * this.players.length)
      this.sb = this.plusPos(1)
      this.players[this.pos].changeChip(-2)
      this.bb = this.plusPos(1)
      this.players[this.pos].changeChip(-4)
      this.plusPos(1)
      this.state++
      this.update()
      
    },
    //chip
    turn: function(p) {
      console.log(this.pos, '<===> player :', p)
      this.plusPos(1)
      console.log(this.players, this.pos)
      this.notifyAskObs(this.players[this.pos])
      
      if(this.pos == this.btn && p.state == 0) {
      	this.pos = this.btn
      	this.state++
      }
      p.state = 0
    },
    //state deal
    deal: function() {
      this.dealToBank()
      this.state = 1
      this.players.forEach(p=>{
      	if(p.state != 2 ) p.state = 0
      })
    },
    end : function () {
    	
    },
    update: function(arg) {
     console.log(arg,this.state,this[this.stateMap[this.state]],'after update')
    	this[this.stateMap[this.state]](arg)
    },
    //
    dealToBank: function() {
      if(this.cardPool.length < 1) return console.log('没牌了')
      this.banker.addHand(1)
      this.notifyBankerObs()
    },
    addPlayer: function() {
      if(this.players.length > 9) return console.log('人满了大哥')
      let p = new Player(`Player:${this.players.length}`, this)
      p.init()
      this.players.push(p)
      return p
    },
    rankHands: function() {
      this.players.sort((a, b) => {
        return this.getHandVal(a) - this.getHandVal(b)
      })
    },
    validHand: valid // valid(player)
      ,
    // 可以用策略模式精简一下才对 先放着 先实现先
    regPlayerObs: function(fnbind) {
      this.playersObservers.push(fnbind)
    },
    regBankerObs: function(fnbind) {
      this.bankerObservers.push(fnbind)
    },
    notifyPlayersObs: function(arg) {
      this.playersObservers.forEach(f => f(arg))
    },
    notifyBankerObs: function() {
      this.bankerObservers.forEach(f => f())
    },
    regAskObs: function(fnbind) {
      this.askObservers.push(fnbind)
    },
    notifyAskObs: function(arg) {
      this.askObservers.forEach(f => f(arg))
    },
    //btnhandler
    //adapter for drop chips
    dropChip: function(p, num) {
      num = parseInt(num)
      p.outChip += num
      p.changeChip(0 - num)
      this.banker.chippool += num
    },
    btn_follow: function(p) {
      let _chip = this.banker.chip
      this.dropChip(p, _chip)
    },
    btn_add: function(p) {
      //一个大盲
      this.dropChip(p, this.aBlindChip)
    },
    btn_allin: function(p) {
      this.dropChip(p, p.chip)
    },
    btn_fold: function(p) {
      //fold and dead
      this.state = 2
    },
    //util
    plusPos: function(num) {
      let pos = this.pos != undefined ? this.pos : this.btn
      pos = parseInt(pos)
      for(let i = 0; i < num; i++)
        pos = pos + 1 == this.players.length ? 0 : pos + 1
      this.pos = pos
      return pos
    }
  }
  return new Texas()
})()
export default Texas