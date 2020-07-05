import React, { Component } from 'react'
import classnames from 'classnames'

import { connect } from 'react-redux'

import './App.scss'
import Config from 'utils/config'
import { isGRecaptchaReady } from 'utils/common'

import { actions as commonActions } from 'store/Common'

import { MatomoContext } from 'context/Matomo'

import AppRoutes from './AppRoutes'
import AppOverlays from './AppOverlays'

class App extends Component {
    static propTypes = {}
    static contextType = MatomoContext

    componentDidMount = () => {
        this.loadRecaptcha()
        this.gRecaptchaReadyCheck = setInterval(
            this.updateRecaptchaStatus,
            1000
        )
        this.context.trackPageView()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            setTimeout(() => this.context.trackPageView(), 2000)
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.gRecaptchaReadyCheck)
    }

    loadRecaptcha = () => {
        const script = document.createElement('script')
        script.src = `https://www.google.com/recaptcha/api.js?render=${Config.get(
            'GOOGLE_RECAPTCHA_SITE_KEY'
        )}`
        document.body.appendChild(script)
    }

    updateRecaptchaStatus = () => {
        if (isGRecaptchaReady()) {
            this.props.updateGoogleRecaptchaStatus(isGRecaptchaReady())
            clearInterval(this.gRecaptchaReadyCheck)
        }
    }

    render() {
        const cx = classnames('app-main')
        return (
            <div className={cx}>
                {AppRoutes(this.props.location)}
                {AppOverlays(this.props.location)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    location: state.router.location,
})

const mapDispatchToProps = (dispatch) => ({
    updateGoogleRecaptchaStatus: (isGRecaptchaReady) =>
        dispatch(commonActions.updateGoogleRecaptchaStatus(isGRecaptchaReady)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
