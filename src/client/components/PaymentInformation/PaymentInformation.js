import React from 'react'
import classnames from 'classnames'

import TextField from 'components/ui/TextField'

import s from './PaymentInformation.scss'

const PaymentInformationForm = props => {
  const cx = classnames(s.container, 'well p-2')
  return (
    <div className={cx}>
      <p className="font-weight-bold mb-3"> Payment Details </p>
      <div className="row">
        <div className="col-md-12">
          <TextField label="Credit Card Number" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4 mt-3">
              <TextField label="Month" />
            </div>
            <div className="col-md-4 mt-3">
              <TextField label="Year" />
            </div>
            <div className="col-md-4 mt-3">
              <TextField label="CVV" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-3">
          <TextField label="Billing Address" />
        </div>
      </div>
      <div className="row pb-3">
        <div className="col-md-4 mt-3">
          <TextField label="City" />
        </div>
        <div className="col-md-4 mt-3">
          <TextField label="Select State" />
        </div>
        <div className="col-md-4 mt-3">
          <TextField label="ZipCode" />
        </div>
      </div>
    </div>
  )
}

export default PaymentInformationForm
