import ajax from '../../ajax'
import Model from '../js/texas'
import Control from '../js/controllor'
var __host = `//localhost:8080`
var isLogin = false
var $ = (f, s = document) => s.querySelector(f)
var sceneCache = {}

function sceneFactory(obj) {
  let ns = obj
  sceneCache[`s_${ns.name}`] = ns
  return ns
}

function Scene({
  name,
  last,
  el,
  pre,
  fn = () => {}
}) {
  this.name = name
  this.lastScene = last
  //dom  绑定 以及 获取数据
  this.callback = pre
  this.el = el
  //add to cache
  sceneFactory(this)
}
Scene.prototype.init = function(g) {
  //preload all listners and dom render 
  this.callback(g)
}
Scene.prototype.close = function() {
  this.el.style.display = 'none'
}
Scene.prototype.use = function() {
  //console.log('use',this.name)
  this.lastScene && this.lastScene.close()
  this.el.style.display = 'block'
  this.fn()
}
Scene.prototype.backToLast = function() {
  if(this.last) {
    this.el.style.display = 'none'
    this.lastScene.use()
  }
  return this.lastScene
}
//specific scene processing
var s_login = new Scene({
  name: 'login',
  last: null,
  el: document.querySelector('.login'),
  pre: function(game) {
    console.log('callback done in login')
    // how a lowwer module modify a high module ?
    $('button[type = submit]', this.el).addEventListener('click', () => {
      var uid = $('#l_uid', this.el).value,
        pwd = $('#l_pwd', this.el).value
      console.log(uid, pwd)
      ajax({
        method: 'post',
        url: __host + '/api/v1/login',
        data: {
          uid: Number(uid),
          pwd: pwd
        }
      }).then(r => {
        if(r.code == 200) {
          alert('login success')
          game.switchTo(s_hall)
          console.log(r)
        } else {
          console.log('login situation ', r)
          alert(r.msg)
        }
      })
    })
  }
})

function simpleTextRender(
  fa,
  resource = [],
  template,
  trans = function() {}
) {
  resource.forEach(r => {
    var nr = document.createElement('div')
    nr.outerHTML = template
    for(let i in r) {
      if(nr.querySelector(trans(i)))
        nr.querySelector(trans(i)).innerText = r[i]
    }
    fa.appendChild(nr)
  })
}

var s_hall = new Scene({
  name: 'hall',
  last: s_login,
  el: $('.hall'),
  pre: function(game) {
    // 渲染多少个房间如何渲染？
    var hall = {
      el: $('.hall-list'),
      isShow: false,
      rooms: []
    }
    //template
    var template = `<li class="hall-room hall-room.waiting">
					<h2 class="hall-title">title default</h2>
					<p class="hall-abstract">abstract default</p>
					<span class="hall-players">1</span>
					<p class="hall-state">游戏中</p>
				</li>`
    //callback
    var cb = function() {
      var roomsEl = document.querySelectorAll('.hall-room')

      roomsEl.forEach(r => {
        r.addEventListener('click', (e) => {
          console.log('room click')
          game.switchTo(s_stage)
        })
      })
    }
    //get room data

    ajax({
        url: '//localhost:8080/api/v1/room/'
      })
      .then(r => {
        if(r.data) {
          hall.rooms = r.data
          simpleTextRender(document.querySelector('.hall-list'), hall.rooms, template, function(classname) {
            return `.hall-${classname}`
          })
        }
      })

  }
})

//var MsgCenter = function(){
//	this.pool = {}
//	this.regist = (key, fn)=>{
//		this.pool[key] ? this.pool.push(fn): this.pool[key] = [fn];
//	}
//	this.notify = (key, args = []) => {
//		this.pool[key] && this.pool.forEach(f => f.apply(args))
//	}
//}
//var mc = new MsgCenter()
var s_stage = new Scene({
  name: 'stage',
  last: s_hall,
  el: document.querySelector('.stage'),
  pre: function() {
    var _model = Model,
      _control = new Control(_model)
    //		mc.regist('clickRoom', _control.init)

  },
  fn: function() {

  }
})
export default sceneCache