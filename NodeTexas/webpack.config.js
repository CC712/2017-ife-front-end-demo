let path = require('path')
module.exports = {
	entry:{
		index:'./static/client/main.js'
	},
	output:{
		path:path.resolve(__dirname,'./static/client/dist'),
		filename:'bundle.js'
	},
	  module: {
        loaders: [
            { test: path.join(__dirname, 'es6'),
              loader: 'babel-loader' }
        ]
    }
}
