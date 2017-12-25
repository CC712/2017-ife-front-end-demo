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
    that.dropChip(that.players[that.pos], 2)
    that.plusPos(1)
    that.dropChip(that.players[that.pos], 4)
    //console.log('btn:', that.btn, that.pos)
    // update means next one or next situation
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
        //you go around and you find your self
        // every one made their desition
        // so that you can go to next state
        console.log('can go to deal', lastp, that.pos)
        this.switchScene('deal')
        that.update()
        return
      }
    }
    //you find meybe 1000 miles away after lastp
    let p = that.players[that.pos]
    //console.log(that.pos, '<===> player :', p.name)
    that.notifyObs('ask', p, 1)
    //next guy
    //already drop chip
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
    that.notifyObs('ask', that.players[that.btn])
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
  }
};
export default {
	scene_start,
	scene_end,
	scene_turn,
	scene_deal
}
