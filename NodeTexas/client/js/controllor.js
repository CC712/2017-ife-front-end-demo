import TexasView from './view'
import btn_handlers from './btn_handlers'

function Controllor(ajaxConfig) {
  var polling = null
  let self = this

  this.url = 'localhost:8080/api'

  //初始化

  // 轮询
  polling = setInterval((self) => {
    ajax(ajaxConfig).then((r) => {
      self.model = r
      self.view = new view(self.model, self)

    })
  }, 1000)

  //this.view = new TexasView(this.model, this)
}
// 验证牌型 
Controllor.prototype.valid = function(ip) {
  if(ip) {
    ajax({
      method: 'get',
      url: this.url + '/api/valid',
      data: ip
    }).then((m) => {
      this.model = m
      //数据驱动 view 也要有相应的变化
      this.model =
    })
    //  this.model.validHand(ip)
    return
  }
}

//初始化   控制器 这就是   model -> dom html  
Controllor.prototype.init = function(isTest) {

    this.model.init(isTest)
    console.log('init')
  },
  Controllor.prototype.update = function() {
    // differ old model and make change transition command

  }
// 增加玩家
Controllor.prototype.addPlayer = function() {
  let newplayer = this.model.addPlayer()
}
//start
Controllor.prototype.start = function() {
  //创建玩家
  this.model.init()
  //view init
  this.view.init()
  this.view.renderChipField()
  console.log('control start', this.model.players)
  //游戏开始
  //button text  change
  let btn = this.view.el.querySelector('button[class = start]')
  btn.setAttribute('disabled', 'disabled')
  btn.style.backgroundColor = '#ccc'
  btn.innerText = '游戏中'
  this.model.update()
}
Controllor.prototype.btnsHandler = function(e) {

}
//handler

export default Controllor