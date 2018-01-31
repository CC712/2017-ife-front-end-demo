const express = require('express')
const router = express.Router()
const db = global.resolvePath('server/db.js')
var ndb = db.getDB()
const cache = require('../cache/cache')
// player in game handler 
/*
 * player in room  对接 control 实际上就是 单机的 control
 *  player do then model change its state
 */
router.get('/', (req, res, next) => {
  console.log('**** model get all ****')
  res.send({
    code: 1,
    msg: 'get all players',
    data: req.room.model.players
  })
})

//add player
router.post('/:uid', function(req, res, next) {
  var uid = req.params.uid,
    room = req.room
  console.log('&& post player &&', req.params)

  if(room.model.findPlayer(uid)) {
    res.send({
      code: 2,
      msg: 'already in this room',
      data: room.model
    })
    return
  }

  //is_uid_valid = room.findPlayer(uid) find 这个函数式promise的，所以要then
  /* 
   * async function findPlayer(){}
   * await is_uid_valid = room.findPlayer(uid)
   * */
  if(room /*&&  is_uid_valid */ ) {

    room.model.insertPlayer(uid).then(_ => {
      res.send({
        code: 1,
        msg: 'join successfully',
        data: room.model
      })
    })

  } else {
    res.send({
      code: 0,
      msg: 'no such room or no such player'
    })
  }

})
//player can do  handler
router.post('/:uid/:fn', (req, res, next) => {
  var uid = Number(req.params.uid),
    fn = req.params.fn,
    args = req.body.args,
    troom = req.room
  var ndb = db.getDB()

  ndb.log(`player:${uid} ; ask for ${fn}, arguments ars ${args}`)
  // 是否是当前玩家，是否是当前 状态
  var state = troom.model.state,
    cur_player = troom.model.players[troom.model.pos]
  if(state !== 'turn' 
  ) {
    res.send({
      code: 0,
      msg: `invalid request for now [${state}]  state`
    })
    return
  }
  if(cur_player.uid != uid){
  	 res.send({
      code: 0,
      msg: `invalid player for now [${cur_player.uid}]  uid`
    })
    return
  }
  try {
    troom.model.playerFn(fn, uid, args)
    //model state change 
    troom.model.update()
    /* 有问题  buggy*/
    res.send({
      code: 1,
      msg: `player:${uid} ; ask for ${fn}, arguments ars ${args}`,
      data: troom.model
    })
  } catch(err) {
    console.log(err)
    res.send({
      code: 0,
      msg: 'fn error '
    })
  }
})
//
module.exports = router