import { Component } from 'react'

import { WebSocketBridge } from 'django-channels'

import Auth from 'utils/authHelpers'

export default class WebSocketWrapper extends Component {
    componentDidMount = () => {
        if (Auth.isAuthenticated()) {
            const { url, onWebSocketData } = this.props
            this.websocketBridge = new WebSocketBridge()
            this.websocketBridge.connect(url, `Token-${Auth.getToken()}`)
            this.websocketBridge.listen((action, stream) => {
                onWebSocketData(action)
            })
        }
    }

    componentWillUnmount = () => {
        if (this.websocketBridge) {
            this.websocketBridge.socket.close()
        }
    }

    render() {
        return null
    }
}
