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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_desk__ = __webpack_require__(7);



console.log(__WEBPACK_IMPORTED_MODULE_0__js_texas__["a" /* default */])
var Desk = new __WEBPACK_IMPORTED_MODULE_1__js_desk__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__js_texas__["a" /* default */])
Desk.init()
document.querySelector('.addPlayer').addEventListener('click', () => {
  Desk.addPlayer()
})
document.querySelector('.dealAll').addEventListener('click', () => {
 Desk.deal()
})
document.querySelector('.init').addEventListener('click', () => {
  Desk.init()
})
document.querySelector('.valid').addEventListener('click', () => {
  Desk.valid()
})
document.querySelector('.start').addEventListener('click', () => {
  Desk.start()
})

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__poker__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__10ChangeAlgorithem__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__valid__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__testHands__ = __webpack_require__(6);





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
 		this.banker = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]('Banker',this)
 		//
  }
  Texas.prototype = {
    init: function(isTest) {
    	//初始化
      this.cardPool = []
      //this.players = []
      this.banker.hand = []
      for(let i = 0; i < 52; i++) {
        this.cardPool[i] = new __WEBPACK_IMPORTED_MODULE_0__poker__["a" /* default */](i)
      }
      //初始化玩家手牌
       this.players.forEach(p=>p.init())
      //测试玩家
      if(isTest){
      	let tp = this.players[0] || this.addPlayer()
      	tp.hand = Object(__WEBPACK_IMPORTED_MODULE_4__testHands__["a" /* default */])(4)
      	this.cardPool = this.cardPool.filter(x=>{
      		let fg = true
      		tp.hand.forEach(k=>{
      			 fg = k.key == x.key ? false : fg 
      		})
      		return fg
      	})
      }
     
    },
    start:function () {
    	this.init()
    	//发牌 发公牌
    	this.banker.addHand(3)
    	this.players.forEach(p=>p.addHand(2))
    },
    dealToBank: function() {
      if(this.cardPool.length < 1) return console.log('没牌了')
      this.banker.addHand(1)
    },
    addPlayer: function() {
      if(this.players.length > 9) return console.log('人满了大哥')
      let p = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](`Player:${this.players.length}`,this)
      p.init()
      this.players.push(p)
      return p
    },
    rankHands: function() {
      this.players.sort((a, b) => {
        return this.getHandVal(a) - this.getHandVal(b)
      })
    },
    validHand: __WEBPACK_IMPORTED_MODULE_3__valid__["a" /* default */]
  }

  return new Texas()
})()
/* harmony default export */ __webpack_exports__["a"] = (Texas);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Player(name,game) {
  this.el = null
  this.hand = []
  this.chip = 0
  this.name = name
  this.game = game
}
Player.prototype = {
  init: function() {
    this.hand = []
  },
  changechip: function(val) {
    this.chip += val
  },
  addHand: function(number) {
  	let pool = this.game.cardPool
  	for(;number >0;number--){
  		let poker = pool.splice(Math.floor(Math.random()*pool.length),1)[0]
    this.hand.push(poker)
   }
  }
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
		
		let i = 0, ans = false
		while(i<methods.length && !ans){
			let m = methods[i]
			
			if(m(hand)) ans = [m(hand),i]
			console.log(m.name,'==>',ans)
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
function desk(model) {
  this.model = model
  this.el = document.querySelector('.players')
  this.playerTemplate = `<div class="player">
			<p class='name'></p>
			<div class='pokers'></div>	
			</div>`
	this.bankerTemplate = `<div class="banker">
			<p class='name'>庄家</p>
			<div class='pokers'></div>	
			</div>`
}
// 验证牌型 
desk.prototype.valid = function(ip) {
	if(ip){
		this.model.validHand(ip)
		return 
	}
  this.model.players.forEach(p => console.log(this.model.validHand(p)))
}
//初始化   mvc 
desk.prototype.init = function(isTest) {
  this.el.innerHTML = ''
  this.model.init(isTest)
  this.renderBanker()
  this.renderAll()
}
// 增加玩家
desk.prototype.addPlayer = function() {
  let newplayer = this.model.addPlayer()
  this.renderOne(newplayer)
}
//deal
desk.prototype.deal = function(){
	this.model.dealToBank()
	this.renderAll()
}
//start
desk.prototype.start = function(){
	this.model.start()
	this.renderAll()
}
//render banker 
desk.prototype.renderBanker = function(){
	let obj = this.model.banker
	 let dom = obj.el || document.createElement('div')
  dom.innerHTML = this.bankerTemplate
  dom.querySelector('.name').innerText = obj.name
  obj.hand.sort((a, b) => a.key - b.key)
  obj.hand.forEach((p) => {
    let card = document.createElement('span')
    card.setAttribute('class', `poker-${p.type}`)
    card.innerText = `${p.cardFace}`
    dom.querySelector('.pokers').appendChild(card)
  }, )
  obj.el = dom
  document.querySelector('.banker').appendChild(obj.el)
}
// 渲染 一个玩家的Dom
desk.prototype.renderOne = function(obj) {
  let dom = obj.el || document.createElement('div')
  dom.innerHTML = this.playerTemplate
  dom.querySelector('.name').innerText = obj.name
  obj.hand.sort((a, b) => a.key - b.key)
  obj.hand.forEach((p) => {
    let card = document.createElement('span')
    card.setAttribute('class', `poker-${p.type}`)
    card.innerText = `${p.cardFace}`
    dom.querySelector('.pokers').appendChild(card)
  }, )
  obj.el = dom
  this.el.appendChild(obj.el)
}
// 渲染全部玩家的 dom 包括庄
desk.prototype.renderAll = function() {
  this.renderBanker(	)
  this.model.players.map((player) => {
    this.renderOne(player)
    this.el.appendChild(player.el)
  })
}
/* harmony default export */ __webpack_exports__["a"] = (desk);

/***/ })
/******/ ]);