function view(model, controllor) {
  this.model = model
  this.Controllor = controllor
  this.el = document.querySelector('body')
  this.playerTemplate = `<div class="player">
			<p class='name'></p><p>剩余筹码:<span	 class='chip'></span></p>
			<p>下注筹码:<span	 class='outChip'></span></p>
			<div class='pokers'></div>	
			<p>当前牌型:<span	 class='poker-val'></span></p>	
			</div>`
  this.bankerTemplate = `<div class="banker">
			<p class='name'>庄家</p><p>池底:<span	 class='chippool'></span></p>
			<p>当前底注:<span	 class='chip'></span></p>	
			<div class='pokers'></div>	
			</div>`
  this.askTemplate = document.querySelector('.ask')
  //regist obs
  this.model.regBankerObs(this.renderBanker.bind(this))
  this.model.regPlayerObs(this.renderAll.bind(this))
  this.model.regAskObs(this.renderAsk.bind(this))
}
view.prototype = {
	init : function() {
  let playerPart = this.el
  
  playerPart.querySelector('.addPlayer').addEventListener('click', () => {
    this.Controllor.addPlayer()
  })
  playerPart.querySelector('.init').addEventListener('click', () => {
    this.Controllor.init()
  })
  playerPart.querySelector('.valid').addEventListener('click', () => {
    this.Controllor.valid()
  })
  playerPart.querySelector('.start').addEventListener('click', () => {
    this.Controllor.start()
  })
  playerPart.querySelector('.continue').addEventListener('click', () => {
    this.Controllor.start()
  })
  playerPart.querySelector('.ans-btn').addEventListener('click', () => {
    this.Controllor.next()
  })

  playerPart.querySelectorAll('.sel button').forEach(x => x.addEventListener('click', (e) => {
    this.Controllor.btnsHandler(e)
  }))
}
	,
  renderBanker: function() {
    let obj = this.model.banker
    let dom = obj.el || document.createElement('div')
    dom.innerHTML = this.bankerTemplate
    dom.querySelector('.name').innerText = obj.name
    dom.querySelector('.chippool').innerText = obj.chippool
    dom.querySelector('.chip').innerText = obj.chip
    obj.hand.sort((a, b) => a.key - b.key)
    obj.hand.forEach((p) => {
      let card = document.createElement('span')
      card.setAttribute('class', `poker-${p.type}`)
      card.innerText = `${p.cardFace}`
      dom.querySelector('.pokers').appendChild(card)
    }, )
    obj.el = dom
    document.querySelector('.banker').appendChild(obj.el)
  },
  renderOne: function(obj) {
    let dom = obj.el || document.createElement('div')
    dom.innerHTML = this.playerTemplate
    dom.querySelector('.name').innerText = obj.name
    dom.querySelector('.chip').innerText = obj.chip
    dom.querySelector('.outChip').innerText = obj.outChip
    obj.pokerVal = this.model.validHand(obj)
    dom.querySelector('.poker-val').innerText = obj.pokerVal[2] + '=》' + obj.pokerVal[1]

    obj.hand.sort((a, b) => a.key - b.key)
    obj.hand.forEach((p) => {
      let card = document.createElement('span')
      card.setAttribute('class', `poker-${p.type}`)
      card.innerText = `${p.cardFace}`
      dom.querySelector('.pokers').appendChild(card)
    }, )
    obj.el = dom
    this.el.querySelector('.players').appendChild(obj.el)
  },
  renderAll: function() {
    this.renderBanker()
    this.model.players.map((player) => {
      this.renderOne(player)
      this.el.querySelector('.players').appendChild(player.el)
    })
  },
  renderAsk: function(player,bool) {
    console.log('Controllor ask')
    let dom = this.askTemplate
		    
    player.el.appendChild(dom)
    debugger
    if(bool !== false){
    dom.style.display = 'flex'
    }
  },
  
}
export default view