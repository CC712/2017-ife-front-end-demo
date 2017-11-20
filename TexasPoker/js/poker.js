var Texas = (function() {
  //0 -52   A K Q J 10 9 8 7 6 5 4 3 2    0%13= 52/4 = 13=>2  42/4 = 10 => 4 
  // TYPE   0 % 4 = 0黑桃 1红桃 2梅花3方片 
  // 底牌2 张 公共 5 张 选5张 组合
  //封装

  //牌型

  function Poker(key) {
    this.key = key
    this.cardFace = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
    this.typeFace = ['♠', '♥', '♣', '♦']
    this.val = Number.parseInt(this.key / 4)
    this.type = this.key % 4
    return {
      cardFace: `${this.typeFace[this.type]} ${this.cardFace[this.val]}`,
      key: this.key
    }
  }
 function Player(name){
 	this.el=null
 	this.hand = []
 	this.chip = 0
 	this.name = name
 }
 Player.prototype={
 	init:function(){
 		this.hand=[]
 	},
 	changeClip:function(val){
 		this.clip += val
 	},
 	addHand:function(card){
 		console.log(this)
 		this.hand.push(card)
 	}
 }

  function Texas() { 
  	this.cardPool=[]
  	this.players = []
   /* //顺子
    var isStraight = (arr) => {
		this.arr.sort((a,b)=>a.key - b.key)
    }
    //同花
    var isFlush

    //四条
    var isFour
    //葫芦
    var isFH
    //三条
    var isThree
    //两队
    var isTwoPair
    //一对
    var isOnePair
    //高牌
    var isNormal
    */
  }
  Texas.prototype={
  	init:function(){
  		this.cardPool=[]
  	for(let i = 0; i < 52; i++) {
    	this.cardPool[i] = new Poker(i)
  	}
  	this.addPlayer()
  	this.addPlayer()
  },
   deal:function(){
   	return this.cardPool.splice(Math.floor(Math.random()*this.cardPool.length),1)
   },
   addPlayer:function(){
   	if(this.players.length>11) return console.log('人满了大哥')
   	let p = new Player(`Player:${this.players.length}`)
   	p.init()
   	this.players.push(p)
   }
  }
  return  new Texas()
})()
Texas.init()
