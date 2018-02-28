import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import TextField from 'components/ui/TextField'

import SelectDropdown from 'components/ui/SelectDropdown'

const SendPayment = props => {
  const cx = classnames('send-payment payment-tab-content flex-vertical')
  return (
    <div className={cx}>
      <div className="tab-content-inner">
        <SelectDropdown className="mt-3" label="Address or Select User" />

        <div className="row align-items-center">
          <div className="col-md-6 mt-3">
            <TextField label="Select Account" />
          </div>
          <div className="col-md-6 mt-3">
            <TextField className="is-textbox" label="Enter Amount" />
          </div>
        </div>
        <TextField className="mt-3" label="Additional Information" />
        <div className="row align-items-center justify-content-between mt-3">
          <div className="col-md-6">
            <div className="transanction-info">
              <div className="label">Tx Fee</div>
              <div className="value">0.00012</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="transanction-info total-info">
              <div className="label">Total</div>
              <div className="value">0.1922</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1" />
      <button
        className="btn btn-info bottom-submit-btn mt-3"
        onClick={props.onSendSubmitClick}>
        SUBMIT
      </button>
    </div>
  )
}

SendPayment.propTypes = {
  onSendSubmitClick: PropTypes.func.isRequired
}

export default SendPayment
