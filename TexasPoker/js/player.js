function Player(name) {
  this.el = null
  this.hand = []
  this.chip = 0
  this.name = name
}
Player.prototype = {
  init: function() {
    this.hand = []
  },
  changeClip: function(val) {
    this.clip += val
  },
  addHand: function(card) {
    this.hand.push(card)
  }
}