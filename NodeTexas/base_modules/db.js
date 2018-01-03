const Mongo = require('mongodb')
const MongoClient = Mongo.MongoClient
const assert = require('assert')
const log = require('./log')
// 封装 db 与 Log
// 发起一次新的连接，大概是这么个意思
DB = function(conf, s, callback) {
  if(conf.db_name == undefined || conf.db_ip == undefined || conf.db_port == undefined) {
    this.log('db config error')
    return
  }
  var url = "mongodb://" + conf.db_ip + ":" + conf.db_port + "/"
  console.log('url :' + url)

  // connect to mongod
  // 每一次建立连接都是一个新的 instance
  MongoClient.connect(url, (err, mc) => {
    if(err) {
      this.log('CONNECT:connect ' + 'url :' + url + ' failded!')
      db.close()
    } else {

      this.mc = mc
      this.db = mc.db(conf.db_name)
      s.db = this
      this.log('CONNECT:connect mongod ' + conf.db_name + '  url :' + url + ' succes !')
      callback(s)
    }
  })
}

DB.prototype.insert = function(colname, doc, options = {}, callback = {}) {
    return this.db.collection(colname).insertOne(doc, options).then((r)=>{
      this.log('INSERT :' + JSON.stringify(doc) + r)
    })
  }

DB.prototype.find = function(colname, query, options = {}, callback = () => {}) {
  return this.db.collection(colname).find(query, options).toArray().then((r) => {
      this.log('FIND : ' + JSON.stringify(r))
    })

}
DB.prototype.update = function(colname, filter, update, options = {}, callback = () => {}) {
  return new Promise(() => {
    this.db.collection(colname).findOneAndUpdate(filter, update, options, (err, r) => {
      if(err) this.log(err)
      else {
        this.log('UPDATE ： ' + r.result)
      }
    })
  })
}
DB.prototype.close = function() {
  return new Promise(() => {

    this.log('db close')
    return this.mc.close()
  })
}
DB.prototype.log = function(txt) {
  let info = log(txt)
  return this.db.collection('log').insertOne(info)
}
exports.DB = DB