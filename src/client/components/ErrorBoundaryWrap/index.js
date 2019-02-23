import { Component } from 'react'
import * as Sentry from '@sentry/browser'


class ErrorBoundaryWrap extends Component {
    state = {
        error: null
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error })
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key])
            })
            Sentry.captureException(error)
        })
    }

    render() {
        if (!this.state.error) {
            return this.props.children
        }
        return null
    }
}

export default ErrorBoundaryWrap
