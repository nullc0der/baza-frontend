import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import isNumber from 'lodash/isNumber'
import take from 'lodash/take'
// import moment from 'moment'

import s from './DonationList.scss'


const GENERATE_DONATION_ITEM = (x, i) => ({
    id: `id-${i}`,
    updatedAt: `${5 * i} mins ago`,
    full_name: `John Doe ${i}`,
    image: `https://api.adorable.io/avatars/80/abott${i}@adorable.io.png`,
    amount: 8 * i
})

const items = new Array(10).fill(1).map(GENERATE_DONATION_ITEM)

export default class DonationList extends Component {
    static propTypes = {
        donationRenderer: PropTypes.func
    }
    renderOneItem = (item, index) => {
        const { donationRenderer } = this.props
        const donationText = typeof donationRenderer === 'function'
            ? donationRenderer(item)
            : `Just Donated ${item.amount}`
        return (
            <div
                key={index}
                className='donation-item'>
                <div
                    className='user-image'
                    style={{ backgroundImage: `url(${item.image})` }} />
                <div className='user-details'>
                    <div className='full-name'> {item.full_name} </div>
                    <div className='donation'> {donationText} </div>
                </div>
                <div className='stamp'>{item.updatedAt}</div>
            </div>
        )
    }

    render() {
        const { limit } = this.props
        const cx = classnames(s.container, 'donation-list')
        const itemsToShow = isNumber(limit) ? take(items, limit) : items
        return (
            <div className={cx}>
                <div className='donation-list-inner'>
                    {itemsToShow.map(this.renderOneItem)}
                </div>
            </div>
        )
    }
}
