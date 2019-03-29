import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { actions as hashtagActions } from 'store/HashTag'

import { injectFBSDK } from 'components/FacebookLogin'

import s from './HashTag.scss'

class HashTagSidebar extends Component {
    state = {
        fbReady: false
    }

    componentDidMount = () => {
        this.props.fetchProviders()
        injectFBSDK(() => {
            this.setState({ fbReady: true })
        })
    }

    renderOneProvider = (provider, index) => {
        const { selectedProvider, onProviderChange } = this.props
        const cx = classnames('btn btn-provider', provider.className, {
            'is-selected': selectedProvider === index
        })

        return (
            <div
                className={cx}
                key={index}
                onClick={e => onProviderChange(e, index)}>
                <div className="provider-icon">
                    <i className={`fa fa-${provider.icon}`} />
                </div>
                <div className="provider-name">{provider.name}</div>
            </div>
        )
    }

    render() {
        const cx = classnames(s.sidebar)
        const { providers } = this.props

        return (
            <div className={cx}>
                <div className="btn btn-light sidebar-btn select-platform">
                    SELECT PLATFORM
                </div>
                <br />
                <br />
                {providers.map(this.renderOneProvider)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.HashTag.isLoading,
    providers: state.HashTag.providers,
    selectedProvider: state.HashTag.selectedProvider
})

const mapDispatchToProps = dispatch => ({
    fetchProviders() {
        return dispatch(hashtagActions.fetchProviders())
    },
    onProviderChange(e, index) {
        return dispatch(hashtagActions.changeProvider(index))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HashTagSidebar)
