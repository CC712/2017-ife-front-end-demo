import ajax from '../../util/ajax'
import api_config from './api_config_fn'
function ajax_cmd( fn, args){
	
	return ajax({
		url: api_config[fn],
		method: args.method || '',
		data: args
	})
}

