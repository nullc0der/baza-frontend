import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import WorldMap from 'components/WorldMap'

import { actions as donationActions } from 'store/Donations'

class MapSection extends Component {
    componentDidMount = () => {
        this._fetchInterval = setInterval(this.props.fetchDonations, 7000)
    }

    componentWillUnmount = () => {
        clearInterval(this._fetchInterval)
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
                        <small> Track live donations and distributions around the world </small>
                    </h3>
                    <WorldMap donations={this.props.list} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.Donations.list
})

const mapDispatchToProps = dispatch => ({
    fetchDonations() {
        return dispatch(donationActions.fetchDonations())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapSection)
