/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
  function Poker(key) {
    this.key = key
    this.cardFace = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
    this.typeFace = ['♠', '♥', '♣', '♦']
    this.val = Number.parseInt(this.key / 4)
    this.type = this.key % 4
    return {
      cardFace: `${this.typeFace[this.type]} ${this.cardFace[this.val]}`,
      key: this.key,
      type:this.type,
      val:this.val
    }
  }
//class Poker {
//	constructor(key) {
//	this.key = key
//  this.cardFace = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
//  this.typeFace = ['♠', '♥', '♣', '♦']
//  this.val = Number.parseInt(this.key / 4)
//  this.type = this.key % 4
//  this.new()
//	}
//	static new(key) {
//		return this(key)
//	}
//}
  /* harmony default export */ __webpack_exports__["a"] = (Poker);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*  不重复的 m 个元素 选 n 个 
*	[a,b,c] 选 2    以数组对应的下标  的值作为 是否选择的标记   [1,0,1] => ac
*	110000  => 101000 => 100100 => 100010 => 100001
*	可见规律，寻找第一个 10 然后交换成 01    就是1向右移动 移到头 然后移第二个
*	
*/	
function arange (arr=['A','B','C'],num=2){
	let s = []
	let re = []
	
	
	
	
	for(let i =0;i<arr.length-num+1;i++){
		//移动首位
		for(let sl = 0;sl<arr.length;sl++){
		if(sl<num+i && sl>=i) s[sl]=1
		else s[sl]=0
		}
	re.push(s.join(''))
		for(let k =i+1;k<arr.length;k++){
			//查找 10
			if(s[k]==0 && s[k -1] ==1){
				//交换
				let t = s[k]
				s[k] = s[k-1]
				s[k - 1] = t
					re.push(s.join(''))
			} 
				
		}
			if(s[i]==0 && s[i -1] ==1){
				//交换
				let t = s[i]
				s[i] = s[i-1]
				s[i - 1] = t
					re.push(s.join(''))
			} 
	}
	return re.reduce((o,str)=>{
		//console.log(str)
		o.push(arr.filter((x,i)=>{
			//console.log(str.slice(i,i+1))
			return str.slice(i,i+1)!= 0}))
			return o
	},[])
}
/* unused harmony default export */ var _unused_webpack_default_export = (arange);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_texas__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_Controllor__ = __webpack_require__(8);




console.log(__WEBPACK_IMPORTED_MODULE_0__js_texas__["a" /* default */])
var Controllor = new __WEBPACK_IMPORTED_MODULE_1__js_Controllor__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__js_texas__["a" /* default */])
Controllor.init()

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__poker__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__10ChangeAlgorithem__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__valid__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__testHands__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scene__ = __webpack_require__(7);






