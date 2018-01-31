function view(model, controllor) {
  this.model = model
  this.Controllor = controllor
  this.el = document.querySelector('.stage')
  this.table = document.querySelector('.stage-table')
  this.playerTemplate = `<div class="player">
			<p class='name'></p><p>剩余筹码:<span	 class='chip'></span></p>
			<p>下注筹码:<span	 class='outChip'></span></p>
			<div class='pokers'></div>	
			<p>当前牌型:<span	 class='poker-value'></span></p>	
			</div>`
  this.bankerTemplate = `
			<p class='name'>庄家</p><p>池底:<span	 class='chippool'></span></p>
			<p>当前底注:<span	 class='chip'></span></p>	
			<div class='pokers'></div>	
			`
  this.askTemplate = document.querySelector('.stage-askBlock')
  //regist obs
  this.model.regObs('banker', this.renderBanker.bind(this))
  this.model.regObs('player', this.renderAll.bind(this))
  this.model.regObs('ask', this.renderAsk.bind(this))
  this.model.regObs('dropChip', this.dropChipAnimate.bind(this))
  this.model.regObs('getChip', this.getChipAnimate.bind(this))
}
view.prototype = {
  init: function() {
    this.table.innerHTML = ''
    console.log('chip init')

  },
  renderBanker: function() {
    let obj = this.model.banker
    let dom = document.querySelector('.stage-banker')
    dom.innerHTML = this.bankerTemplate
    dom.querySelector('.name').innerText = obj.name
    dom.querySelector('.chippool').innerText = obj.chippool
    dom.querySelector('.chip').innerText = obj.chip
    if(this.model.state !== 'start') {
      obj.hand.sort((a, b) => a.key - b.key)
      obj.hand.forEach((p) => {
        let card = document.createElement('span')
        card.setAttribute('class', `poker-${p.type}`)
        card.innerText = `${p.cardFace}`
        dom.querySelector('.pokers').appendChild(card)
      }, )
    }
  },
  renderOne: function(player) {
    var dom = document.querySelector(`[data-uid=uid${player.uid}]`) || document.createElement('div')
    console.log('renderOne:', player)
    dom.innerHTML = this.playerTemplate
    dom.setAttribute('data-uid', 'uid' + player.uid)
    dom.querySelector('.name').innerText = player.name
    dom.querySelector('.chip').innerText = player.chip
    dom.querySelector('.outChip').innerText = player.outChip
    // 		dom.querySelector('.poker-value').innerText = player.pokerValue[2] + '=》' + player.pokerValue[1]
    // render poker
    player.hand.forEach(p => {
      let card = document.createElement('span')
      card.setAttribute('class', `poker-${p.type}`)
      card.innerText = `${p.cardFace}`
      dom.querySelector('.pokers').appendChild(card)
    })
    player.el = dom
    if(player.state == 2) {
      player.el.setAttribute('class', 'folded')
    } else {
      player.el.removeAttribute('class')
    }
    this.el.querySelector('.stage-players').appendChild(player.el)
  },
  renderAll: function() {
    this.renderBanker()
    this.model.players.forEach(player => {
      this.renderOne(player)
    })
  },
  renderAsk: function() {
    var bool = this.model.state == 'turn'
    if(bool) {
      var players = this.model.players,
        p = players[this.model.pos || 0],
        el = this.el.querySelector(`.player [data-uid=uid${p.uid}]`)

        console.log('ASK =>', p, this.model.pos)
      let dom = this.askTemplate || document.querySelector('.stage-askBlock')
      appendedPlayer.appendChild(dom)

      dom.style.display = 'flex'
    }
  },
  //render chipfield
  renderChipField: function() {
    this.model.players.forEach(p => {
      let field = document.createElement('div')
      field.setAttribute('class', 'chipField')
      p.chipField = field
      this.table.appendChild(field)
    })
  },
  //丢筹码动画效果	
  dropChipAnimate: function(player) {
    let chip = document.createElement('div')
    chip.innerText = player.outChip - player.chipField.innerText
    let wb = player.el.getBoundingClientRect(),
      swb = this.table.getBoundingClientRect(),
      x = wb.left - swb.left,
      y = swb.height / 2
    chip.style.left = x + 'px'
    chip.style.top = y + 'px'
    chip.setAttribute('class', 'droppedChip dropping')
    player.chipField.appendChild(chip)
  },
  //收筹码动画
  getChipAnimate: function(winner) {
    let chips = this.table.querySelectorAll('.droppedChip')
    let wb = winner.el.getBoundingClientRect(),
      sb = this.table.getBoundingClientRect(),
      x = wb.left - sb.left,
      y = wb.top - sb.top
    console.log('get =>', x, y, sb)
    //动画
    chips.forEach(dom => {
      dom.style.left = x + 'px'
      dom.style.top = y + 'px'
      dom.setAttribute('class', 'droppedChip getting')
    })
  }

}
export default view