const fs = require('fs')
const util = require('util')
const path = require('path')
var log_path = path.resolve(__dirname, 'log')
var is_test = null

//user : { uid:123 ,   }
function make_log_name(user) {
  let now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth() + 1
  return [user.uid, year, month].join('_')
}
// 是否 有日志 的文件夹
function check_file(user, callback) {
  let p = path.resolve(log_path, user.uid.toString() + '.txt')
  //总文件夹
  fs.open(log_path, 'a', (err, fd) => {
    if(err) {
      if(err.code === 'ENOENT') {
        console.error('log file does not exist');
        fs.mkdirSync(log_path)
      }

      throw err;
    } else {
      fs.writeFile(p, make_log('一些没用的信息2'), {
        flag: 'a'
      }, (err) => {
        if(err) throw err
        else console.log('log success')
      })
    }

  });
}
exports.check_file = check_file
// 日志内容
function make_log(msg) {
  var now = new Date();
  var year = now.getFullYear();
  var month = Number(now.getMonth()) + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var str = util.format("[%d-%d-%d %d:%d:%d] INFO:%s\n", year, month, date, hour, minute, second, txt);
  console.log(msg)
}
exports.make_log = make_log