var Texas = (function() {
  //封装
  //游戏主函数
  function Texas() {
    //卡池
    this.cardPool = []
    //玩家
    this.players = []
    //NPC
    this.banker = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]('Banker', this)
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
    init: function(isTest) {
    	//state machine init 
    	this.stateMap = {
    		'start' : new __WEBPACK_IMPORTED_MODULE_5__scene__["a" /* default */].scene_start(this),
    		'turn' : new __WEBPACK_IMPORTED_MODULE_5__scene__["a" /* default */].scene_turn(this),
    		'deal' : new __WEBPACK_IMPORTED_MODULE_5__scene__["a" /* default */].scene_deal(this),
    		'end' : new __WEBPACK_IMPORTED_MODULE_5__scene__["a" /* default */].scene_end(this),
    	}
      //初始化
      this.cardPool = []
      this.state = 'start'
      //this.players = []
      this.banker.init()
      this.banker.chippool = 0
      this.pos = undefined
      for(let i = 0; i < 52; i++) {
        this.cardPool[i] = new __WEBPACK_IMPORTED_MODULE_0__poker__["a" /* default */](i)
      }
      // 检查玩家数量
      while(this.players.length < 3) {
        this.addPlayer()
      }
      //初始化玩家手牌
      this.players.forEach(p => p.init())
      //测试玩家
      if(isTest) {
        let tp = this.players[0] || this.addPlayer()
        tp.hand = Object(__WEBPACK_IMPORTED_MODULE_4__testHands__["a" /* default */])(4)
        this.cardPool = this.cardPool.filter(x => {
          let fg = true
          tp.hand.forEach(k => {
            fg = k.key == x.key ? false : fg
          })
          return fg
        })
      }
      //notify banker
      this.notifyObs('banker')
    },
    update: function() {
				this.stateMap[this.state].doing()
				console.log('update',this.state)
    },
    //
    dealToBank: function() {
      if(this.cardPool.length < 1) return console.log('没牌了')
      this.banker.addHand(1)
      this.notifyObs('banker')
    },
    addPlayer: function() {
      if(this.players.length > 9) return console.log('人满了大哥')
      let p = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](`Player:${this.players.length}`, this)
      p.init()
      this.players.push(p)
      return p
    },
    rankHands: function() {
      this.players.sort((a, b) => {
        return this.getHandVal(a) - this.getHandVal(b)
      })
    },
    validHand: __WEBPACK_IMPORTED_MODULE_3__valid__["a" /* default */] // valid(player)
      ,
    // 可以用策略模式精简一下才对 先放着 先实现先
    regObs(type, fn) {
    	if(!Array.isArray(this.obsPool[type])) {
				this.obsPool[type] = []    		
    	}
    	this.obsPool[type].push(fn)
    }
    ,
    notifyObs(){
    	
    	let arg = Array.from(arguments).slice(0)
    	let type = arg[0]
    	arg = arg.reduce((o,n)=>{
    		o.push(n)
    		return o
    	},[]).slice(1)
    	this.obsPool[type].forEach(f => f(...arg))
    },
    //btnhandler
    //adapter for drop chips
    dropChip: function(p, num) {
      num = parseInt(num)
      p.outChip += num
      p.changeChip(0 - num)
      this.banker.chippool += num
      //console.log('now chippool', this.banker.chippool)
      this.notifyObs('banker')
      this.notifyObs('dropChip',p)
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
/* harmony default export */ __webpack_exports__["a"] = (Texas);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Player(name,model) {
  this.el = null
  this.hand = []
  this.chip = 1000
  this.outChip = 0
  this.name = name
  this.model = model
  // 0 moved 1 willmove 2 dead 3 watching
  this.state = 3
}
Player.prototype = {
  init: function() {
    this.hand = []
    this.outChip = 0
  },
  // 这个是外挂接口
  changeChip: function(val) {
    this.chip += val
    this.state = 0
  	this.model.notifyObs('player',this)
  },
  addHand: function(number) {
  	let pool = this.model.cardPool
  	for(;number >0;number--){
  		let poker = pool.splice(Math.floor(Math.random()*pool.length),1)[0]
    this.hand.push(poker)
   }
//	this.model.notifyPlayersObs(this)
  	this.model.notifyObs('player',this)
  },
}
/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = valid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__10ChangeAlgorithem__ = __webpack_require__(1);

function valid(player) {
      // 所有的判定方法均返回一个数组 [ [具体对象]，[可能性2]]
      let hand = player.hand.concat(this.banker.hand)
      hand.sort((a, b) => a.key - b.key)
      //顺子
      var isStraight = (hand) => {
        //选五张,3组 1234567 1123456 1112345
        let iValue = hand.map(x=>x.val)
        let re = []
        //dp find submission
        let s = []
        for(let i = 0; i < hand.length;i++){
        	let k = i
        	s= [hand[i]]
        	for(;k<hand.length;k++){
        		if(hand[k].val == s[s.length -1].val +1)
        		s.push(hand[k])
        	}
        	if(s.length > 4){
        		re.push(s.slice(0,5))
        		
        	}else if(s.length == 4 && ('dasdasd',s[3].val == 12 && iValue.indexOf(0) != -1)){
        		re.push(s.concat(hand.filter(x=>x.val==0)[0]))
        	}
        }
        return re.length>0 ? re[0]:false
      }
      //两对 
      var isTwoPair = (hand) => {
        //选对子
        let iValue = hand.map(x=>x.val)
        hand.sort((a, b) => a.key - b.key)
        let re = []
        let pairs = iValue.filter((x, i) => iValue.indexOf(x) !== iValue.lastIndexOf(x))
        pairs = [...new Set(pairs)]
        //如果两对以上，就是三对了
        if(pairs.length == 2) {
        	re = hand.slice(0).filter(x=>{
        		let f = false
        		pairs.forEach(v=>{
        			f = v !== x.val? f : true
        		})
        		return f
        	})
          //选择剩下的最大牌
          let rest =  hand.slice(0).filter(x=>{
        		let f = false
        		pairs.forEach(v=>{
        			f = v !== x.val? f : true
        		})
        		return !f
        }).sort((a,b)=>a.key - b.key).slice(0,1)
        re = re.concat(rest)
        }
        return re.length > 0  ? re : false
      }
      //三条
      var isThreeKind =(hand)=>{
      	let iValue = hand.map(x=>x.val)
        let re = [],rest=[]
        let tk= iValue.filter((x, i) => {
        	return iValue.indexOf(x) == iValue.lastIndexOf(x) -2
        }).slice(0,3)
        let tkVal = tk[0]
        //只要最大的
        re = hand.reduce((o, n)=>{
        	n.val == tkVal ?o.push(n):rest.push(n)
        	return o 
        },[])
        re = re.concat(rest.slice(0,2))
        return re[4] ? re : false
      }
      //葫芦
      var isHuLu = (hand) => {
      	if(isThreeKind(hand)){
      		let iv = hand.map(x=>x.val)
      		let p3 = iv.filter(x=>iv.indexOf(x) == iv.lastIndexOf(x)-2).slice(0,3)
      		let p2 = iv.filter(x=>x != p3[0])
      		let k = p2.filter((x,i)=>p2.indexOf(x) != p2.lastIndexOf(x)).sort().slice(0,2)
      			p2 = p2.filter(x=>x==k[0])
						p3 = p3.concat(k)
      			return p3[4] ? hand.filter(x => p3.indexOf(x.val) != -1).slice(0,5) : false  
      	}
      		return false
      }
      //同花
      var isFlush = (hand) => {
        //选择花色 遍历 
        let type = 0,
          re
        while((re = hand.filter(x => x.type == type)).length < 5) {
          type++
          if(type > 4) return false
        }
        return re.slice(0,5)
        //返回同花的数组 最大的一组就行了

      }
      //同花顺
      var isSF = (hand) => {
      	if(isFlush(hand) && isStraight(hand)){
      		//get Flush part 
      		  let type = 0,
          re
        while((re = hand.filter(x => x.type == type)).length < 5) {
          type++
          if(type > 4) return false
        }
        //get straight part
        return isStraight(re)
      	}
      	return false
      }
      //四条 炸弹 hand 是数组>对象s
      var isFour = (hand) => {
        let iValue = hand.map(x => x.val)
        let s = hand.filter((x, i) => iValue.indexOf(x.val) - iValue.lastIndexOf(x.val) <= -3)
        if(s.length >= 4) {
          let one = hand.filter(x => s.indexOf(x) == -1)[0]
          s.slice(0,4).push(one)
           console.log(s.slice(0,4),one)
           return s
        } else {
          return false
        }
      }
      //一对
      var isOnePair = (hand) => {
        let iValue = hand.map(x => x.val)
        let s = iValue.filter(x => iValue.indexOf(x) < 0)
        let re = []
        let pair = iValue.filter((x, i) =>iValue.indexOf(x) != iValue.lastIndexOf(x)  )
        let res = iValue.filter(x=>pair.indexOf(x) == -1)
        if(pair.length>0){
        	re = pair.concat(res.slice(0,3))
        	return hand.filter(x=>re.indexOf(x.val) >=0)
        }
        return false
      }
      //高牌
      var isNormal = (hand) => {
      	let iv = hand.map(x=>x.val)
       return hand.filter(x=>iv.indexOf(x.val) == iv.lastIndexOf(x.val)).slice(0,5)
      }
      
      //判断层级
		let methods = [isSF,isFour,isFlush,isStraight,isHuLu,isThreeKind,isTwoPair,isOnePair,isNormal]
		let translate2cn = ['同花顺','四张','同花','顺子','葫芦','三张','两对','一对','高牌']
		let i = 0, ans = false
		while(i<methods.length && !ans){
			let m = methods[i]
			
			if(m(hand)) ans = [m(hand),i,translate2cn[i]]
//			console.log(m.name,'==>',ans)
			i++
		}
		return ans
    }

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__poker__ = __webpack_require__(0);

var makehands = (seed)=>{
	let i = seed,re = []
	// i > 0  i <= 12
	//straight
	
	let randKey = k => 4 * k + ~~(Math.random()*4)
	/*
	for(let t = 0;t<7;t++){
		re.push(new Poker(randKey(i++)))
	}*/
	//2 pairs
	while(re.length<7){
		let t=0;
		let pl = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,]
		pl.forEach(x=>{
			re.push(new __WEBPACK_IMPORTED_MODULE_0__poker__["a" /* default */](randKey(x)))
		})
	}
	
	//random
	/*let t=0;
		let rval = ()=>~~(Math.random()*13)
	while(re.length<7){
			re.push(new Poker(randKey(12-re.length)))
	}*/
	return re 
}
/* harmony default export */ __webpack_exports__["a"] = (makehands);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class scene {
  constructor(model) {
    this.model = model
  }
  switchScene(s) {
    this.model.state = s
  }
  //interface 
  doing() {}
  goNext() {

  }
};
class scene_start extends scene {
  constructor(model) {
    super(model)
  }
  doing() {
    var that = this.model
    //发公牌
    that.banker.addHand(3)
    that.players.forEach(p => {
      p.addHand(2)
      p.state = 1
    })
    //盲注
    that.btn = ~~(Math.random() * that.players.length)
    that.plusPos(1)
    that.players[that.pos].state = 0
    that.dropChip(that.players[that.pos], 2)
    that.plusPos(1)
    that.players[that.pos].state = 0
    that.dropChip(that.players[that.pos], 4)
    //console.log('btn:', that.btn, that.pos)
    // update means next one or next situation
    that.plusPos(1)
    that.notifyObs('ask',that.players[that.pos])
    this.switchScene('turn')
  }
};
class scene_turn extends scene {
  constructor(model) {
    super(model)
  }
  doing() {
    var that = this.model
    //aliveplayers not enough
    let alivePlayers = that.players.filter(p => p.state == 1 || p.state == 0)
    //console.log('alivenum', alivePlayers.length)
    if(alivePlayers.length == 1) {
      alivePlayers[0].state = 0
      this.switchScene('end')
      that.update()
      return
    }
    //2 at less alive 
    let lastp = that.pos
    while(that.players[that.pos].state != 1) {
      that.plusPos(1)
      if(that.pos == lastp) {
        console.log('can go to deal', lastp, that.pos)
        this.switchScene('deal')
        that.update()
        return
      }
    }
    let p = that.players[that.pos]
    that.notifyObs('ask', p, 1)
    p.state = 0
  }
};
class scene_deal extends scene {
  constructor(model) {
    super(model)
  }
  doing() {
    var that = this.model
    that.dealToBank()
    if(that.banker.hand.length == 5) {
      // hide ask
      that.notifyObs('ask', that.players[that.btn], false)
      //next state
      this.switchScene('end')
      that.update()
      return
    }

    //deal 之后的 应该是 在 小盲的位置上  故 pos ++
    that.plusPos(1)
    that.players.forEach(p => {
      if(p.state == 0) p.state = 1
    })
    that.notifyObs('ask', that.players[that.pos	])
    this.switchScene('turn')
		
  }
};
class scene_end extends scene {
  constructor(model) {
    super(model)
  }
  doing() {
    var that = this.model
    console.log('hello end')
    // hide ask
    that.notifyObs('ask', that.players[that.btn], false)

    //winner
    let alivePlayers = that.players.filter(p => p.state == 0)
    let winner = alivePlayers[0]
    alivePlayers.forEach(p => {
      winner = p.pokerVal[1] < winner.pokerVal[1] ? p : winner
    })
    console.log(winner.name, '<==winner', winner.hand)
    //getchip 
    winner.changeChip(that.banker.chippool)
    //animate
    that.notifyObs('getChip', winner)
    this.switchScene('start')
  }
};
/* harmony default export */ __webpack_exports__["a"] = ({
	scene_start,
	scene_end,
	scene_turn,
	scene_deal
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__btn_handlers__ = __webpack_require__(10);



function Controllor(model) {
  this.model = model
  this.view = new __WEBPACK_IMPORTED_MODULE_0__view__["a" /* default */](this.model, this)
}
// 验证牌型 
Controllor.prototype.valid = function(ip) {
  if(ip) {
    this.model.validHand(ip)
    return
  }
  this.model.players.forEach(p => console.log(this.model.validHand(p)))
}
//初始化   控制器 这就是   model -> dom html  
Controllor.prototype.init = function(isTest) {
  this.model.init(isTest)
  let playerPart = this.view.el

  playerPart.querySelector('.start').addEventListener('click', () => {
    this.start()
  })
  playerPart.querySelectorAll('.sel button').forEach(x => x.addEventListener('click', (e) => {
    this.btnsHandler(e)
  }))
  console.log('init')
}
// 增加玩家
Controllor.prototype.addPlayer = function() {
  let newplayer = this.model.addPlayer()
}
//start
Controllor.prototype.start = function() {
  //创建玩家
  this.model.init()
  //view init
  this.view.init()
  this.view.renderChipField()
  console.log('control start', this.model.players)
  //游戏开始
    //button text  change
  	let btn = this.view.el.querySelector('button[class = start]')
  	btn.setAttribute('disabled','disabled')
  	btn.style.backgroundColor = '#ccc'
  	btn.innerText = '游戏中'
  this.model.update()
}
Controllor.prototype.btnsHandler = function(e) {
  let target = e.target
  let method = target.getAttribute('data-btn')
  console.log('btn press', '===', this.model.pos)
  __WEBPACK_IMPORTED_MODULE_1__btn_handlers__["a" /* default */][method].call(this.model)
  console.log('可以往下了')
  
  this.model.update()
  if(this.model.state == 'start'){
  	let btn = this.view.el.querySelector('button[class = start]')
  	btn.removeAttribute('disabled')
  	btn.style.backgroundColor = 'black'
  	btn.innerText = '开始游戏'
  }
}
//handler

/* harmony default export */ __webpack_exports__["a"] = (Controllor);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function view(model, controllor) {
  this.model = model
  this.Controllor = controllor
  this.el = document.querySelector('body')
  this.table = document.querySelector('.table')
  this.playerTemplate = `<div class="player">
			<p class='name'></p><p>剩余筹码:<span	 class='chip'></span></p>
			<p>下注筹码:<span	 class='outChip'></span></p>
			<div class='pokers'></div>	
			<p>当前牌型:<span	 class='poker-val'></span></p>	
			</div>`
  this.bankerTemplate = `
			<p class='name'>庄家</p><p>池底:<span	 class='chippool'></span></p>
			<p>当前底注:<span	 class='chip'></span></p>	
			<div class='pokers'></div>	
			`
  this.askTemplate = document.querySelector('.ask')
  //regist obs
  this.model.regObs('banker',this.renderBanker.bind(this))
  this.model.regObs('player',this.renderAll.bind(this))
	this.model.regObs('ask',this.renderAsk.bind(this))
	this.model.regObs('dropChip',this.dropChipAnimate.bind(this))
	this.model.regObs('getChip',this.getChipAnimate.bind(this))
}
view.prototype = {
	init : function() {
	this.table.innerHTML = ''
	console.log('chip init')
  
}
	,
  renderBanker: function() {
    let obj = this.model.banker
    let dom = obj.el || document.createElement('div')
    dom.innerHTML = this.bankerTemplate
    dom.querySelector('.name').innerText = obj.name
    dom.querySelector('.chippool').innerText = obj.chippool
    dom.querySelector('.chip').innerText = obj.chip
    obj.hand.sort((a, b) => a.key - b.key)
    obj.hand.forEach((p) => {
      let card = document.createElement('span')
      card.setAttribute('class', `poker-${p.type}`)
      card.innerText = `${p.cardFace}`
      dom.querySelector('.pokers').appendChild(card)
    }, )
    obj.el = dom
    document.querySelector('.banker').appendChild(obj.el)
  },
  renderOne: function(obj) {
    let dom = obj.el || document.createElement('div')
    dom.innerHTML = this.playerTemplate
    dom.querySelector('.name').innerText = obj.name
    dom.querySelector('.chip').innerText = obj.chip
    dom.querySelector('.outChip').innerText = obj.outChip
    obj.pokerVal = this.model.validHand(obj)
    dom.querySelector('.poker-val').innerText = obj.pokerVal[2] + '=》' + obj.pokerVal[1]

    obj.hand.sort((a, b) => a.key - b.key)
    // render poker
    obj.hand.forEach((p) => {
      let card = document.createElement('span')
      card.setAttribute('class', `poker-${p.type}`)
      card.innerText = `${p.cardFace}`
      dom.querySelector('.pokers').appendChild(card)
    }, )
    obj.el = dom
    if(obj.state == 2){
    	obj.el.setAttribute('class','folded')
    }else{
    	obj.el.removeAttribute('class')
    }
    this.el.querySelector('.players').appendChild(obj.el)
  },
  renderAll: function() {
    this.renderBanker()
    this.model.players.forEach((player) => {
      this.renderOne(player)
      this.el.querySelector('.players').appendChild(player.el)
    })
  },
  renderAsk: function() {
  	let player = arguments[0],
  	bool = arguments[1]
    console.log('ASK =>',player,bool)
    let dom = this.askTemplate || document.querySelector('.ask')
    player.el.appendChild(dom)
    if(bool !== false){
    dom.style.display = 'flex'
    }else{
    	dom.style.display = 'none'
    }
  },
  //render chipfield
  renderChipField: function(){
  	this.model.players.forEach(p=>{
		let field = document.createElement('div')
		field.setAttribute('class','chipField')
		p.chipField = field
		this.table.appendChild(field)
	})
  }
  ,
  //丢筹码动画效果	
  dropChipAnimate:function(player){
  	let chip = document.createElement('div')
  	chip.innerText = player.outChip - player.chipField.innerText
  	let wb = player.el.getBoundingClientRect(),
  			swb = this.table.getBoundingClientRect(),
  			x = wb.left - swb.left ,
  			y = swb.height/2
  	chip.style.left = x+'px'
  	chip.style.top = y + 'px'
  	chip.setAttribute('class','droppedChip dropping')
  	player.chipField.appendChild(chip)
  },
  //收筹码动画
  getChipAnimate : function (winner){
  	let chips = this.table.querySelectorAll('.droppedChip')
  	let wb = winner.el.getBoundingClientRect(),
  		sb = this.table.getBoundingClientRect(),
  			x = wb.left - sb.left,
  			y = wb.top - sb.top
  			console.log('get =>',x,y , sb)
  		//动画
  		chips.forEach(dom=>{
  			dom.style.left = x+'px'
 			 	dom.style.top = y + 'px'
  			dom.setAttribute('class','droppedChip getting')
  		})
  }

}
/* harmony default export */ __webpack_exports__["a"] = (view);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var follow = function() {
  let _chip = this.banker.chip
  this.dropChip(this.players[this.pos], _chip)
}
var add = function() {
  this.dropChip(this.players[this.pos], this.aBlindChip)
}

var allin = function() {
  this.dropChip(this.players[this.pos], this.players[this.pos].chip)
}

var fold = function() {
  this.players[this.pos].state = 2
  this.notifyObs('player')
}
/* harmony default export */ __webpack_exports__["a"] = ({
	fold,
	allin,
	add,
	follow
});


/***/ })
/******/ ]);