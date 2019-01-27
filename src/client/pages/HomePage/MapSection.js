import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import WorldMap from 'components/WorldMap'
import WebSocketWrapper from 'components/WebSocketWrapper'

import { actions as donationActions } from 'store/Donations'

class MapSection extends Component {
    onWebSocketData = data => {
        const { message } = data
        this.props.receivedDonationDataOnWS(message)
    }

    render() {
        const { className, id } = this.props
        const cx = classnames(className, 'map-section')
        return (
            <div className={cx} id={id}>
                <div className="container page-section">
                    <h3 className="text-center mb-4 mb-md-0 mb-lg-0 mb-xl-0">
                        Live Donations
                        <br />
                        <small>
                            {' '}
                            Track live donations and distributions around the
                            world{' '}
                        </small>
                    </h3>
                    <WorldMap donations={this.props.list} />
                    <WebSocketWrapper
                        url="/ws/donation/"
                        onWebSocketData={this.onWebSocketData}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.Donations.list
})

const mapDispatchToProps = dispatch => ({
    receivedDonationDataOnWS(data) {
        return dispatch(donationActions.receivedDonationDataOnWS(data))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapSection)
