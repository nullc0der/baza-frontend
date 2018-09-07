import React, { Component } from 'react'

class DistributionSignupHeader extends Component {
    render() {
        return (
            <div className="header">
                <i
                    className="fa fa-arrow-left d-md-none back-button"
                    onClick={this.props.onBackButtonClick}
                />
                {this.props.data.username}
            </div>
        )
    }
}

export default DistributionSignupHeader
