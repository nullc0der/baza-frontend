import React, { Component } from 'react'

import Config from 'utils/config'

import DistributionSignupInfoCard from './DistributionSignupInfoCard'

class Documents extends Component {
    render() {
        const { document } = this.props
        return (
            <DistributionSignupInfoCard title="Documents" className="documents">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            className="img-fluid"
                            src={Config.get('DOCUMENT_ROOT') + document}
                            alt="Signup Document"
                        />
                    </div>
                </div>
            </DistributionSignupInfoCard>
        )
    }
}

export default Documents
