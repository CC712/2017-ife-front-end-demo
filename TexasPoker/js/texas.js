import Poker from './poker'
import Player from './player'
import arange from './10ChangeAlgorithem'
import valid from './valid'
import makehand from './testHands'
import update from './update'
var Texas = (function() {
  //0 -52   A K Q J 10 9 8 7 6 5 4 3 2    0%13= 52/4 = 13=>2  42/4 = 10 => 4 
  // TYPE   0 % 4 = 0黑桃 1红桃 2梅花3方片 
  // 底牌2 张 公共 5 张 选5张 组合
  //封装
  //游戏主函数
  function Texas() {
    //游戏流程 1坐人 2 盲注 3 发底牌 4 大盲注  chipPool = 最大 下一个 顺时针轮 加注or aban 5. 循环 直到 全部是一样的或者 showHand 
    //6 发三张公牌 7 小盲注开始 加注 循环到一样 8 	发第四张 9 循环表态 10 发第五张 11 循环表态 12 亮牌
    //卡池
    this.cardPool = []
    //玩家
    this.players = []
    //NPC
    this.banker = new Player('Banker', this)
    this.banker.chip = 0
    this.banker.chippool= 0
    //updating loop
    this.update = new update(this)
  }
  Texas.prototype = {
    init: function(isTest) {
      //初始化
      this.cardPool = []
      //this.players = []
      this.banker.hand = []
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

    },
    start: function() {
      this.init()
      //发牌 发公牌
      this.banker.addHand(3)
      while(this.players.length < 3) {
        this.addPlayer()
      }
      this.players.forEach(p => p.addHand(2))

    },
    dealToBank: function() {
      if(this.cardPool.length < 1) return console.log('没牌了')
      this.banker.addHand(1)
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
  }

  return new Texas()
})()
export default Texas