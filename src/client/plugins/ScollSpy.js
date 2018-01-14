import Base from './Base'

const TARGETS = ['.scrollspy-link']

export default class ScrollSpyPlugin extends Base {

	constructor(options){
		super(options)
		$(TARGETS.join(', ')).on('click touchtap', scrollToElement)
	}

	dispose = ()=> {

	}
}