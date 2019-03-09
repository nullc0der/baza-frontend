import { Component } from 'react'

import Sockette from 'sockette/dist/sockette'

import Auth from 'utils/authHelpers'

export default class WebSocketWrapper extends Component {
    state = {
        webSocketOpen: false
    }

    componentDidMount = () => {
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
        this.reconnector = setInterval(this.tryReOpenIfFailed, 5000)
    }

    componentDidUpdate = prevProps => {
        if (
            prevProps.message !== this.props.message &&
            this.state.webSocketOpen
        ) {
            this.ws.json(this.props.message)
        }
    }

    componentDidCatch = (error, info) => {}

    componentWillUnmount = () => {
        this.ws.close(1000)
        clearInterval(this.reconnector)
    }

    tryReOpenIfFailed = () => {
        if (!this.state.webSocketOpen) {
            this.ws.open()
        }
    }

    initializeWebSocket = (url, onWebSocketData) => {
        if (Auth.isAuthenticated()) {
            this.ws = new Sockette(url, {
                protocols: `Bearer-${Auth.getToken()}`,
                timeout: 5e3,
                maxAttempts: 10,
                onmessage: e => onWebSocketData(JSON.parse(e.data)),
                onopen: e => this.setState({ webSocketOpen: true })
            })
        } else {
            this.ws = new Sockette(url, {
                timeout: 5e3,
                maxAttempts: 10,
                onmessage: e => onWebSocketData(JSON.parse(e.data)),
                onopen: e => this.setState({ webSocketOpen: true })
            })
        }
    }

    render() {
        return null
    }
}
