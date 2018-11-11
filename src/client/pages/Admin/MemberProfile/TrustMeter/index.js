import React, { Component } from 'react'
import BasicCard from '../BasicCard'

import s from './TrustMeter.scss'

class TrustMeter extends Component {
    render() {
        return (
            <BasicCard title='Trust Meter' className={s.container}>
                <div className="circle-progress">
                    <div className="mask">
                        <div className="semi-circle"></div>
                        <div className="semi-circle--mask"></div>
                    </div>
                </div>
                <div className='trust-percentage'>75%</div>
                <div className='trust-message'>you can be in top 10%</div>
            </BasicCard>
        )
    }
}

export default TrustMeter
