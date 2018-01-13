const express = require('express')
const router = express.Router()
//handlers
const player_handler = require('./v1/player')
const login_handler = require('./v1/login')
const signUp_handler = require('./v1/signup')
// 导流 index的作用
var ApiHandler = function (){
	router.use('/player', player_handler)
	router.use('/signUp',signUp_handler)
	router.use('/login', login_handler)
	return router
}
module.exports = ApiHandler
