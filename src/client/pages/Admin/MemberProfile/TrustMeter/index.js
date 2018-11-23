import React, { Component } from 'react'
import CountUp from 'react-countup'
import BasicCard from '../BasicCard'

import s from './TrustMeter.scss'
import SVGDial from './SVGDial';

class TrustMeter extends Component {
    state = {
        value: 40
    }

    // componentDidMount = () => {
    //     this.intervals = []
    //     const el = document.querySelector(`.${s.container}`)
    //     el.addEventListener('click', this.animateRange)
    // }

    // animateRange = () => {
    //     this.intervals.map(clearInterval)
    //     this.intervals = (new Array(10).fill(1)).map((n, i) =>
    //         setTimeout(() => this.setState({ value: (i + 1) * 10 }), (i + 1) * 1000)
    //     )
    // }

    render() {
        const { value } = this.state
        return (
            <BasicCard title='Trust Meter' className={s.container}>
                <SVGDial value={value} />
                <CountUp start={0} end={value} delay={0} duration={2} suffix='%' separator=''>
                    {({ countUpRef }) => <div>
                        <div className='trust-percentage' ref={countUpRef}></div>
                    </div>}
                </CountUp>
                {/* <div className='trust-percentage'>{value}%</div> */}
                <div className='trust-message'>You are in top 10%</div>
            </BasicCard>
        )
    }
}

export default TrustMeter
