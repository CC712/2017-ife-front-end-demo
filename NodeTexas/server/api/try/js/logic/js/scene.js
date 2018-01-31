const db = global.resolvePath('server/db.js')

function switchScene(s, that) {
	console.log('state change from ',that.state,'to', s)
  that.state = s
}
// MODE; STATE MODEL STATE 
var scene_start = function(model) {
  return {
    doing: () => {
      var that = model
      //发公牌
      that.banker.addHand(3, that)
      that.players.forEach(p => {
        p.addHand(2, that)
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
      switchScene('turn', that)
    }
  }
}

var scene_turn = function(model) {
  return {
    doing: () => {
      var that = model
      //aliveplayers not enough
      var alivePlayers = that.players.filter(p => p.state == 1 || p.state == 0)
      //console.log('alivenum', alivePlayers.length)
      console.log('aliveplayer length =>',alivePlayers.length)
      if(alivePlayers.length == 1) {
        alivePlayers[0].state = 0
        switchScene('end', that)
        that.update()
        return
      }
      //2 at less alive 
      let lastp = that.pos
      while(that.players[that.pos].state != 1) {
        that.plusPos(1)
        if(that.pos == lastp) {
          console.log('can go to deal', lastp, that.pos)
          switchScene('deal', that)
          that.update()
          return
        }
      }
      let p = that.players[that.pos]
      p.state = 0
    }
  }
}
var scene_deal = function(model) {
  return {
    doing: () => {
      var that = model
      that.banker.addHand(1, that)
      if(that.banker.hand.length == 5) {
        // hide ask
        //next state
        switchScene('end', that)
        that.update()
        return
      }

      //deal 之后的 应该是 在 小盲的位置上  故 pos ++
      that.plusPos(1)
      that.players.forEach(p => {
        if(p.state == 0) p.state = 1
      })
      switchScene('turn', that)

    }
  }
}

var scene_end = function(model) {
  return {
    doing: () => {
      var that = model
      console.log('hello end')
      // hide ask

      //winner
      let alivePlayers = that.players.filter(p => p.state == 0)
      let winner = alivePlayers[0]
      //buggy
      alivePlayers.forEach(p => {
        winner = p.pokerValue[1] < winner.pokerValue[1] ? p : winner
      })
      console.log(winner.uid, '<==winner', winner.hand)
      //getchip 
      winner.changeChip(that.banker.chippool)
      //state
      switchScene('start', that)
      //db
			var ndb = db.getDB()
      for(let p of model.players){
      	ndb.update('player',{
      		uid: Number(p.uid),
      	}, {
      		$set : {chip: p.chip,
      		__lastGameTime :  new Date()
      		}

      	})
      }
    }
  }
}
/*
 *convert circle json 了
 * 解决办法是 改变循环引用
 *办法就是不能用类了
 * 柯丽化可以避免重复引用的问题，其实就是传参，感觉差了点味道
 * */

module.exports = {
  scene_start,
  scene_end,
  scene_turn,
  scene_deal
}