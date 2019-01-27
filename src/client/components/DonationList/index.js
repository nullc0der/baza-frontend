import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import isNumber from 'lodash/isNumber'
import take from 'lodash/take'
import TimeAgo from 'react-timeago'

import { fetchRecentDonations } from 'api/donations'
import s from './DonationList.scss'

export default class DonationList extends Component {
    static propTypes = {
        donationRenderer: PropTypes.func
    }

    state = {
        items: []
    }

    componentDidMount() {
        fetchRecentDonations().then(res => this.setState({ items: res.data }))
    }

    renderOneItem = (item, index) => {
        const { donationRenderer } = this.props
        const donationText =
            typeof donationRenderer === 'function'
                ? donationRenderer(item)
                : `Just Donated ${item.amount}`
        return (
            <div key={index} className="donation-item">
                <div
                    className="user-image"
                    style={{
                        backgroundImage: `url(${item.donator_image_url})`
                    }}
                />
                <div className="user-details">
                    <div className="full-name"> {item.name} </div>
                    <div className="donation"> {donationText} </div>
                </div>
                <div className="stamp">
                    <TimeAgo date={item.donated_on} minPeriod={10} />
                </div>
            </div>
        )
    }

    render() {
        const { limit } = this.props
        const { items } = this.state
        const cx = classnames(s.container, 'donation-list')
        const itemsToShow = isNumber(limit) ? take(items, limit) : items
        return (
            <div className={cx}>
                <div className="donation-list-inner">
                    {itemsToShow.map(this.renderOneItem)}
                </div>
            </div>
        )
    }
}
