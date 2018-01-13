const assert = require('assert')
//router get
const express = require('express')
const router = express.Router()
const db = global.resolvePath('base_modules/db')
const jwt = require('jsonwebtoken')
//verify user by jwt
//token 登录 维持状态 
router.get('/', function(req, res, next) {
  console.log('auto login by token' )
  let token = req.cookies ? req.cookies.token : ''
  token = token || req.query.token
  if(!token) {
    res.send({
      success: false,
      msg: 'no token'
    })
    return
  }
  //jwt 验证
  try {
    var decoded = jwt.verify(token, 'ThisIsSecret'),
      uid = decoded.uid
  } catch(err) {
    res.send({
      msg: 'invalid token ,please relogin!'
    })
    return
  }
	console.log('token value',decoded)
  var ndb = db.getDB()
  ndb.find('player', {
    uid: uid
  }).then(r => {
  	
  	ndb.update('player',{
  		uid:uid
  	},{
  		$set : {lastLogin : new Date()}
  	})
  	
  	
    res.send({
      msg: 'successful verification!',
      uid: uid,
      lastLogin : r.lastLogin
    })
    
  })

})
//主动登录 首次
router.post('/', function(req, res, next) {
  console.log('**built token**', req.body)
  var uid = Number(req.body.uid),
    pwd = String(req.body.pwd)
  var new_token = jwt.sign({
    uid: uid,
    pwd: pwd
  }, 'ThisIsSecret', {
    expiresIn: '2m'
  })
  var ndb = db.getDB()
	
  // 登录		
  ndb.update('player', {
    uid: uid,
    pwd: pwd
  }, {
    $set: {
      token: new_token,
      lastLogin: new Date()
    }
  }).then((err, r) => {
    //jwt 储存为cookie  
    // 主动登录应刷新 client 的token expires and maxAge
    let domain = req.domain
    res.cookie("token", new_token, {
      domain: 'localhost',
      path: '/',
      maxAge: 1000 * 60 * 5
    })
    res.cookie('isLogin', true, {
      domain: 'localhost',
      path: '/',
      maxAge: 2 * 60 * 1000
    })
    res.send({
      code: 200,
      msg: 'valid auth! login success!',
      token: new_token
    })
  }).catch((err, r) => {
    console.log(err, r)
    res.send({
      code: 402,
      msg: 'invalid uid or password!'
    })
  })
})
module.exports = router