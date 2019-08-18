import React, { Component } from 'react'

import Config from 'utils/config'

import DistributionSignupInfoCard from './DistributionSignupInfoCard'

class Documents extends Component {
    render() {
        const {
            document,
            editMode,
            editSelectedDataTypes,
            selectedDataTypes
        } = this.props
        return (
            <DistributionSignupInfoCard
                title="Documents"
                className="documents"
                editMode={editMode}
                editSelectedDataTypes={() =>
                    editSelectedDataTypes('document', [])
                }
                inputChecked={selectedDataTypes.indexOf('document') > -1}>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="flex-horizontal align-items-center">
                            {/* {!!editMode && (
                                <input
                                    className="checkbox mr-1"
                                    type="checkbox"
                                />
                            )} */}
                            <img
                                className="img-fluid"
                                src={Config.get('DOCUMENT_ROOT') + document}
                                alt="Signup Document"
                            />
                        </div>
                    </div>
                </div>
            </DistributionSignupInfoCard>
        )
    }
}

export default Documents
