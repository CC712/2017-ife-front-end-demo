import Poker from './poker'
import Player from './player'
import arange from './10ChangeAlgorithem'
import valid from './valid'
import makehand from './testHands'
import scene from './scene'
import ajax from '../../ajax'
var Texas = (function() {
  //封装
  //游戏主函数
  function Texas() {
    //polling 轮训
    this.roomid = String('000000')

    this.polling
    var tik = 5000
//  this.polling = setInterval(() => {
//    ajax({
//      url: '//localhost:8080/api/v1/room/' + this.roomid
//    }).then(r => {
//      console.log('polling data get!', r.data.model)
//      var data = r.data ? r.data.model : {}
//      this.init(data)
//      console.log(this)
//    })
//  }, tik)

    //卡池
    this.cardPool = []
    //玩家
    this.players = []
    //NPC
    this.banker = new Player('Banker', this)
    this.banker.chip = 0
    this.banker.chippool = 0
    //观察者模式的池
    this.obsPool = {}
    //  
    this.state = 'start'
    this.stateMap = {}
    //session 
    this.aBlindChip = 4
    this.btn = 0
    //position 
    this.pos = undefined
    //obs

  }
  Texas.prototype = {
    close: function() {
      clearInterval(this.polling)
      console.log('exit this game and have a new model')
    },
    init: function(data) {
      var aa = {
        doing: () => {}
      }
      this.stateMap = {
        'start': aa,
        'turn': aa,
        'deal': aa,
        'end': aa,
      }
      //state machine init 
      if(data) {
      	//如果有新的数据 那么 通知View 干活
      	//实际上 应该参考mvvm 的diff 算法， 算出最小改变树，然后改变部分dom 而不是粗暴的改全部
      	// 先粗暴一点先
        for(let i in data){
        	//一些本地化数据 this.el 可能会不同
          this[i] = data[i] ? data[i]: this[i]
         }
        this.notifyObs('player')
        this.notifyObs('banker')
        this.notifyObs('ask')
      } else {
        this.notifyObs('banker')
      }
    },
    // 可以用策略模式精简一下才对 先放着 先实现先
    regObs(type, fn) {
      if(!Array.isArray(this.obsPool[type])) {
        this.obsPool[type] = []
      }
      this.obsPool[type].push(fn)
    },
    notifyObs() {

      let arg = Array.from(arguments).slice(0)
      let type = arg[0]
      arg = arg.reduce((o, n) => {
        o.push(n)
        return o
      }, []).slice(1)
      this.obsPool[type].forEach(f => f(...arg))
    }
    
  }
  return new Texas()
})()
export default Texas