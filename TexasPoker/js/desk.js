function desk(model) {
  this.model = model
  this.el = document.querySelector('.players')
  this.playerTemplate = `<div class="player">
			<p class='name'></p>
			<div class='pokers'></div>	
			</div>`
	
}
// 验证牌型 
desk.prototype.valid = function(player) {
  this.model.players.forEach(p => console.log(this.model.validHand(p)))
}
//初始化   mvc 
desk.prototype.init = function() {
  this.el.innerHTML = ''
  this.model.init()
  this.renderAll()
}
// 增加玩家
desk.prototype.addPlayer = function() {
  let newplayer = this.model.addPlayer()
  this.renderOne(newplayer)
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
// 渲染全部玩家的 dom
desk.prototype.renderAll = function() {
  this.model.players.map((player) => {
    this.renderOne(player)
    this.el.appendChild(player.el)
  })
}