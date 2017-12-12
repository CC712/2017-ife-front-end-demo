function desk(model) {
  this.model = model
  this.el = document.querySelector('.players')
  this.playerTemplate = `<div class="player">
			<p class='name'></p><p>剩余筹码:<span	 class='chip'></span></p>
			<p>下注筹码:<span	 class='outchip'></span></p>
			<div class='pokers'></div>	
			</div>`
	this.bankerTemplate = `<div class="banker">
			<p class='name'>庄家</p><p>池底:<span	 class='chippool'></span></p>
			<p>当前底注:<span	 class='chip'></span></p>	
			<div class='pokers'></div>	
			</div>`
	this.askTemplate = document.querySelector('.ask')
}
// 验证牌型 
desk.prototype.valid = function(ip) {
	if(ip){
		this.model.validHand(ip)
		return 
	}
  this.model.players.forEach(p => console.log(this.model.validHand(p)))
}
//初始化   控制器 这就是   model -> dom html  
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

//render banker 
desk.prototype.renderBanker = function(){
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
}
// 渲染 一个玩家的Dom
desk.prototype.renderOne = function(obj) {
  let dom = obj.el || document.createElement('div')
  dom.innerHTML = this.playerTemplate
  dom.querySelector('.name').innerText = obj.name
  dom.querySelector('.chip').innerText = obj.chip
  dom.querySelector('.outchip').innerText = obj.outchip
  
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
  this.renderBanker()
  this.model.players.map((player) => {
    this.renderOne(player)
    this.el.appendChild(player.el)
  })
}
//start
desk.prototype.start = function(){
	//创建玩家
	this.model.start()
	this.renderBanker()
	//游戏开始
  this.model.update.start()
  this.renderAll()
	this.next()
}
desk.prototype.showAsk = function(nowdom){
	console.log('desk ask')
	let dom = this.askTemplate
	nowdom.appendChild(dom)
}
desk.prototype.next = function (e){
	this.model.update.next()
	let ps = this.model.update.alivePlayers
	let nowPos = this.model.update.nowPos
	let npdom = ps[nowPos].el
	ps.forEach(p=>p.el.style.border = '')
	npdom.style.border = '2px solid black'
  this.renderAll()
	this.showAsk(npdom)
  
}
//btns handlers
desk.prototype.btnsHandler = function(e){
	let method = e.target.getAttribute('class').split('_')[1]
	let pos = this.model.update.nowPos
	let player = this.model.update.alivePlayers[pos]
	if(method){
		this.model.update[method] && this.model.update[method](player)
		this.renderAll()
		this.next()
	}
}
export default desk