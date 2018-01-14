/**
 * 
 * 
 * @export
 * @class BasePlugin
 */
export default class BasePlugin {
	constructor(options){
		this.isActive = false
		
	}

	init = ()=> {
		this.isEnabled = true
	}

	dispose = ()=> {
		this.isEnabled = false
	}

}