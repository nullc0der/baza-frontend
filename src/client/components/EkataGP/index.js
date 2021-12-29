import React from 'react'

import Config from 'utils/config'
import { EkataGatewayProcessorForm } from './gatewayprocessor'

class EkataGPForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formConfig: {
                projectID: Config.get('EKATA_GATEWAY_PROCESSOR_PROJECT_ID'),
                onError: (data) => this.props.onError(data),
                onCloseForm: (reason) => this.props.onCloseForm(reason),
                onSuccess: (data) => this.props.onSuccess(data),
            },
        }
        this.gpForm = new EkataGatewayProcessorForm(this.state.formConfig)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.formID !== this.props.formID) {
            this.gpForm.showPaymentForm(this.props.formID)
        }
    }

    render() {
        return null
    }
}

export default EkataGPForm
