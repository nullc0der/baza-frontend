import { Component } from 'react'

import Sockette from 'sockette/dist/sockette'

import Auth from 'utils/authHelpers'

export default class WebSocketWrapper extends Component {
    componentDidMount = () => {
        if (Auth.isAuthenticated()) {
            let _url = ''
            const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
            const baseURL =
                process.env.NODE_ENV === 'development'
                    ? `${scheme}://localhost:8000`
                    : `${scheme}://${window.location.host}`
            const { url, onWebSocketData } = this.props
            if (url[0] === '/') {
                _url = `${baseURL}${url}`
            } else {
                _url = url
            }
            this.initializeWebSocket(_url, onWebSocketData)
        }
    }

    componentDidUpdate = prevProps => {
        if (prevProps.message !== this.props.message) {
            this.ws.json(this.props.message)
        }
    }

    componentWillUnmount = () => {
        this.ws.close(1000)
    }

    initializeWebSocket = (url, onWebSocketData) => {
        this.ws = new Sockette(url, {
            protocols: `Bearer-${Auth.getToken()}`,
            timeout: 5e3,
            maxAttempts: 10,
            onmessage: e => onWebSocketData(JSON.parse(e.data))
        })
    }

    render() {
        return null
    }
}
