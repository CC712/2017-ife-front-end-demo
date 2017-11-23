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
      // 所有的判定方法均返回一个数组 [ [具体对象]，[可能性2]]
      let hand = player.hand
      hand.sort((a, b) => a - b)
      //顺子
      var isStraight = (hand) => {
        //选五张,3组
        let s = []
        hand.sort((a, b) => a - b)
        s = hand.slice(0)
        let re = []
        //验证 每组
        let stack = []
        for(let i = 0; i < hand.length; i++) {
          if(stack.length == 0) stack.push(s[i])
          for(let j = i + 1; j < hand.length; j++) {
            if(stack.length == 5) {
              re.push(stack)
              stack = []
            }
            if(stack[stack.length - 1] - s[j] === -1) {
              stack.push(s[j])
            }
          }
          console.log(re)
        }
        //保存顺子的组
        return re
      }
      //两对 
      var isTwoPair = (hand) => {
        //选对子
        let s = []
        hand.sort((a, b) => a - b)
        let re = []
        s = arange(hand, 2)
        let pairs = s.filter((x, i) => s.indexOf(x) != i)
        //如果两对以上，选择大的
        if(pairs.length == 2) {
          let maxPair = arange(pairs, 2).sort((a, b) => a.reduce((o, i) => o + i, 0) - b.reduce((o, i) => o + i, 0))[0]
          //选择剩下的最大牌
          for(let i = 0; i + 2 <= maxPair.length; i++) {
            let one = hand.filter(x => maxPair.slice(i, i + 2).indexOf(x) == -1)[0]
            re.push(Array.prototype.concat(one, hand.filter(x => maxPair.indexOf(x) != -1)))
          }
        }
        return re
      }
      //同花
      var isFlush = (hand) => {
        hand.sort((a, b) => a - b)
        //选择花色 遍历 
        let type = 0
        while(type < 4 && hand.filter(x => x.type == type).length < 5)
          type++
          //返回同花的数组 可能大于5张
          return hand.length >4 hand.filter(x => x.type == type)
      }
      //四条 炸弹 hand 是数组>对象s
      var isFour = (hand) => {
        let iValue = hand.map(x => x.val)
        let s = hand.filter((x, i) => iValue.indexOf(x.val) - iValue.lastIndexOf(x.val) <= -3)
        if(s.length >= 4) {
          let one = hand.filter(x => s.indexOf(x) == -1)[0]
          return s.slice(0, 4).push(one)
        } else {
          return false
        }
      }
      return new Texas()
    }
  }
})() Texas.init()