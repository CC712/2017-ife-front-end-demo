var config = require('./webpack.config.js')
var webpack  = require('webpack')
var devServer = require('webpack-dev-server')

var compiler = webpack(config)
var server = new devServer(compiler,{
	hot: true,
	stats:{colors:true}
})
