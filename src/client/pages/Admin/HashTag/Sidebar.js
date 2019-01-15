import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { actions as hashtagActions } from 'store/HashTag'

import s from './HashTag.scss'

class HashTagSidebar extends Component {

    static propTypes = {
        providers: PropTypes.array.isRequired,
        onProviderChange: PropTypes.func.isRequired,
        selectedProvider: PropTypes.string.isRequired
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
                <div className='provider-icon'>
                    <i className={`fa fa-${provider.icon}`} />
                </div>
                <div className='provider-name'>{provider.name}</div>
            </div>
        )
    }

    render() {
        const cx = classnames(s.sidebar)
        const { providers } = this.props

        return (
            <div className={cx}>
                <div className='btn btn-light sidebar-btn select-platform'>SELECT PLATFORM</div>
                <br />
                <br />
                {providers.map(this.renderOneProvider)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    providers: state.HashTag.providers,
    selectedProvider: state.HashTag.selectedProvider
})

const mapDispatchToProps = dispatch => ({
    onProviderChange(e, index) {
        return dispatch(hashtagActions.changeProvider(index))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HashTagSidebar)
