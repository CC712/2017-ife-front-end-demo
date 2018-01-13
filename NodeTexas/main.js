import TexasModel from './js/texas'
import TexasControllor from './js/Controllor'


var Controllor = new TexasControllor(TexasModel)
// 应当先检查是否已经是注册用户
Controllor.init()
//然后确认是否进入某个游戏，这个时候才开始生成 model

