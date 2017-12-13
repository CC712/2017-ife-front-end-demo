function Player(name,game) {
  this.el = null
  this.hand = []
  this.chip = 1000
  this.outchip = 0
  this.name = name
  this.game = game
}
Player.prototype = {
  init: function() {
    this.hand = []
    this.outchip = 0
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
export default Player