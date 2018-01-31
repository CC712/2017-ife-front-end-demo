import TexasView from './view'
import btn_handlers from './btn_handlers'

function Controllor(model) {
	/*
	 *	
	 * login
	 *  | |
	 * hall
	 *	| |
	 * game
	 * 	
	 * */
  this.model = model
  this.view = new TexasView(this.model, this)
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
  this.model.init()
  let playerPart = this.view.el

  playerPart.querySelector('.stage-startBtn').addEventListener('click', () => {
    this.start()
  })
  playerPart.querySelectorAll('.stage-select button').forEach(x => x.addEventListener('click', (e) => {
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
  	let btn = this.view.el.querySelector('button[class = stage-startBtn]')
  	btn.setAttribute('disabled','disabled')
  	btn.style.backgroundColor = '#ccc'
  	btn.innerText = '游戏中'
}
Controllor.prototype.btnsHandler = function(e) {
  let target = e.target
  let method = target.getAttribute('data-btn')
  console.log('btn press', '===', this.model.pos)
  btn_handlers[method].call(this.model)
  console.log('可以往下了')
  
  if(this.model.state == 'start'){
  	let btn = this.view.el.querySelector('button[class = stage-startBtn]')
  	btn.removeAttribute('disabled')
  	btn.style.backgroundColor = 'black'
  	btn.innerText = '开始游戏'
  }
}
//handler

export default Controllor