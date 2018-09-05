import React, { Component } from 'react'

class DistributionSignupHeader extends Component {
    render() {
        return <div className="header">{this.props.data.username}</div>
    }
}

export default DistributionSignupHeader
