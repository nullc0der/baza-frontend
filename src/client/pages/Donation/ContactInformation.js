import React, { Fragment } from 'react'
import TextField from 'components/ui/TextField'

const ContactInformation = props => {
  return (
    <Fragment>
      <p className="font-weight-bold mb-3">Your Details</p>
      <TextField
        label="Your Name"
        className="mb-3"
        icon={<i className="material-icons">perm_identity</i>}
      />
      <TextField
        label="Email"
        className="mb-3"
        icon={<i className="material-icons">mail_outline</i>}
      />
      <TextField
        label="Phone no."
        className="mb-3"
        icon={<i className="material-icons">phone</i>}
      />
      <div className="mt-3 mb-2 button-submit-wrap d-none d-md-block d-lg-block d-xl-block">
        <button className="btn btn-dark btn-block">SUBMIT</button>
        <div className="form-check form-check-inline mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="add_to_newsletter"
            value="add_to_newsletter"
          />
          <label className="form-check-label" htmlFor="add_to_newsletter">
            Yes! Add me to your newsletter list
          </label>
        </div>
      </div>
    </Fragment>
  )
}

export default ContactInformation
