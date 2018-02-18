import React from 'react'
import classnames from 'classnames'

import s from './PaymentInformation.scss'

const PaymentBadges = props => {
  const cx = classnames(s.paymentBadges, props.className, 'mt-2')
  return (
    <div className={cx}>
      <div className="payment-image payment-image-ssl" />
      <div className="payment-image payment-image-stripe" />
    </div>
  )
}


export default PaymentBadges