import model from './model'
import control from './controllor'


var control = new control(model)
// 应当先检查是否已经是注册用户
control.init()
//然后确认是否进入某个游戏，这个时候才开始生成 model

