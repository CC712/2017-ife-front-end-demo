var Texas = (function() {
  //0 -52   A K Q J 10 9 8 7 6 5 4 3 2    0%13= 52/4 = 13=>2  42/4 = 10 => 4 
  // TYPE   0 % 4 = 0黑桃 1红桃 2梅花3方片 
  // 底牌2 张 公共 5 张 选5张 组合
  //封装
  //游戏主函数
  function Texas() {
    //游戏流程 1坐人 2 盲注 3 发底牌 4 大盲注  clipPool = 最大 下一个 顺时针轮 加注or aban 5. 循环 直到 全部是一样的或者 showHand 
    //6 发三张公牌 7 小盲注开始 加注 循环到一样 8 	发第四张 9 循环表态 10 发第五张 11 循环表态 12 亮牌

    this.cardPool = []
    this.commomCard = []
    this.players = []
    //顺子

    /*
    //同花
    this.isFlush = function(hand){
    	//看有没有五张及以上的同花
    	let s = hand.sort((a,b)=>a.type - b.type).reduce((o,n,i)=>{
    		i < 3 && o.push(hand.slice(i,i+5))
    		return o
    	},[])
    	//验证
    	let sFlush = s.filter(x=>x.reduce((o,n,i)=>{
				i>0 && o=hand[i-1].type == n.type ? o:false
    		return o
			},true))
    }

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
  Texas.prototype = {
    init: function() {
      this.cardPool = []
      this.players = []
      for(let i = 0; i < 52; i++) {
        this.cardPool[i] = new Poker(i)
      }
      this.addPlayer()
      this.addPlayer()
    },
    dealToPlayers: function() {
      if(this.cardPool.length < this.players.length) return console.log('没牌了')
      this.players.forEach(p => p.addHand(this.cardPool.splice(Math.floor(Math.random() * this.cardPool.length), 1)[0]))
    },
    addPlayer: function() {
      if(this.players.length > 9) return console.log('人满了大哥')
      let p = new Player(`Player:${this.players.length}`)
      p.init()
      this.players.push(p)
      return p
    },
    rankHands: function() {
      this.players.sort((a, b) => {
        return this.getHandVal(a) - this.getHandVal(b)
      })
    },
    validHand: function(player) {
      let hand = player.hand
      var isStraight = (hand) => {
        //选五张,3组
        let s = []
        hand.sort((a, b) => a.key - b.key)
        s = [hand.slice(0, 5), hand.slice(1, 5), hand.slice(2, 5)]
        //验证 每组
        let sStra = s.filter(x => x.reduce((o, n, i) => {
          if(i > 0) o = hand[i - 1].val - n.val == -1 ? o : false
          return o
        }, true))
        //保存顺子的组
        return sStra
      }
      var isTwoPair = (hand) => {
        //选对子
        let s = []
        hand.sort((a, b) => a.key - b.key)
        s = hand.slice(0)
        s = s.reduce((o, n, i) => {
          while(s.indexOf(n) >= 0) {
            o.push(s.splice(s.indexOf(n), 1))
          }

        }, [])
        //验证 每组
        let sTP = s.filter(x => x.reduce((o, n, i) => {
          if(i > 0) o = hand[i - 1].val - n.val == -1 ? o : false
          return o
        }, true))
        //保存顺子的组
        return sTP
      }
    }
  }
  return new Texas()
})()
Texas.init()