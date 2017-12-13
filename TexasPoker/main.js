import Texas from './js/texas'
import desk from './js/desk'

console.log(Texas)
var Desk = new desk(Texas)
Desk.init()
document.querySelector('.addPlayer').addEventListener('click', () => {
  Desk.addPlayer()
})
document.querySelector('.dealAll').addEventListener('click', () => {
 Desk.deal()
})
document.querySelector('.init').addEventListener('click', () => {
  Desk.init()
})
document.querySelector('.valid').addEventListener('click', () => {
  Desk.valid()
})
document.querySelector('.start').addEventListener('click', () => {
  Desk.start()
})
document.querySelector('.continue').addEventListener('click', () => {
  Desk.start()
})
document.querySelector('.ans-btn').addEventListener('click', () => {
  Desk.next()
})

document.querySelectorAll('.sel button').forEach(x=>x.addEventListener('click', (e) => {
Desk.btnsHandler(e)
}))