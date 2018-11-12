import React, { Component } from 'react'
import BasicCard from '../BasicCard'

import SVGDial from './SVGDial'

import s from './TrustMeter.scss'

class TrustMeter extends Component {
    render() {
        return (
            <BasicCard title='Trust Meter' className={s.container}>
                <SVGDial />
            </BasicCard>
        )
    }
}

export default TrustMeter
