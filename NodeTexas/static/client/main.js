import Model from './js/texas'
import Control from './js/controllor'
import ajax from '../ajax'
import sceneCache from './scene_view/all'
/* util */
var $ = (f, s = document) => s.querySelector(f)
/************************************/
//State Machine
//dependency reverse for scenes
var Game = function() {
  //this.model = Model
  //this.control = new Control(this.model)
  console.log(sceneCache)
  this.scene = sceneCache.s_login
	this.init()
}
Game.prototype.init = function() {
	console.log(this)
  //preload i dont think code like this is reasonable
}
Game.prototype.switchTo = function(scene_obj, args) {
  this.scene = scene_obj
  this.scene.use(args)
}
Game.prototype.backToLast = function (){
	this.scene = this.scene.backToLast()
}
var _game = new Game()
$('.back').addEventListener('click', function(){
	_game.backToLast()
})





//var _model = Model,
//_control = new Control(_model)
//_control.init()

// auto login 
var __host = `//localhost:8080`
var isLogin = false

var autoLogin = function() {
  ajax({
    url: __host + '/api/v1/login'
  }).then(r => {
    //  console.log('try login auto ', r)s
    if(r.success == true) {
      islogin = true
    }
    if(isLogin) {
      _game.switchTo(s_hall)
    }
  })
}
//autoLogin()
//if(isLogin) {
//$('.login').style.display = 'none'
//$('.table').style.display = 'none'
//}
//login by hand    use ajax
//room
//document.querySelectorAll('.hall-room').forEach(room => {
//room.addEventListener('click', (e) = > {
//  var el = e.target
//  el.style.borderColor = 'red'
//})
//})