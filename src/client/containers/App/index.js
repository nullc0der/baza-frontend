import React, {Component} from 'react'
import classnames from 'classnames'

import './App.scss'

import AppRoutes from './AppRoutes'

class App extends Component {
    static propTypes = {

    }

    render(){
        const cx = classnames('app-main')
        return (
            <div className={cx}>
               {AppRoutes}
            </div>
        )
    }
}



export default App
