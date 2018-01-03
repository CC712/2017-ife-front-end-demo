const util = require('util')
const path = require('path')
var log_path = path.resolve(__dirname, 'log')
var make_log = function(txt) {
  var now = new Date();
  var year = now.getFullYear();
  var month = Number(now.getMonth()) + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var str = util.format("[%d-%d-%d %d:%d:%d] INFO:%s\n", year, month, date, hour, minute, second, txt);
  //let info = {now,year,month,date,hour,minute,second,str}
  let info = {
  	time: now,
  	method: txt.split(":")[0],
    msg: txt
  }
  console.log(str)
  return info
}
global.log = make_log
module.exports = make_log
