import ajax from '../../ajax'
import msgCenter from '../msgCenter'
import Model from '../js/texas'
import Control from '../js/controllor'
//params
import Model from '../js/texas'
import Control from '../js/controllor'
var __host = `//localhost:8080`
var isLogin = false
var $ = (f, s = document) => s.querySelector(f)
var sceneCache = {}
var mc = msgCenter.getMc()

function sceneFactory(obj) {
  let ns = obj
  sceneCache[`s_${ns.name}`] = ns
  return ns
}

function Scene({
  name,
  last,
  el,
  cb,
  fn = function() {}
}) {
  this.name = name
  this.lastScene = last
  //dom  绑定 以及 获取数据
  this.callback = cb
  this.process = fn
  this.el = el
  //add to cache
  sceneFactory(this)
}
/*
 *  init addEventListener 
 */
Scene.prototype.init = function(g) {
  //cbload all listners and dom render 
  this.callback(g)
}
Scene.prototype.close = function(re) {
  this.el.style.display = 'none'
  //how to back to game ?
}
Scene.prototype.use = function(args) {
  //console.log('use',this.name)
  this.lastScene && this.lastScene.close()
  this.el.style.display = 'block'
  this.process(args)
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
  cb: function(game) {
    document.querySelector('.back').style.display = 'none'
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
        mc = msgCenter.getMc()
        if(r.code == 200) {
          alert('login success')
          //有个依赖顺序的问题 
          // s_hall 晚于这条函数生成
          // 怎么办？
          mc.notify('login', [uid])
          mc.notify('sceneSwitch', ['s_hall'])
          return r
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
  trans = _ => _
) {
  //	console.log('res',resource)
  resource.forEach(r => {
    var d = document.querySelector('div[data-type=cache]') || document.createElement('div')
    d.setAttribute('data-type', 'cache')
    d.style.display = 'none'
    var nr = document.createElement('div')
    fa.appendChild(nr)
    nr.innerHTML = template
    nr.appendChild(d)

    for(let i in r) {
      var k = document.querySelector(trans(i))
      if(k) {
        k.innerText = r[i]
      } else {
        d.setAttribute(`data-${i}`, r[i])
      }
    }

  })
}

var s_hall = new Scene({
  name: 'hall',
  last: s_login,
  el: $('.hall'),
  cb: function(game) {
 $('.hall-list').innerHTML = ''

  },
  fn: function() {
  	 // 提前渲染
  	 //model
    var hall = {
      el: $('.hall-list'),
      isShow: false,
      rooms: []
    }
    hall.el.innerHTML = ''
    // control mix view 
    //template
    var template = `<div class="hall-room hall-room.waiting">
					<h2 class="hall-title">title default</h2>
					<p class="hall-abstract">abstract default</p>
					<span class="hall-players">1</span>
					<p class="hall-state">游戏中</p>
				</div>`
    //get room data

    ajax({
        url: '//localhost:8080/api/v1/room/'
      })
      .then(r => {
        if(r.data) {
          hall.rooms = r.data
          hall.rooms.forEach(item => {
            var nd = document.createElement('li')
            hall.el.appendChild(nd)
            simpleTextRender(nd, hall.rooms, template, function(classname) {
              return `.hall-${classname}`
            })
            // click handler and render 
            var roomsEl = hall.el.querySelectorAll('li')
            roomsEl.forEach(r => {
              r.addEventListener('click', (e) => {
                var id = r.querySelector('[data-type=cache]').getAttribute('data-id')
                mc.notify('sceneSwitch', ['s_stage'])
                mc.notify('enterRoom', [id])
              }, false)
            })
          })

        } else {
          alert('房间不存在')
        }
      })
  }
})
/*
 * btn and dom in the scene object
 * object Game maintain all scenes 
 * Game also maintain an object called model 
 * this model is represented the Texas model 
 * got from backEnd.
 * 
 * To seperate dom and model, use the midiator mode
 * 
 */
var s_stage = new Scene({
  name: 'stage',
  last: s_hall,
  el: document.querySelector('.stage'),
  cb: function() {
    //会多次绑定 是
    document.querySelector('.stage-startBtn').addEventListener('click', function() {
      //
      console.log('click start btn')
      //分情况 Game 维护了uid 信息 最顶层 notify 通信
      mc.notify('pressStart')
    })
    
  },
  fn: function(data) {
		 this.model = Model
		 this.control = new Control(this.model)
		 this.control.init(data)
		 
     console.log('now goes at stage runtime', this)
  }
})
export default sceneCache