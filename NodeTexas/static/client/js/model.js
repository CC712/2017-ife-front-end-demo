var model = (function() {
  //封装
  //游戏主函数
  function model() {
    // 初始化本地数据
    ajax({
    	url : 'localhost:8080/'
    })

    //卡池
    this.cardPool = []
    //玩家
    this.players = []
    //NPC
    this.banker = new Player('Banker', this)
    this.banker.chip = 0
    this.banker.chippool = 0
    //观察者模式的池
    this.obsPool = {}
    //  
    this.state = 'start'
    this.stateMap = {}
    //session 
    this.aBlindChip = 4
    this.btn = 0
    //position 
    this.pos = undefined
    //obs
  }
  model.prototype.init = function() {

    //state machine init 
    this.stateMap = {
      'start': new scene.scene_start(this),
      'turn': new scene.scene_turn(this),
      'deal': new scene.scene_deal(this),
      'end': new scene.scene_end(this),
    }
    //初始化
    // 变成 ajax 请求增删改查

    this.cardPool = []
    this.state = 'start'
    //this.players = []
    this.banker.init()
    this.banker.chippool = 0
    this.pos = undefined
    for(let i = 0; i < 52; i++) {
      this.cardPool[i] = new Poker(i)
    }
    // 检查玩家数量
    //    while(this.players.length < 3) {
    //      this.addPlayer()
    //    }
    //初始化玩家手牌
    this.players.forEach(p => p.init())
    //测试玩家

    //notify banker
    this.notifyObs('banker')
  }
  // 可以用策略模式精简一下才对 先放着 先实现先
  model.prototype.regObs = function(type, fn) {
    if(!Array.isArray(this.obsPool[type])) {
      this.obsPool[type] = []
    }
    this.obsPool[type].push(fn)
  }
  model.prototype.notifyObs = function() {
    let arg = Array.from(arguments).slice(0)
    let type = arg[0]
    arg = arg.reduce((o, n) => {
      o.push(n)
      return o
    }, []).slice(1)
    this.obsPool[type].forEach(f => f(...arg))
  },
}
return new model()
})()
export default model