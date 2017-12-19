function Player(name,model) {
  this.el = null
  this.hand = []
  this.chip = 1000
  this.outChip = 0
  this.name = name
  this.model = model
  // 0 waiting 1 isTurn 2 dead 3 watching
  this.state = 0
}
Player.prototype = {
  init: function() {
    this.hand = []
    this.outChip = 0
  },
  // 这个是外挂接口
  changeChip: function(val) {
    this.chip += val
    this.model.notifyPlayersObs(this)
  },
  addHand: function(number) {
  	let pool = this.model.cardPool
  	for(;number >0;number--){
  		let poker = pool.splice(Math.floor(Math.random()*pool.length),1)[0]
    this.hand.push(poker)
   }
  	this.model.notifyPlayersObs(this)
  },
}
export default Player