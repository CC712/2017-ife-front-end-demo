import TexasView from './view'
function Controllor(model) {
  this.model = model
  this.view = new TexasView(this.model, this) 
}
// 验证牌型 
Controllor.prototype.valid = function(ip) {
	if(ip){
		this.model.validHand(ip)
		return 
	}
  this.model.players.forEach(p => console.log(this.model.validHand(p)))
}
//初始化   控制器 这就是   model -> dom html  
Controllor.prototype.init = function(isTest) {
  this.model.init(isTest)
  this.view.init()
  console.log('init')
}
// 增加玩家
Controllor.prototype.addPlayer = function() {
  let newplayer = this.model.addPlayer()
  //this.view.renderOne(newplayer)
}
//start
Controllor.prototype.start = function(){
	//创建玩家
	this.model.init()
	console.log('control start')
	//游戏开始
	this.model.update()
}
Controllor.prototype.btnsHandler = function(e){
	let target = e.target
	let method = target.getAttribute('data-btn')
console.log('btn press','===',this.model.pos)
this.model['btn_'+method]()
	console.log('可以往下了')
	this.model.update()
}

export default Controllor