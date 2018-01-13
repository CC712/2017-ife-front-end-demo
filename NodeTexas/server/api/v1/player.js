//router get
const express = require('express')
const router = express.Router()
const db = require('../../db')
// crud post get put delete
//get 为例 
var a = {
  name: 'route scope',
  time: new Date(),
  db: db,
  getdb: db.getDB()
}
router.get('/', function(req, res, next) {
  console.log('QUERY:', req.query)
  var uid = req.query.uid || 0
  uid = Number(uid)
  ndb = db.getDB()
  ndb.find('player', {
    'uid': uid
  }, {
    limit: 5
  }).then(r => {
    console.log('#find result#', r)
    if(r[0] == undefined) {
      res.send({
        success: false,
        msg: 'get nothing'
      })
    } else {
      res.send({
        success: true,
        msg: 'get',
        data: r
      })
    }
  })

})
router.post('/', function(req, res, next) {
  console.log(req.body)
  let uid = Number(req.body.uid)
  ndb = db.getDB()
  ndb.insert('player', {
    uid: uid,
    name: 'name_' + uid,
    chip: ~~(Math.random() * 10000)
  }).then(r => {
    res.send({
      success: true,
      msg: 'post',
      data: r
    })
  })
})
router.put('/', function(req, res, next) {
  var uid = Number(req.body.uid || 0),
    chip = Number(req.body.chip || 0)
  ndb = db.getDB()
  ndb.update('player', {
    uid: uid
  }, {
    $inc: {
      'chip': chip
    }
  }).then(r => {
    res.send({
      success: true,
      msg: 'put',
      data: r
    })
  })
})
router.delete('/', function(req, res, next) {
  var uid = req.query.uid || 0
  ndb = db.getDB()
  ndb.delete('player', {
    uid: uid,
  }).then(r => {
    res.send({
      success: true,
      msg: 'delet',
      data: JSON.stringify(r)
    })
  })
})
module.exports = router