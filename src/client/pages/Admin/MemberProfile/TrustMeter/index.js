import React, { Component } from 'react'
import CountUp from 'react-countup'
import { connect } from 'react-redux'
import BasicCard from '../BasicCard'

import s from './TrustMeter.scss'
import SVGDial from './SVGDial'

class TrustMeter extends Component {
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
        const { trustPercentage, trustPercentile } = this.props
        return (
            <BasicCard title="Trust Meter" className={s.container}>
                <SVGDial value={trustPercentage} />
                <CountUp
                    start={0}
                    end={trustPercentage}
                    delay={0}
                    duration={2}
                    suffix="%"
                    separator="">
                    {({ countUpRef }) => (
                        <div>
                            <div
                                className="trust-percentage"
                                ref={countUpRef}
                            />
                        </div>
                    )}
                </CountUp>
                {/* <div className='trust-percentage'>{value}%</div> */}
                <div className="trust-message">
                    You are in top {trustPercentile}%
                </div>
            </BasicCard>
        )
    }
}

const mapStateToProps = state => ({
    trustPercentage: state.UserProfile.trustPercentage,
    trustPercentile: state.UserProfile.trustPercentile
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrustMeter)
