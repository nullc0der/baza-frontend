import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import TextField from 'components/ui/TextField'

const ReceivePayment = props => {
  const cx = classnames(
    'receive-payment',
    'payment-tab-content',
    'flex-vertical'
  )
  return (
    <div className={cx}>
      <div className="tab-content-inner">
        <div className="qr-code mt-3 ">
          <img
            className="qr-code-img img-fluid"
            alt=""
            src="https://api.qrserver.com/v1/create-qr-code/?data=Baza&size=220x220&margin=0"
          />
        </div>
        <div className="mt-3 copy-code">
          <TextField
            className="is-textbox"
            value="iiwadjawjday198231892y389123u"
          />
          <button className="btn btn-copy">
            <i className="material-icons">content_copy</i>
          </button>
        </div>
      </div>
      <div className="flex-1" />
      {/* <button
        className="btn btn-info bottom-submit-btn mt-3"
        onClick={props.onReceiveSubmitClick}>
        SUBMIT
        </button> */}
    </div>
  )
}

ReceivePayment.propTypes = {
  onReceiveSubmitClick: PropTypes.func.isRequired
}

export default ReceivePayment
