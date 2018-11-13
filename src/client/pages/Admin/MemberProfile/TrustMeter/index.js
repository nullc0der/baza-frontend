import React, { Component } from 'react'
import BasicCard from '../BasicCard'

import s from './TrustMeter.scss'
import SVGDial from './SVGDial';

class TrustMeter extends Component {
    state = {
        value: 40
    }
    render() {
        const { value } = this.state
        return (
            <BasicCard title='Trust Meter' className={s.container}>
                <SVGDial value={value} />
                <div className='trust-percentage'>{value}%</div>
                <div className='trust-message'>you can be in top 10%</div>
            </BasicCard>
        )
    }
}

export default TrustMeter
