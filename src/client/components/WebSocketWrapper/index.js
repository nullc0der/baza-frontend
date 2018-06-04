import { Component } from 'react'

import Sockette from 'sockette'

import Auth from 'utils/authHelpers'

export default class WebSocketWrapper extends Component {
    componentDidMount = () => {
        if (Auth.isAuthenticated()) {
            const { url, onWebSocketData } = this.props
            this.initializeWebSocket(url, onWebSocketData)
        }
    }

    componentWillUnmount = () => {
        this.ws.close(1000)
    }

    initializeWebSocket = (url, onWebSocketData) => {
        this.ws = new Sockette(url, {
            protocols: `Token-${Auth.getToken()}`,
            timeout: 5e3,
            maxAttempts: 10,
            onmessage: e => onWebSocketData(JSON.parse(e.data))
        })
    }

    render() {
        return null
    }
}
