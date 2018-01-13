const log = require('./data_log.js')
let user = {
	uid : 77232,
	name : 'test user'
}
log.check_file(user, (r)=>{
	console.log(r)
})
