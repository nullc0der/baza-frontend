import React, { Fragment } from 'react'

const TrustDial = props => (
    <Fragment>
        <div className="circle-progress">
            <div className="mask">
                <div className="semi-circle"></div>
                <div className="semi-circle--mask"></div>
            </div>
        </div>
        <div className='trust-percentage'>75%</div>
        <div className='trust-message'>you can be in top 10%</div>
    </Fragment>
)

export default TrustDial
